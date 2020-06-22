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
} from 'react-native'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'
import Woman from '../assets/img/woman.svg'

const {width, height} = Dimensions.get('window')

const Notification = () => {
  const {appState, dispatch} = useContext(Context)

  const openAnim = useRef(new Animated.Value(-height)).current

  useEffect(() => {
    if (appState.notification) {
      Animated.spring(openAnim, {
        toValue: 0,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.spring(openAnim, {
        toValue: -height,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    }
  }, [appState.notification])

  return (
    <>
      <Animated.View style={[styles.container, {marginTop: openAnim}]}>
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
                <View style={[styles.notifItem, {flex: 1}]}>
                  <Woman />
                </View>
                <View style={[styles.notifItem, {flex: 2}]}>
                  <Text style={styles.text}>
                    Mom {appState.i18n.t('circlePage.joined')}
                  </Text>
                </View>
                <View style={[styles.notifItem, {flex: 1}]}>
                  <Text style={styles.text}>
                    1h {appState.i18n.t('homePage.ago')}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
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
    zIndex: 2,
    elevation: 2,
    backgroundColor: 'rgba(153, 204, 255,0.9)',
  },
  notifContainer: {
    height: height * 0.85,
    alignItems: 'center',
  },
  touchable: {
    margin: 10,
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
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
  },
  notifItem: {
    alignItems: 'center',
    padding: 5,
  },
})
