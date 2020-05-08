import React, {useEffect, useState} from 'react'
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
// import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Header from '../components/Header'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import {LineChart} from 'react-native-chart-kit'

const {width, height} = Dimensions.get('window')

const MapScreen = () => {
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

  const [viewMode, setViewMode] = useState('map')
  const [locationInfo, setLocationInfo] = useState()

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
        setMapCoords({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        })
      },
      err => {
        console.log(err)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  }, [])

  const HEATMAPOINTS1 = [
    {latitude: 57.754, longitude: 11.952, weight: 1},
    {latitude: 57.747, longitude: 11.923, weight: 1},
    {latitude: 57.735, longitude: 11.945, weight: 1},
  ]
  const HEATMAPOINTS2 = [
    {latitude: 57.774, longitude: 11.952, weight: 1},
    {latitude: 57.752, longitude: 11.913, weight: 1},
    {latitude: 57.685, longitude: 11.925, weight: 1},
  ]

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          {locationInfo && (
            <>
              <Header />
              <View style={styles.switchButtonsWrapper}>
                {viewMode === 'map' ? (
                  <View style={styles.switchButtons}>
                    <LinearGradient
                      colors={['#7280FF', '#351ADC']}
                      style={styles.gradient}>
                      <TouchableOpacity
                        style={styles.switchButtonActive}
                        onPress={() => setViewMode('map')}>
                        <Text style={styles.activeText}>Heat Map</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <TouchableOpacity
                      style={styles.switchButtonNormal}
                      onPress={() => setViewMode('stats')}>
                      <Text style={styles.inActiveText}>Stats</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.switchButtons}>
                    <TouchableOpacity
                      style={styles.switchButtonNormal}
                      onPress={() => setViewMode('map')}>
                      <Text style={styles.inActiveText}>Heat Map</Text>
                    </TouchableOpacity>
                    <LinearGradient
                      colors={['#7280FF', '#351ADC']}
                      style={styles.gradient}>
                      <TouchableOpacity
                        style={styles.switchButtonActive}
                        onPress={() => setViewMode('stats')}>
                        <Text style={styles.activeText}>Stats</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
              </View>
              <View style={styles.descriptionWrapper}>
                {viewMode === 'map' ? (
                  <Text style={styles.description}>
                    Take better preventive action knowing the epidemic situation
                    in your Care Circle member’s area
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    Overview of the current COVID-19 climate in your area
                    gathered from our community.
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
                    <Heatmap
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
                  </MapView>
                  <View style={styles.guideWrapperWhite}>
                    <View style={styles.col}>
                      <View style={styles.recovered} />
                      <Text style={styles.guideText}>Recovered</Text>
                    </View>
                    <View style={styles.col}>
                      <View style={styles.infected} />
                      <Text style={styles.guideText}>Infected</Text>
                    </View>
                  </View>
                  <View style={styles.buttonWrapper}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={() => {
                          setMapCoords({
                            latitude: locationInfo.coords.latitude,
                            longitude: locationInfo.coords.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                          })
                        }}>
                        <Woman />
                        {/* <Icon name="dot-circle" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        disabled={
                          mapCoords.latitudeDelta <= 0.01 ||
                          mapCoords.longitudeDelta <= 0.01
                        }
                        onPress={() => {
                          setMapCoords({
                            latitude: mapCoords.latitude,
                            longitude: mapCoords.longitude,
                            latitudeDelta: mapCoords.latitudeDelta - 0.01,
                            longitudeDelta: mapCoords.longitudeDelta - 0.01,
                          })
                        }}>
                        <Man />
                        {/* <Icon name="plus" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={() =>
                          setMapCoords({
                            latitude: mapCoords.latitude,
                            longitude: mapCoords.longitude,
                            latitudeDelta: mapCoords.latitudeDelta + 0.01,
                            longitudeDelta: mapCoords.longitudeDelta + 0.01,
                          })
                        }>
                        <Kid />
                        {/* <Icon name="minus" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={() =>
                          setMapCoords({
                            latitude: mapCoords.latitude,
                            longitude: mapCoords.longitude,
                            latitudeDelta: mapCoords.latitudeDelta + 0.01,
                            longitudeDelta: mapCoords.longitudeDelta + 0.01,
                          })
                        }>
                        <Kid />
                        {/* <Icon name="minus" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={() =>
                          setMapCoords({
                            latitude: mapCoords.latitude,
                            longitude: mapCoords.longitude,
                            latitudeDelta: mapCoords.latitudeDelta + 0.01,
                            longitudeDelta: mapCoords.longitudeDelta + 0.01,
                          })
                        }>
                        <Kid />
                        {/* <Icon name="minus" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.controlButtons}
                        onPress={() =>
                          setMapCoords({
                            latitude: mapCoords.latitude,
                            longitude: mapCoords.longitude,
                            latitudeDelta: mapCoords.latitudeDelta + 0.01,
                            longitudeDelta: mapCoords.longitudeDelta + 0.01,
                          })
                        }>
                        <Kid />
                        {/* <Icon name="minus" size={25} color={Colors.primary} /> */}
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <View style={styles.statsWrapper}>
                  <View style={styles.guideWrapper}>
                    <View style={styles.col}>
                      <Text style={styles.guideNumber}>37</Text>
                      <View style={styles.recovered} />
                      <Text style={styles.guideText}>Recovered</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.guideNumber}>423</Text>
                      <View style={styles.infected} />
                      <Text style={styles.guideText}>Infected</Text>
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
                      style={{marginLeft: -40}}
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
    // borderWidth: 1,
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
    color: '#351ADC',
  },
  inActiveText: {
    color: '#C4C4C4',
  },
  description: {
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
    color: '#351ADC',
  },
  guideNumber: {
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
    height: height * 0.5,
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.01,
  },
  controlButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    borderRadius: 50,
    elevation: 3,
    zIndex: 1,
    margin: 10,
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
