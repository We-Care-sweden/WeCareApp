import React, {useRef, useContext, useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Easing,
  Switch,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'
import DateTimePicker from '@react-native-community/datetimepicker'
import Dp3tSwitch from './Dp3tSwitch';

const {width, height} = Dimensions.get('window')

const Drawer = () => {
  const {appState, dispatch} = useContext(Context)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [shareDataEnabled, setShareDataEnabled] = useState(false)
  const [shareLocationEnabled, setShareLocationEnabled] = useState(false)
  const [contactTracingEnabled, setContactTracingEnabled] = useState(false)
  const [date, setDate] = useState(new Date())

  const openAnim = useRef(new Animated.Value(-width)).current

  useEffect(() => {
    if (appState.drawer) {
      Animated.timing(openAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(openAnim, {
        toValue: -width,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }, [appState.drawer])

  const toggleSwitch = key => {
    switch (key) {
      case 'push':
        setPushEnabled(previousState => !previousState)
        break
      case 'data':
        setShareDataEnabled(previousState => !previousState)
        break
      case 'location':
        setShareLocationEnabled(previousState => !previousState)
        break
      case 'CT':
        setContactTracingEnabled(previousState => !previousState)
        break

      default:
        break
    }
  }

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  return (
    <Animated.View style={[styles.container, {marginLeft: openAnim}]}>
      <LinearGradient
        colors={['#99ccff', '#FFFFFF']}
        style={styles.linearGradient}>
        <SafeAreaView>
          <View style={styles.menuContainer}>
            <View style={{alignItems: 'flex-end', width}}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => dispatch({type: 'closeDrawer'})}>
                <Close />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.row}>
                <Text style={styles.text}>About</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Privacy Policy</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Terms and Condition</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Send us feedback</Text>
              </View>

              <View style={styles.row}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Set daily reminder time</Text>
                </View>
                <View style={[styles.col, {flex: 1.5}]}>
                  <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour
                    onTimeChange={onTimeChange}
                    style={{width: '100%', height: 45}}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Enable push notifications</Text>
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('push')}
                    value={pushEnabled}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Share anonymized data</Text>
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('data')}
                    value={shareDataEnabled}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Share Location services</Text>
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('location')}
                    value={shareLocationEnabled}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Enable Contact tracing</Text>
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Dp3tSwitch />
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  )
}

export default Drawer

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
  row: {
    width,
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {},
  menuContainer: {
    height: height * 0.95,
    alignItems: 'center',
  },
})
