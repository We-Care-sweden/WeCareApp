import React, {createRef, useRef, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native'
import Header from '../components/Header'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Woman from '../assets/img/woman.svg'
import Send from '../assets/img/send.svg'
import {Context} from '../utils/Store'

const {height} = Dimensions.get('window')

const MessageScreen = () => {
  const scrollRef = createRef()
  const {appState} = useContext(Context)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const openAnim = useRef(new Animated.Value(height)).current

  useEffect(() => {
    Animated.spring(openAnim, {
      toValue: 0,
      bounciness: -10,
      useNativeDriver: false,
    }).start()
    scroll()
  }, [])

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [messages])

  const messages = [
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
    {title: 'Hi, Alex! How are you?', time: new Date(), user: {name: 'Mom'}},
    {
      title: 'Hey mom! I am doing good! How about you?',
      time: new Date(),
      user: {name: 'Alex'},
    },
  ]

  const send = () => {
    scroll()
  }

  const scroll = () => {
    scrollRef.current.scrollToEnd({animated: true})
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' && 'padding'}
      style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.container}>
          <Header back={true} />
          <Animated.View style={[styles.box, {marginTop: openAnim}]}>
            <View
              style={[
                styles.row,
                {minHeight: height * 0.09, maxHeight: height * 0.09},
              ]}>
              <View style={styles.col}>
                <Woman />
                <Text style={styles.text}>Mom</Text>
              </View>
            </View>
            <View style={[styles.chatWrapper]}>
              <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => (
                  <Animated.View
                    style={[
                      message.user.name !== 'Alex'
                        ? styles.messageWrapper
                        : styles.selfMessageWrapper,
                      {opacity: fadeAnim},
                    ]}
                    key={index}>
                    <Text style={styles.text}>{message.title}</Text>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>
            <View
              style={[
                styles.row,
                {
                  padding: 5,
                  zIndex: 1,
                  elevation: 2,
                  minHeight: height * 0.08,
                  maxHeight: height * 0.08,
                },
              ]}>
              <TextInput
                style={styles.textInput}
                textAlign={appState.i18n.locale === 'farsi' ? 'right' : 'left'}
                textAlignVertical="center"
                placeholder={appState.i18n.t('circlePage.message')}
                onFocus={() => scroll()}
              />
              <TouchableOpacity onPress={() => send()} style={{margin: 7}}>
                <Send />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#7280FF',
  },
  box: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: '#EDEBFD',
  },
  messageWrapper: {
    width: 200,
    padding: 10,
    alignSelf: 'flex-end',
    backgroundColor: Colors.white,
    margin: 10,
    borderRadius: 10,
  },
  selfMessageWrapper: {
    width: 200,
    padding: 10,
    margin: 10,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#59FF6A',
  },
  textInput: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    flex: 1,
    width: 100,
    height: '80%',
    paddingHorizontal: 15,
    fontSize: 13,
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
