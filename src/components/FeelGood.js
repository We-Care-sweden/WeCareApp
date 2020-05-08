import React, {useEffect, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Like from '../assets/img/like.svg'
import Close from '../assets/img/close.svg'

const {width, height} = Dimensions.get('window')

const FeelGood = ({open, onClose}) => {
  const openAnim = useRef(new Animated.Value(height)).current

  useEffect(() => {
    if (open) {
      Animated.timing(openAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(openAnim, {
        toValue: height,
        duration: 300,
        easing: Easing.ease,
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
                  That’s awesome! We are happy that you are feeling good!
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Keep reporting your health condition daily to earn new badges!
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.colText}>Total Reports</Text>
                  <Text style={styles.colValue}>10</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.colText}>People Invited</Text>
                  <Text style={styles.colValue}>3</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.colText}>Your badge</Text>
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
    zIndex: 1,
    elevation: 1,
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
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
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
    fontWeight: 'bold',
  },
  colValue: {
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
