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
  Switch,
  Platform,
  Alert,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import {Picker} from '@react-native-community/picker'
import {
  ClearStorage,
  GetStorageData,
  SaveStorageData,
} from '../utils/StorageModule'

const {width, height} = Dimensions.get('window')

const Drawer = () => {
  const {appState, dispatch} = useContext(Context)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [shareDataEnabled, setShareDataEnabled] = useState(false)
  const [shareLocationEnabled, setShareLocationEnabled] = useState(false)
  const [contactTracingEnabled, setContactTracingEnabled] = useState(false)
  const [date, setDate] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(appState.i18n.locale)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)

  const openAnim = useRef(new Animated.Value(-width)).current

  useEffect(() => {
    if (appState.drawer) {
      Animated.spring(openAnim, {
        toValue: 0,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
      loadSetting()
    } else {
      Animated.spring(openAnim, {
        toValue: -width,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    }
  }, [appState.drawer])

  const loadSetting = async () => {
    const settingData = await GetStorageData('setting')
    if (settingData.success) {
      const setting = JSON.parse(settingData.data)
      setDate(new Date(setting.date))
      setPushEnabled(setting.push)
      setShareDataEnabled(setting.data)
      setShareLocationEnabled(setting.location)
      setContactTracingEnabled(setting.contact)
      setSelectedLanguage(setting.language)
    }
  }

  const saveSetting = async (type, value) => {
    const setting = {
      date,
      push: pushEnabled,
      data: shareDataEnabled,
      location: shareLocationEnabled,
      contact: contactTracingEnabled,
      language: selectedLanguage,
    }
    switch (type) {
      case 'date':
        setting.date = value
        break
      case 'push':
        setting.push = value
        break
      case 'data':
        setting.data = value
        break
      case 'location':
        setting.location = value
        break
      case 'contact':
        setting.contact = value
        break
      case 'language':
        setting.language = value
        break
      default:
        break
    }
    await SaveStorageData('setting', JSON.stringify(setting))
  }

  const toggleSwitch = key => {
    switch (key) {
      case 'push':
        setPushEnabled(previousState => {
          saveSetting('push', !previousState)
          return !previousState
        })
        break
      case 'data':
        setShareDataEnabled(previousState => {
          saveSetting('data', !previousState)
          return !previousState
        })
        break
      case 'location':
        setShareLocationEnabled(previousState => {
          saveSetting('location', !previousState)
          return !previousState
        })
        break
      case 'CT':
        setContactTracingEnabled(previousState => {
          saveSetting('contact', !previousState)
          return !previousState
        })
        break
      default:
        break
    }
  }

  const changeTime = (event, selectedDate) => {
    setDate(selectedDate)
    saveSetting('date', selectedDate)
    Platform.OS === 'android' && setShowTimePicker(false)
  }

  const selectLanguage = value => {
    setSelectedLanguage(value)
    setShowLanguagePicker(false)
    dispatch({type: 'setLanguage', payload: value})
    saveSetting('language', value)
    Alert.alert(
      appState.i18n.t('drawer.changeLanguage'),
      appState.i18n.t('drawer.restart'),
    )
  }

  const clearData = () => {
    Alert.alert(
      'Clear Storage Data',
      'Do you really want to clear all your data? You will no longer have access to your care circles and self reports!',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await ClearStorage()
          },
        },
      ],
      {cancelable: true},
    )
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
              <View style={styles.menuItem}>
                <Text style={styles.text}>
                  {appState.i18n.t('drawer.about')}
                </Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.text}>
                  {appState.i18n.t('drawer.privacy')}
                </Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.text}>
                  {appState.i18n.t('drawer.terms')}
                </Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.text}>
                  {appState.i18n.t('drawer.feedback')}
                </Text>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.reminder')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1.5, alignItems: 'flex-end'}]}>
                  {showTimePicker ? (
                    <View style={styles.row}>
                      <DateTimePicker
                        value={date}
                        mode="time"
                        is24Hour
                        display="default"
                        neutralButtonLabel="clear"
                        onChange={changeTime}
                        neutralButtonLabel="clear"
                        style={{
                          width: '100%',
                          height: 45,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}>
                        <Icon name="check-circle" size={25} color="gray" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={[styles.row, {height: 45}]}>
                      <Text style={{fontWeight: 'bold'}}>
                        {(date.getHours() < 10
                          ? '0' + date.getHours()
                          : date.getHours()) +
                          ' : ' +
                          (date.getMinutes() < 10
                            ? '0' + date.getMinutes()
                            : date.getMinutes())}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        style={{margin: 10}}>
                        <Icon name="edit" size={25} color="gray" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.push')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1, alignItems: 'center'}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('push')}
                    value={pushEnabled}
                  />
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.shareData')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1, alignItems: 'center'}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('data')}
                    value={shareDataEnabled}
                  />
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.shareLocation')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1, alignItems: 'center'}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('location')}
                    value={shareLocationEnabled}
                  />
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.contactTracing')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1, alignItems: 'center'}]}>
                  <Switch
                    trackColor={{false: '#C4C4C4', true: '#33BDBD'}}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="#C4C4C4"
                    onValueChange={() => toggleSwitch('CT')}
                    value={contactTracingEnabled}
                  />
                </View>
              </View>
              <View style={styles.menuItem}>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>
                    {appState.i18n.t('drawer.language')}
                  </Text>
                </View>
                <View style={[styles.col, {flex: 1, alignItems: 'center'}]}>
                  {showLanguagePicker ? (
                    <Picker
                      selectedValue={selectedLanguage}
                      style={{height: 45, width: 120}}
                      mode="dropdown"
                      onValueChange={itemValue => selectLanguage(itemValue)}>
                      <Picker.Item label="English" value="english" />
                      {/* <Picker.Item label="Persian" value="farsi" /> */}
                    </Picker>
                  ) : (
                    <View
                      style={[
                        styles.row,
                        {
                          width: 100,
                          height: 45,
                          justifyContent: 'space-around',
                        },
                      ]}>
                      <Text style={styles.text}>{selectedLanguage}</Text>
                      <TouchableOpacity
                        onPress={() => setShowLanguagePicker(true)}>
                        <Icon name="edit" size={25} color="gray" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={[styles.menuItem, {width: 250}]}>
                <TouchableOpacity
                  style={styles.clearStorage}
                  onPress={() => clearData()}>
                  <View style={[styles.col, {flex: 2}]}>
                    <Text style={styles.text}>Clear Local Storage</Text>
                  </View>
                </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    width,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: -3,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'B Yekan',
    fontSize: 18,
  },
  menuContainer: {
    height: height * 0.95,
    alignItems: 'center',
  },
  clearStorage: {
    borderRadius: 50,
    backgroundColor: '#99ccff',
    padding: 10,
  },
})
