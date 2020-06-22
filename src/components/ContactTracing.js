import React, {useState, useEffect, useContext} from 'react'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'

import Moment from 'moment'

import {Alert, Platform} from 'react-native'
import {NativeEventEmitter, NativeModules} from 'react-native'
import BLEAdvertiser from 'react-native-ble-advertiser'
import update from 'immutability-helper'

import {Colors} from 'react-native/Libraries/NewAppScreen'

import {PermissionsAndroid} from 'react-native'
import {GetStorageData, SaveStorageData} from '../utils/StorageModule'
import {Context} from '../utils/Store'
import {EditUser} from '../modules/User.module'
import Geolocation from '@react-native-community/geolocation'
import {AddLocation} from '../modules/User.module'

const {width, height} = Dimensions.get('window')

const ContactTracing = () => {
  const {appState} = useContext(Context)
  const [devicesFound, setDevicesFound] = useState(new Map())
  const [isLogging, setIsLogging] = useState(false)

  useEffect(() => {
    requestLocationPermission()

    console.log('BLE Advertiser', BLEAdvertiser)
    // Uses the Apple code to pick up iPhones
    BLEAdvertiser.setCompanyId(0x4c)

    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser)

    eventEmitter.addListener('onDeviceFound', event => {
      if (event.serviceUuids.length > 0) {
        for (let i = 0; i < event.serviceUuids.length; i++) {
          if (
            event.serviceUuids[i] &&
            event.serviceUuids[i].endsWith('ECAE') &&
            Math.abs(event.rssi) < 45
          ) {
            addDevice(
              event.serviceUuids[i],
              event.deviceName,
              event.rssi,
              new Date(),
            )
          }
        }
      }
    })

    getLocalContacts()
    trackLocation()
    trackContactTracing()
  }, [])

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'BLE Avertiser Example App',
            message: 'Example App access to your location ',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location')
        } else {
          console.log('location permission denied')
        }
      }

      const blueoothActive = await BLEAdvertiser.getAdapterState()
        .then(result => {
          console.log('[Bluetooth]', 'isBTActive', result)
          return result === 'STATE_ON'
        })
        .catch(error => {
          console.log('[Bluetooth]', 'BT Not Enabled')
          return false
        })

      if (!blueoothActive) {
        await Alert.alert(
          'Contact Tracing requires bluetooth to be enabled',
          'Would you like to enable Bluetooth?',
          [
            {
              text: 'Yes',
              onPress: () => {
                BLEAdvertiser.enableAdapter()
                console.log('BT Active?', blueoothActive)
                start()
              },
            },
            {
              text: 'No',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
        )
      }

      console.log('BT Active?', blueoothActive)
    } catch (err) {
      console.warn(err)
    }
  }

  const getLocalContacts = async () => {
    const contactsData = await GetStorageData('contactTracing')
    let contacts = new Map()

    if (contactsData.success) {
      contacts = new Map(JSON.parse(contactsData.data))
      setDevicesFound(contacts)
    }
  }

  const trackLocation = async () => {
    const uuidData = await GetStorageData('deviceUUID')
    if (uuidData.success) {
      setInterval(() => {
        Geolocation.getCurrentPosition(
          async info => {
            const user = {
              uuid: uuidData.data,
              lat: info.coords.latitude,
              long: info.coords.longitude,
            }
            addLocation(user)
          },
          err => {
            console.log(err)
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )
      }, 900000)
    }
  }

  const trackContactTracing = async () => {
    const uuidData = await GetStorageData('deviceUUID')
    if (uuidData.success) {
      setInterval(() => {
        GetStorageData('contactTracing').then(ctData => {
          if (ctData.success) {
            const user = {contactTracing: {...JSON.parse(ctData.data)}}
            EditUser(uuidData.data, user)
          }
        })
      }, 900000)
    }
  }

  const addLocation = async user => {
    await AddLocation(user)
  }

  const start = async () => {
    const deviceUUID = await GetStorageData('deviceUUID')

    if (deviceUUID.success) {
      let uuid = deviceUUID.data
      console.log(uuid, 'Starting Advertising')
      // Manuf Data [1,0] picks up iPhones
      BLEAdvertiser.broadcast(uuid, [1, 0], {
        advertiseMode: BLEAdvertiser.ADVERTISE_MODE_BALANCED,
        txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_MEDIUM,
        connectable: false,
        includeDeviceName: false,
        includeTxPowerLevel: false,
      })
        .then(sucess => console.log(uuid, 'Adv Successful', sucess))
        .catch(error => console.log(uuid, 'Adv Error', error))

      console.log(uuid, 'Starting Scanner')
      // Manuf Data [1,0] picks up iPhones
      BLEAdvertiser.scan([1, 0], {})
        .then(sucess => console.log(uuid, 'Scan Successful', sucess))
        .catch(error => console.log(uuid, 'Scan Error', error))

      setIsLogging(true)
    }
  }

  const addDevice = async (_uuid, _name, _rssi, _date) => {
    const contactsData = await GetStorageData('contactTracing')
    let contacts = new Map()
    Geolocation.getCurrentPosition(
      async info => {
        const dev = {
          uuid: _uuid,
          name: _name,
          rssi: _rssi,
          time: _date,
          lat: info.coords.latitude,
          long: info.coords.longitude,
        }
        if (contactsData.success) {
          contacts = new Map(JSON.parse(contactsData.data))
          contacts.set(_uuid, {...dev})
        } else {
          contacts.set(_uuid, {...dev})
        }
        await SaveStorageData(
          'contactTracing',
          JSON.stringify(Array.from(contacts.entries())),
        )
        setDevicesFound(new Map(devicesFound.set(_uuid, {...dev})))
      },
      err => {
        console.log(err)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  }

  const updateUserContacts = async contacts => {
    try {
      const deviceUUID = await GetStorageData('deviceUUID')
      if (deviceUUID.success) {
        const user = {contactTracing: contacts}
        await EditUser(deviceUUID.data, user)
      }
    } catch (error) {}
  }

  const stop = () => {
    console.log('Stopping Broadcast')
    BLEAdvertiser.stopBroadcast()
      .then(sucess => console.log('Stop Broadcast Successful', sucess))
      .catch(error => console.log('Stop Broadcast Error', error))

    console.log('Stopping Scanning')
    BLEAdvertiser.stopScan()
      .then(sucess => console.log('Stop Scan Successful', sucess))
      .catch(error => console.log('Stop Scan Error', error))

    setIsLogging(false)
  }

  const onClearArray = () => {
    setDevicesFound(new Map())
  }

  const short = str => {
    return (
      str.substring(0, 4) +
      ' ... ' +
      str.substring(str.length - 4, str.length)
    ).toUpperCase()
  }

  return (
    <SafeAreaView>
      <View style={styles.body}>
        {isLogging && (
          <Image
            source={require('../assets/img/radar.gif')}
            style={{width: 100, height: 100}}
          />
        )}

        <Text style={styles.text}>
          {appState.i18n.t('contactTracing.contact')}
          {devicesFound.size} {appState.i18n.t('contactTracing.people')}
        </Text>

        {/* <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>BLE Advertiser Demo</Text>
          <Text style={styles.sectionDescription}>
            Broadcasting: <Text style={styles.highlight}>{}</Text>
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          {isLogging ? (
            <TouchableOpacity
              onPress={() => stop()}
              style={styles.stopLoggingButtonTouchable}>
              <Text style={styles.stopLoggingButtonText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => start()}
              style={styles.startLoggingButtonTouchable}>
              <Text style={styles.startLoggingButtonText}>Start</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionContainerFlex}>
          <Text style={styles.sectionTitle}>Devices Around</Text>
          {Array.from(devicesFound.keys()).map(item => (
            <Text style={styles.itemPastConnections}>
              {short(devicesFound.get(item).device.uuid)}{' '}
              {devicesFound.get(item).device.rssi}
            </Text>
          ))} */}
        {/* <FlatList
            data={devicesFound}
            renderItem={({item}) => (
              <Text style={styles.itemPastConnections}>
                {short(item.device.uuid)} {item.device.mac} {item.device.rssi}
              </Text>
            )}
            keyExtractor={item => item.device.uuid}
          /> */}
        {/* </View> */}

        {/* <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={onClearArray}
            style={styles.startLoggingButtonTouchable}>
            <Text style={styles.startLoggingButtonText}>Clear Devices</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    // backgroundColor: Colors.white,
    height: '100%',
    alignItems: 'center',
  },
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    flex: 0,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  startLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#fd4a4a',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  stopLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  listPastConnections: {
    width: '80%',
    height: 200,
  },
  itemPastConnections: {
    padding: 3,
    fontSize: 18,
    fontWeight: '400',
  },
  text: {
    // fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
    margin: 10,
  },
})

export default ContactTracing
