import React, {useState, createRef, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Header from '../components/Header'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Question from '../components/Question'
import {EnglishQuestions} from '../constants/EnglishQuestions'
import {FarsiQuestions} from '../constants/FarsiQuestions'
import {Context} from '../utils/Store'
import {
  CreateQuestions,
  CreateRisks,
  GetQuestions,
  GetRisks,
} from '../modules/Question.module'
import {GetStorageData, SaveStorageData} from '../utils/StorageModule'
import {Symptom} from '../models/symptom/Symptom'

const {width} = Dimensions.get('window')

const SymptomScreen = ({navigation}) => {
  const {appState} = useContext(Context)
  const scrollRef = createRef()
  const [state, setState] = useState({
    activeIndex: 0,
    symptoms: new Map(),
    height: 0,
  })
  const [questions, setQuestions] = useState([])
  const [risks, setRisks] = useState([])
  const [showAgeQuestion, setShowAgeQuestion] = useState(true)

  useEffect(() => {
    // addQuestions()
    // addRisks()
    getQuestions()
    getRisks()
  }, [])

  useEffect(() => {
    getAgeRange()
  }, [questions])

  // const addQuestions = async () => {
  //   try {
  //     // await CreateQuestions('english', EnglishQuestions)
  //     // await CreateQuestions('farsi', FarsiQuestions)
  //   } catch (error) {}
  // }

  // const addRisks = async () => {
  //   try {
  //     // await CreateRisks(Risks)
  //   } catch (error) {}
  // }

  const getQuestions = async () => {
    try {
      const questionsData = await GetQuestions(appState.i18n.locale)
      if (questionsData.success) {
        setQuestions(questionsData.data)
      }
    } catch (error) {}
  }

  const getRisks = async () => {
    try {
      const risksData = await GetRisks()
      if (risksData.success) {
        setRisks(risksData.data)
      }
    } catch (error) {}
  }

  const getAgeRange = async () => {
    const ageRangeDate = await GetStorageData('ageRange')
    if (ageRangeDate.success) {
      if (questions.length > 0) {
        selectAnswer(questions.length - 1, parseInt(ageRangeDate.data))
      }
      setShowAgeQuestion(false)
    }
  }

  const next = () => {
    setState(prev => ({...prev, activeIndex: prev.activeIndex + 1}))
    scrollRef.current.scrollTo({
      x: 0,
      y: state.height + 55,
      animated: true,
    })
  }

  const collapse = index => {
    setState(prev => ({...prev, activeIndex: index}))
  }

  const getHeight = (index, height) => {
    if (index === state.activeIndex) {
      return setState(prev => ({...prev, height}))
    }
  }

  const selectAnswer = (index, answer) => {
    setState(prev => ({
      ...prev,
      symptoms: prev.symptoms.set(index, answer),
    }))
  }

  const submit = async () => {
    try {
      const uuidData = await GetStorageData('deviceUUID')
      if (uuidData.success) {
        const symptom = {}
        Object.assign(symptom, Symptom)

        const answers = Object.fromEntries(state.symptoms)

        let riskLevel = 0

        Object.values(answers).map((answer, index) => {
          if (Array.isArray(answer)) {
            riskLevel += answer.length
          } else {
            riskLevel += risks[index].risks[answer]
          }
        })

        symptom.uuid = uuidData.data
        symptom.type = 'sick'
        symptom.answers = answers
        symptom.risk = {level: riskLevel}

        const saveData = await saveReportLocally({
          type: symptom.type,
          answers: symptom.answers,
          risk: symptom.risk,
          created: symptom.created,
        })

        if (saveData.success) {
          return navigation.navigate('Confirm', {
            data: JSON.stringify({
              symptom,
              showAge: showAgeQuestion,
              uuid: uuidData.data,
              ageRange: state.symptoms.get(7),
            }),
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveReportLocally = async symptom => {
    try {
      const reportsData = await GetStorageData('symptomReports')
      if (reportsData.success) {
        const symptomReports = JSON.parse(reportsData.data)
        symptomReports.push(symptom)
        await SaveStorageData('symptomReports', JSON.stringify(symptomReports))
        return {success: true}
      } else {
        const symptomReports = []
        symptomReports.push(symptom)
        await SaveStorageData('symptomReports', JSON.stringify(symptomReports))
        return {success: true}
      }
    } catch (error) {}
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header back={true} />
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
            <View style={styles.row}>
              <Text style={styles.title}>
                {appState.i18n.t('symptomPage.title')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.description}>
                {appState.i18n.t('symptomPage.description')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.disclaimer}>
                {appState.i18n.t('symptomPage.disclaimer')}
              </Text>
            </View>
            <View style={[styles.row, {justifyContent: 'center'}]}>
              <Text style={styles.symptomTitle}>
                {appState.i18n.t('symptomPage.questionTitle')}
              </Text>
            </View>
            {questions &&
              questions.length > 0 &&
              questions.map((question, index) => (
                <View
                  key={index}
                  onLayout={event =>
                    getHeight(index, event.nativeEvent.layout.y)
                  }>
                  <Question
                    title={question.title}
                    answers={question.answers}
                    multi={question.multi}
                    index={index}
                    activeIndex={state.activeIndex === index}
                    onCollapse={e => collapse(e)}
                    onSelectAnswer={e => selectAnswer(index, e)}
                    showAge={showAgeQuestion}
                    isLast={index === questions.length - 1}
                  />
                </View>
              ))}
            <View style={{height: 200}} />
          </ScrollView>
        </LinearGradient>
      </View>
      <View style={styles.nextButtonContainer}>
        {questions &&
          state.activeIndex < questions.length - 1 &&
          state.symptoms.size !== questions.length && (
            <TouchableOpacity onPress={() => next()}>
              <View style={styles.nextButton}>
                <Text style={styles.text}>
                  {appState.i18n.t('symptomPage.next')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        {questions && state.symptoms.size === questions.length ? (
          <TouchableOpacity onPress={() => submit()}>
            <View style={styles.submitButton}>
              <Text style={styles.text}>
                {appState.i18n.t('symptomPage.submit')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          questions &&
          state.activeIndex === questions.length - 1 && (
            <View style={styles.nextButton}>
              <Text style={styles.text}>
                {appState.i18n.t('symptomPage.answerAll')}
              </Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  )
}

export default SymptomScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: width * 0.5 - 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    minWidth: 180,
    height: 45,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 15,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  submitButton: {
    minWidth: 180,
    height: 45,
    backgroundColor: '#33BDBD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 20,
  },
  description: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 15,
  },
  disclaimer: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 13,
    fontStyle: 'italic',
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
  },
  symptomTitle: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    fontSize: 25,
    color: '#33BDBD',
  },
})
