import React, {useEffect, useRef, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Like from '../assets/img/like.svg'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'

const {width, height} = Dimensions.get('window')

const FeelGood = ({open, onClose}) => {
  const {appState} = useContext(Context)
  const openAnim = useRef(new Animated.Value(height)).current

  useEffect(() => {
    if (open) {
      Animated.spring(openAnim, {
        toValue: 0,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.spring(openAnim, {
        toValue: height,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    }
  }, [open])

  return (
    <Animated.View style={[styles.container, {marginTop: openAnim}]}>
      <LinearGradient
        colors={['#7280FF', '#351ADC']}
        style={styles.linearGradient}>
        <SafeAreaView>
          <View style={{alignItems: 'flex-end', width}}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => onClose()}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.boxwrapper}>
            <View style={styles.box}>
              <View style={styles.row}>
                <Like />
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {appState.i18n.t('homePage.feelGoodTitle')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {appState.i18n.t('homePage.feelGoodDescription')}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.colText}>
                    {appState.i18n.t('homePage.reports')}
                  </Text>
                  <Text style={styles.colValue}>10</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.colText}>
                    {appState.i18n.t('homePage.invited')}
                  </Text>
                  <Text style={styles.colValue}>3</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.colText}>
                    {appState.i18n.t('homePage.badge')}
                  </Text>
                  <Text style={styles.colValue}>2</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  )
}

export default FeelGood

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 2,
    elevation: 2,
  },
  linearGradient: {
    flex: 1,
  },
  boxwrapper: {
    alignItems: 'center',
  },
  box: {
    padding: 10,
    width: width * 0.95,
    alignItems: 'center',
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'B Yekan',
    padding: 10,
    fontSize: 23,
    // fontWeight: 'bold',
  },
  text: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    padding: 10,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colText: {
    fontFamily: 'B Yekan',
  },
  colValue: {
    fontFamily: 'B Yekan',
    fontSize: 40,
    fontWeight: 'bold',
  },
  touchable: {
    margin: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
