import React, {useContext, useRef, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'
import Woman from '../assets/img/woman.svg'

const {width, height} = Dimensions.get('window')

const Notification = () => {
  const {appState, dispatch} = useContext(Context)

  const openAnim = useRef(new Animated.Value(-height)).current

  useEffect(() => {
    if (appState.notification) {
      Animated.timing(openAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(openAnim, {
        toValue: -height,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }, [appState.notification])

  return (
    <>
      <Animated.View style={[styles.container, {marginTop: openAnim}]}>
        {/* <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}> */}
        <SafeAreaView>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => dispatch({type: 'hideNotification'})}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.notifContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.notification}>
                <View
                  style={[
                    styles.notifItem,
                    {
                      flex: 1,
                    },
                  ]}>
                  <Woman />
                </View>
                <View
                  style={[
                    styles.notifItem,
                    {
                      flex: 2,
                    },
                  ]}>
                  <Text>Mom has joined your circle</Text>
                </View>
                <View
                  style={[
                    styles.notifItem,
                    {
                      flex: 1,
                    },
                  ]}>
                  <Text>1h ago</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        {/* </LinearGradient> */}
      </Animated.View>
    </>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(153, 204, 255,0.8)',
  },
  notifContainer: {
    height: height * 0.85,
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  touchable: {
    margin: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    flexDirection: 'row',
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
    width: width * 0.95,
    height: 100,
    alignItems: 'center',
    marginVertical: 10,
  },
  notifItem: {
    alignItems: 'center',
    padding: 5,
  },
})
