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
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Context} from '../utils/Store'

const {width, height} = Dimensions.get('window')

const ConfirmDelete = ({open, name, onCancel, onRemove}) => {
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
              {transform: [{scaleX: openAnim}, {scaleY: openAnim}]},
            ]}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {appState.i18n.t('homePage.removeQuestion')}
                {name}
                {appState.i18n.t('homePage.removeFrom')}
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => onCancel()}>
                <Text style={styles.text}>
                  {appState.i18n.t('homePage.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => onRemove()}>
                <Text style={[styles.text, {color: Colors.white}]}>
                  {appState.i18n.t('homePage.remove')}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

export default ConfirmDelete

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
    // borderWidth: 1,
  },
  box: {
    width: width * 0.9,
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
    padding: 20,
  },
  cancel: {
    backgroundColor: Colors.white,
    width: 140,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    backgroundColor: '#DF1F32',
    width: 140,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
})
