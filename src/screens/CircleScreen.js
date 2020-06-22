import React, {useState, useContext, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import {LineChart} from 'react-native-chart-kit'
import SendReminderDialog from '../components/SendReminderDialog'
import SuccessDialog from '../components/SuccessDialog'
import {Context} from '../utils/Store'
import EmojiLayer from '../components/EmojiLayer'
import {GetCircleData} from '../modules/User.module'
import {GetStorageData} from '../utils/StorageModule'
import AddPerson from '../components/AddPerson'

const {width, height} = Dimensions.get('window')

const CircleScreen = ({navigation}) => {
  const {appState} = useContext(Context)
  const [openSendReminderDialog, setOpenSendReminderDialog] = useState(false)
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
  const [members, setMembers] = useState([])
  const [activeMemberIndex, setActiveMemberIndex] = useState(0)
  const [activeMemberName, setActiveMemberName] = useState('')
  const [openAddPerson, setOpenAddPerson] = useState(false)

  useEffect(() => {
    // setMembers([
    //   {title: 'Mom', icon: 'woman', chartData: {data: [1, 2, 1, 3, 2, 1, 2]}},
    //   {title: 'Dad', icon: 'man', chartData: {data: [3, 1, 2, 2, 1, 3, 3]}},
    // ])
    getCircles()
  }, [openAddPerson])

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const day = new Date().getDay()
  const pastWeek = []

  let i = day === 7 ? 1 : day + 1

  for (let j = 0; j < 6; j++) {
    if (i === 7) {
      pastWeek.push(weekDays[6])
      i = 1
    } else {
      pastWeek.push(weekDays[(i % 7) - 1])
      i++
    }
  }

  pastWeek.push('Today')

  const getCircles = async () => {
    const deviceUUID = await GetStorageData('deviceUUID')
    if (deviceUUID.success) {
      const circleData = await GetCircleData(deviceUUID.data)
      if (circleData.success) {
        setMembers(circleData.data)
        if (circleData.data.length > 0)
          setActiveMemberName(circleData.data[0].name)
      }
    }
  }

  const showConfirm = () => {
    setOpenSendReminderDialog(true)
  }

  const send = () => {
    console.log('sending...')
    setOpenSendReminderDialog(false)
    setOpenSuccessDialog(true)
  }

  const selectMember = index => {
    setActiveMemberIndex(index)
  }

  return (
    <>
      <SendReminderDialog
        open={openSendReminderDialog}
        name={activeMemberName}
        onCancel={() => setOpenSendReminderDialog(false)}
        onSend={() => send()}
      />
      <SuccessDialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
      />
      <AddPerson open={openAddPerson} onClose={() => setOpenAddPerson(false)} />
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <LinearGradient
            colors={['#7280FF', '#351ADC']}
            style={styles.linearGradient}>
            <View style={styles.row}>
              <View style={[styles.col, {alignItems: 'flex-start'}]}>
                <Text style={styles.title}>
                  {appState.i18n.t('circlePage.title')}
                </Text>
              </View>
              <View style={[styles.col, {alignItems: 'flex-end'}]}>
                <TouchableOpacity
                  style={styles.addPerson}
                  onPress={() => setOpenAddPerson(true)}>
                  <Text style={styles.text}>
                    {appState.i18n.t('homePage.addPerson')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.description}>
                {appState.i18n.t('circlePage.description')}
              </Text>
            </View>

            {members &&
            members.length > 0 &&
            members[activeMemberIndex].uuid ? (
              <>
                <View style={styles.stats}>
                  <View style={[styles.row]}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {members.map(
                        (member, index) =>
                          member.uuid && (
                            <View style={styles.col} key={index}>
                              <TouchableOpacity
                                onPress={() => selectMember(index)}
                                style={[
                                  styles.touchable,
                                  index === activeMemberIndex &&
                                    styles.personWrapperActive,
                                ]}>
                                {member.icon === 0 ? (
                                  <Woman />
                                ) : member.icon === 1 ? (
                                  <Man />
                                ) : (
                                  member.icon === 2 && <Kid />
                                )}
                              </TouchableOpacity>
                              <Text
                                style={{
                                  position: 'absolute',
                                  top: 2,
                                  fontSize: 11,
                                }}>
                                {member.name.toUpperCase()}
                              </Text>
                            </View>
                          ),
                      )}
                    </ScrollView>
                  </View>
                  <View style={styles.chartWrapper}>
                    <LineChart
                      data={{
                        labels: pastWeek,
                        datasets: [members[activeMemberIndex].chartData],
                      }}
                      width={width}
                      height={height * 0.25}
                      withShadow={false}
                      fromZero={true}
                      withHorizontalLabels={false}
                      segments={4}
                      chartConfig={{
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: '#ffffff',
                        backgroundGradientToOpacity: 1,
                        color: (opacity = 1) => `rgba(25, 0, 181, ${opacity})`,
                        strokeWidth: 5,
                      }}
                      bezier
                    />
                    <View
                      style={[
                        {
                          position: 'absolute',
                          bottom: height * 0.067,
                          width: '80%',
                        },
                        appState.i18n.locale === 'farsi'
                          ? {right: 64}
                          : {left: 64},
                      ]}>
                      <View style={styles.red} />
                      <View style={styles.yellow} />
                      <View style={styles.green} />
                    </View>
                    {members[activeMemberIndex].chartData.data &&
                      members[activeMemberIndex].chartData.data.length > 0 &&
                      members[activeMemberIndex].chartData.data.map(
                        (dayValue, index) => (
                          <EmojiLayer
                            key={index}
                            dayValue={dayValue}
                            index={index}
                          />
                        ),
                      )}
                    <EmojiLayer />
                  </View>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <View
                        style={{
                          width: 60,
                          height: 7,
                          backgroundColor: '#00D816',
                          borderRadius: 50,
                          margin: 5,
                        }}
                      />
                      <Text style={styles.text}>
                        {appState.i18n.t('circlePage.good')}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <View
                        style={{
                          width: 60,
                          height: 7,
                          backgroundColor: '#D8CF00',
                          borderRadius: 50,
                          margin: 5,
                        }}
                      />
                      <Text style={styles.text}>
                        {appState.i18n.t('circlePage.someRisk')}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <View
                        style={{
                          width: 60,
                          height: 7,
                          backgroundColor: '#DF1F32',
                          borderRadius: 50,
                          margin: 5,
                        }}
                      />
                      <Text style={styles.text}>
                        {appState.i18n.t('circlePage.highRisk')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.buttonsWrapper}>
                  <TouchableOpacity
                    style={styles.message}
                    onPress={() => navigation.navigate('Message')}>
                    <Text style={styles.whiteText}>
                      {appState.i18n.t('circlePage.message')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.reminder}
                    onPress={() => showConfirm()}>
                    <Text style={styles.whiteText}>
                      {appState.i18n.t('circlePage.reminder')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                style={[
                  styles.row,
                  {justifyContent: 'center', marginVertical: 50},
                ]}>
                <Text style={styles.description}>
                  {appState.i18n.t('circlePage.noMember')}
                </Text>
              </View>
            )}
          </LinearGradient>
        </View>
      </SafeAreaView>
    </>
  )
}

export default CircleScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    zIndex: 1,
    elevation: 2,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 25,
  },
  addPerson: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EC7E00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  description: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    marginVertical: 15,
    marginHorizontal: 25,
    color: Colors.white,
  },
  stats: {
    flex: 5,
    backgroundColor: Colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  message: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EC7E00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminder: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#33BDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    textAlign: 'center',
  },
  whiteText: {
    fontFamily: 'B Yekan',
    color: Colors.white,
  },
  touchable: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  personWrapperActive: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: '#4457FF',
  },
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  red: {
    // width: width * 0.81,
    backgroundColor: 'rgba(223, 31, 50,0.2)',
    height: height * 0.075,
  },
  yellow: {
    // width: width * 0.81,
    backgroundColor: 'rgba(216, 209, 0,0.2)',
    height: height * 0.075,
  },
  green: {
    // width: width * 0.81,
    backgroundColor: 'rgba(0, 216, 22,0.2)',
    height: height * 0.075,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
