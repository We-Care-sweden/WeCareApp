import React, {useEffect, useState, useContext} from 'react'
import {Platform, StatusBar, I18nManager} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigation from './navigations/TabNavigation'
import messaging from '@react-native-firebase/messaging'
import UUIDGenerator from 'react-native-uuid-generator'
import {GetStorageData, SaveStorageData} from './utils/StorageModule'
import Intro from './components/Intro'
import Notification from './components/Notification'
import Drawer from './components/Drawer'
import {CreateUser} from './modules/User.module'
import {User} from './models/user/User'
import {Context} from './utils/Store'

const Entry = () => {
  const {appState, dispatch} = useContext(Context)
  const [showRealApp, setShowRealApp] = useState(false)

  useEffect(() => {
    requestUserPermission().then(() => {
      // registerAppWithFCM().then(() => {
      //   getFcmToken().then(token => {})
      // })
      addUser('')
    })
    setLocale()
    checkIntro()
  }, [])

  const setLocale = async () => {
    const settingData = await GetStorageData('setting')
    if (settingData.success) {
      const language = JSON.parse(settingData.data).language
      dispatch({type: 'setLanguage', payload: language})
    }
  }

  const checkIntro = async () => {
    const introData = await GetStorageData('showedIntro')
    if (introData.success) {
      if (introData.data === 'true') {
        setShowRealApp(true)
      }
    }
  }

  I18nManager.allowRTL(true)
  I18nManager.forceRTL(appState.i18n.locale === 'farsi' ? true : false)

  const requestUserPermission = async () => {
    const settings = await messaging().requestPermission()
    if (settings) {
      console.log('Permission settings:', settings)
      return true
    }
  }

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages()
    return true
  }

  const getFcmToken = async () => {
    const token = await messaging().getToken()
    return token
  }

  const addUser = async fcmToken => {
    const exists = await GetStorageData('userAdded')
    let deviceUUID = await GetStorageData('deviceUUID')

    if (!exists.success || exists.data !== 'true' || !deviceUUID.success) {
      const user = {}
      Object.assign(user, User)

      if (!deviceUUID.success) {
        let uuid = await UUIDGenerator.getRandomUUID()
        uuid = uuid.slice(0, -4)
        uuid = uuid + 'ECAE'
        deviceUUID.data = uuid
      }

      user.uuid = deviceUUID.data
      user.fcmToken = fcmToken
      user.created = new Date()

      const addData = await CreateUser(user)
      if (addData.success) {
        await SaveStorageData('userAdded', 'true')
        await SaveStorageData('deviceUUID', deviceUUID.data)
      }
    }
  }

  const doneIntro = async () => {
    await SaveStorageData('showedIntro', 'true')
    setShowRealApp(true)
  }

  return (
    <>
      {showRealApp ? (
        <>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <TabNavigation />
            <Notification />
            <Drawer />
          </NavigationContainer>
        </>
      ) : (
        <Intro onDone={() => doneIntro()} />
      )}
    </>
  )
}

export default Entry
