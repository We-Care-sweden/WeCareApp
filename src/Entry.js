import React, {useEffect, useState, useContext} from 'react'
import {Platform, StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigation from './navigations/TabNavigation'
import messaging from '@react-native-firebase/messaging'
// import {Notifications} from 'react-native-notifications'
// import firestore from '@react-native-firebase/firestore'
import UUIDGenerator from 'react-native-uuid-generator'
import {GetStorageData, SaveStorageData} from './utils/StorageModule'
import Intro from './components/Intro'
import Notification from './components/Notification'
import Drawer from './components/Drawer'

const Entry = () => {
  const [showRealApp, setShowRealApp] = useState(false)

  useEffect(() => {
    // requestUserPermission().then(() => {
    //   registerAppWithFCM().then(() => {
    //     getFcmToken()
    //   })
    // })
  }, [])

  const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages()
  }

  const requestUserPermission = async () => {
    const settings = await messaging().requestPermission()

    if (settings) {
      console.log('Permission settings:', settings)
    }
  }

  const getFcmToken = () => {
    messaging()
      .getToken()
      .then(async token => {
        let deviceUUID = (await GetStorageData('deviceUUID')) || {}
        if (!deviceUUID.success) {
          deviceUUID.data = await UUIDGenerator.getRandomUUID()
          await SaveStorageData('deviceUUID', deviceUUID.data)
        }
        await firestore()
          .collection('users')
          .add({device: deviceUUID.data, fcmToken: token})
      })
  }

  return (
    <>
      {showRealApp ? (
        <>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <Drawer />
            <Notification />
            <TabNavigation />
          </NavigationContainer>
        </>
      ) : (
        <Intro onDone={() => setShowRealApp(true)} />
      )}
    </>
  )
}

export default Entry
