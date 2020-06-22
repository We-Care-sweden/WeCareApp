import React, {useRef, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Success from '../assets/img/success.svg'
import {Context} from '../utils/Store'

const {width} = Dimensions.get('window')

const SuccessDialog = ({open, onClose}) => {
  const {appState} = useContext(Context)
  const openAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const zIndexAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (open) {
      Animated.timing(zIndexAnim, {
        toValue: 2,
        duration: 50,
        useNativeDriver: false,
      }).start(() =>
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start(() =>
          Animated.spring(openAnim, {
            toValue: 1,
            speed: 100,
            bounciness: -10,
            useNativeDriver: false,
          }).start(),
        ),
      )
    } else {
      Animated.spring(openAnim, {
        toValue: 0,
        speed: 100,
        bounciness: -10,
        useNativeDriver: false,
      }).start()
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() =>
        Animated.timing(zIndexAnim, {
          toValue: -1,
          duration: 50,
          useNativeDriver: false,
        }).start(),
      )
    }
  }, [open])

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, zIndex: zIndexAnim}]}>
      <SafeAreaView>
        <View style={styles.dialogContainer}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{scaleX: openAnim}, {scaleY: openAnim}],
              },
            ]}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {appState.i18n.t('circlePage.success')} Mom{' '}
                {appState.i18n.t('circlePage.receiveReminder')}
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.send} onPress={() => onClose()}>
                <Success />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

export default SuccessDialog

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 2,
    elevation: 2,
    backgroundColor: 'rgba(153, 204, 255,0.5)',
  },
  dialogContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  box: {
    width: width * 0.9,
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
    padding: 20,
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
  },
  send: {
    backgroundColor: '#33BDBD',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
})
