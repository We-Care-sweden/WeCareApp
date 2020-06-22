import React, {useEffect, useState, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import MapView, {Heatmap, PROVIDER_GOOGLE} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Header from '../components/Header'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import {LineChart} from 'react-native-chart-kit'
import {Context} from '../utils/Store'
import {EditUser, GetCircleData, GetUser} from '../modules/User.module'
import {GetStorageData} from '../utils/StorageModule'
import {Location} from '../models/user/Location'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const {width, height} = Dimensions.get('window')

const MapScreen = () => {
  const {appState} = useContext(Context)
  const [viewMode, setViewMode] = useState('map')
  const [locationInfo, setLocationInfo] = useState()
  const [members, setMembers] = useState([])
  const [activeMemberIndex, setActiveMemberIndex] = useState(null)

  const [mapCoords, setMapCoords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setLocationInfo(info)
        const location = {}
        Object.assign(location, Location)
        location.lat = info.coords.latitude
        location.long = info.coords.longitude
        setMapCoords({
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
        updateUserLocaton(location)
      },
      err => {
        console.log(err)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
    getCircles()
  }, [])

  const getCircles = async () => {
    const deviceUUID = await GetStorageData('deviceUUID')
    if (deviceUUID.success) {
      const circleData = await GetCircleData(deviceUUID.data)
      if (circleData.success) {
        setMembers(circleData.data)
      }
    }
  }

  const datasets = [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      color: (opacity = 1) => `rgba(233, 83, 24, ${opacity})`,
    },
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
      color: (opacity = 1) => `rgba(2, 208, 237, ${opacity})`,
    },
  ]

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Friday', 'Sat', 'Sun']

  // const HEATMAPOINTS1 = [
  //   {latitude: 57.754, longitude: 11.952, weight: 1},
  //   {latitude: 57.747, longitude: 11.923, weight: 1},
  //   {latitude: 57.735, longitude: 11.945, weight: 1},
  // ]
  // const HEATMAPOINTS2 = [
  //   {latitude: 57.774, longitude: 11.952, weight: 1},
  //   {latitude: 57.752, longitude: 11.913, weight: 1},
  //   {latitude: 57.685, longitude: 11.925, weight: 1},
  // ]

  // const HEATMAPOINTS3 = [
  //   {latitude: 35.699, longitude: 51.351, weight: 1},
  //   {latitude: 35.712, longitude: 51.362, weight: 1},
  //   {latitude: 35.685, longitude: 51.322, weight: 1},
  // ]

  const selectMember = async (index, uuid) => {
    const userData = await GetUser(uuid)
    if (userData.success) {
      setMapCoords({
        latitude: userData.data.location.lat,
        longitude: userData.data.location.long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      })
    }
    setActiveMemberIndex(index)
  }

  const selectMe = () => {
    setMapCoords({
      latitude: locationInfo.coords.latitude,
      longitude: locationInfo.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    })
    setActiveMemberIndex(null)
    getCircles()
  }

  const updateUserLocaton = async location => {
    try {
      const deviceUUID = await GetStorageData('deviceUUID')
      if (deviceUUID.success) {
        const user = {location}
        await EditUser(deviceUUID.data, user)
      }
    } catch (error) {}
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header />
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          {locationInfo && (
            <>
              <View style={styles.switchButtonsWrapper}>
                {viewMode === 'map' ? (
                  <View style={styles.switchButtons}>
                    <LinearGradient
                      colors={['#7280FF', '#351ADC']}
                      style={styles.gradient}>
                      <TouchableOpacity
                        style={styles.switchButtonActive}
                        onPress={() => setViewMode('map')}>
                        <Text style={styles.activeText}>
                          {appState.i18n.t('mapPage.heatMap')}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <TouchableOpacity
                      style={styles.switchButtonNormal}
                      onPress={() => setViewMode('stats')}>
                      <Text style={styles.inActiveText}>
                        {appState.i18n.t('mapPage.stats')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.switchButtons}>
                    <TouchableOpacity
                      style={styles.switchButtonNormal}
                      onPress={() => setViewMode('map')}>
                      <Text style={styles.inActiveText}>
                        {appState.i18n.t('mapPage.heatMap')}
                      </Text>
                    </TouchableOpacity>
                    <LinearGradient
                      colors={['#7280FF', '#351ADC']}
                      style={styles.gradient}>
                      <TouchableOpacity
                        style={styles.switchButtonActive}
                        onPress={() => setViewMode('stats')}>
                        <Text style={styles.activeText}>
                          {appState.i18n.t('mapPage.stats')}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
              </View>
              <View style={styles.descriptionWrapper}>
                {viewMode === 'map' ? (
                  <Text style={styles.description}>
                    {appState.i18n.t('mapPage.mapDescription')}
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    {appState.i18n.t('mapPage.statsDescription')}
                  </Text>
                )}
              </View>
              {viewMode === 'map' ? (
                <View style={styles.mapWrapper}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    region={mapCoords}
                    style={styles.mapView}
                    // showsMyLocationButton={true}
                    showsScale={true}
                    showsUserLocation={true}>
                    {/* <Heatmap
                      points={HEATMAPOINTS1}
                      radius={50}
                      opacity={0.5}
                      gradient={{
                        colors: ['#00d0ff'],
                        startPoints: [0.01],
                        colorMapSize: 64,
                      }}
                    />
                    <Heatmap
                      points={HEATMAPOINTS2}
                      radius={50}
                      opacity={0.5}
                      gradient={{
                        colors: ['#e95e28'],
                        startPoints: [0.01],
                        colorMapSize: 64,
                      }}
                    />
                    <Heatmap
                      points={HEATMAPOINTS3}
                      radius={50}
                      opacity={0.5}
                      gradient={{
                        colors: ['#e95e28'],
                        startPoints: [0.01],
                        colorMapSize: 64,
                      }}
                    /> */}
                  </MapView>
                  <View style={styles.guideWrapperWhite}>
                    <View style={styles.col}>
                      <View style={styles.recovered} />
                      <Text style={styles.guideText}>
                        {appState.i18n.t('mapPage.recovered')}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <View style={styles.infected} />
                      <Text style={styles.guideText}>
                        {appState.i18n.t('mapPage.infected')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {members.map((member, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.controlButtons,
                            index === activeMemberIndex && {
                              backgroundColor: '#4457FF',
                            },
                          ]}
                          onPress={() => selectMember(index, member.uuid)}>
                          {member.icon === 0 ? (
                            <Woman />
                          ) : member.icon === 1 ? (
                            <Man />
                          ) : (
                            member.icon === 2 && <Kid />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      // backgroundColor: Colors.white,
                    }}>
                    <TouchableOpacity
                      style={styles.controlButtons}
                      onPress={() => selectMe()}>
                      <Icon name="location-arrow" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.statsWrapper}>
                  <View style={styles.guideWrapper}>
                    <View style={styles.col}>
                      <Text style={styles.guideNumber}>37</Text>
                      <View style={styles.recovered} />
                      <Text style={styles.guideText}>
                        {appState.i18n.t('mapPage.recovered')}
                      </Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.guideNumber}>423</Text>
                      <View style={styles.infected} />
                      <Text style={styles.guideText}>
                        {appState.i18n.t('mapPage.infected')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.chartWrapper}>
                    <LineChart
                      data={{
                        labels,
                        datasets,
                      }}
                      width={width}
                      height={height * 0.4}
                      withShadow={false}
                      segments={10}
                      chartConfig={{
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: '#ffffff',
                        backgroundGradientToOpacity: 1,
                        color: (opacity = 1) => `rgba(25, 0, 181, ${opacity})`,
                        strokeWidth: 5,
                        decimalPlaces: 0,
                      }}
                      bezier
                    />
                  </View>
                </View>
              )}
            </>
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  switchButtonsWrapper: {
    paddingHorizontal: 100,
    paddingVertical: 5,
  },
  switchButtons: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1.3,
    borderRadius: 50,
    padding: 5,
  },
  switchButtonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
  switchButtonNormal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  activeText: {
    fontFamily: 'B Yekan',
    color: '#351ADC',
  },
  inActiveText: {
    fontFamily: 'B Yekan',
    color: '#C4C4C4',
  },
  description: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
  },
  descriptionWrapper: {
    padding: 30,
  },
  linearGradient: {
    flex: 1,
  },
  mapWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    height: height * 0.6,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  mapView: {
    height: height * 0.6,
  },
  guideWrapperWhite: {
    position: 'absolute',
    width: 240,
    left: width / 2 - 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  guideWrapper: {
    width: 240,
    marginLeft: width / 2 - 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  guideText: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: '#351ADC',
  },
  guideNumber: {
    // fontFamily: 'B Yekan',
    textAlign: 'left',
    fontSize: 25,
    color: '#351ADC',
    fontWeight: 'bold',
  },
  recovered: {
    width: 75,
    height: 10,
    backgroundColor: '#02D0ED',
    borderRadius: 5,
    margin: 8,
  },
  infected: {
    width: 75,
    height: 10,
    backgroundColor: '#E95318',
    borderRadius: 5,
    margin: 8,
  },
  buttonWrapper: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.01,
    height: height * 0.5,
  },
  controlButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    borderRadius: 50,
    margin: 10,
    zIndex: 1,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  statsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    height: height * 0.6,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
})
