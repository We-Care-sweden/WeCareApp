import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Done from '../assets/img/done.svg'

const Question = ({
  title,
  answers,
  multi,
  index,
  activeIndex,
  onCollapse,
  showAge,
  isLast,
  onSelectAnswer,
}) => {
  const anim = useRef(new Animated.Value(0)).current
  const fadeIn = useRef(new Animated.Value(0)).current

  const [selectedItem, setSelectedItem] = useState(multi ? [] : null)

  useEffect(() => {
    if (activeIndex) {
      Animated.timing(anim, {
        toValue: answers.length * 60,
        useNativeDriver: false,
      }).start(() =>
        Animated.timing(fadeIn, {
          toValue: 1,
          useNativeDriver: false,
        }).start(),
      )
    } else {
      Animated.timing(anim, {
        toValue: 0,
        useNativeDriver: false,
      }).start(() =>
        Animated.timing(fadeIn, {
          toValue: 0,
          useNativeDriver: false,
        }).start(),
      )
    }
  }, [activeIndex])

  const selectItem = answerIndex => {
    if (multi) {
      if (answerIndex === 0) {
        setSelectedItem([0])
        onSelectAnswer(0)
      } else {
        const selected = selectedItem
        if (selected.includes(0)) {
          selected.splice(selected.findIndex(item => item === 0), 1)
        }
        selected.push(answerIndex)
        setSelectedItem(selected)
        onSelectAnswer(selected)
      }
    } else {
      setSelectedItem(answerIndex)
      onSelectAnswer(answerIndex)
    }
  }

  return (
    (showAge || (!showAge && index !== 7)) && (
      <View style={styles.rowSteps}>
        <View style={styles.col}>
          <TouchableOpacity onPress={() => onCollapse(index)}>
            <Text
              style={
                activeIndex ||
                (!multi && selectedItem !== null) ||
                (multi && selectedItem.length > 0)
                  ? styles.questionActive
                  : index >= activeIndex && styles.questionInActive
              }>
              {title}
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              height: anim,
            }}>
            {answers &&
              activeIndex &&
              answers.length > 0 &&
              answers.map((answer, answerIndex) => (
                <Animated.View
                  style={[styles.row, {opacity: fadeIn}]}
                  key={answerIndex}>
                  <TouchableOpacity onPress={() => selectItem(answerIndex)}>
                    <View
                      style={[
                        !multi && answerIndex === selectedItem
                          ? styles.selectedButton
                          : styles.selectButton,
                        multi &&
                          selectedItem.includes(answerIndex) &&
                          styles.selectedButton,
                      ]}>
                      <Text
                        style={[
                          styles.answerText,
                          !multi &&
                            answerIndex === selectedItem && {
                              color: Colors.white,
                            },
                          multi &&
                            selectedItem.includes(answerIndex) && {
                              color: Colors.white,
                            },
                        ]}>
                        {answer}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
          </Animated.View>
        </View>
        <View style={styles.step}>
          <TouchableOpacity onPress={() => onCollapse(index)}>
            <View
              style={[
                styles.circle,
                !multi && selectedItem !== null && {backgroundColor: '#33BDBD'},
                multi &&
                  selectedItem.length > 0 && {backgroundColor: '#33BDBD'},
              ]}>
              {(!multi && selectedItem !== null) ||
              (multi && selectedItem.length > 0) ? (
                <Done />
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
          </TouchableOpacity>
          {(!isLast || (isLast && activeIndex)) && (
            <View style={styles.stepLine} />
          )}
        </View>
      </View>
    )
  )
}

export default Question

const styles = StyleSheet.create({
  rowSteps: {
    flexDirection: 'row',
    marginVertical: 0,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  col: {
    flex: 1,
    paddingHorizontal: 15,
  },
  step: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questionActive: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  questionInActive: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
    borderColor: '#33BDBD',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontFamily: 'B Yekan',
    color: '#33BDBD',
  },
  stepLine: {
    flex: 1,
    width: 1,
    borderLeftWidth: 1,
    borderColor: '#33BDBD',
  },
  selectButton: {
    minWidth: 85,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
  },
  selectedButton: {
    minWidth: 85,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#480EC3',
    borderRadius: 5,
    padding: 10,
  },
  answerText: {
    // fontFamily: 'B Yekan',
    textAlign: 'left',
    fontSize: 12,
    justifyContent: 'center',
  },
})
