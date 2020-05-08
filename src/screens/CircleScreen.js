import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import Good from '../assets/img/good.svg'
import SomeRisk from '../assets/img/someRisk.svg'
import {LineChart} from 'react-native-chart-kit'

const {width, height} = Dimensions.get('window')

const CircleScreen = () => {
  const datasets = [
    {
      data: [1, 2, 3, 1, 3, 2, 1],
      color: (opacity = 1) => `rgba(24, 0, 181, ${opacity})`,
    },
  ]

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          <Header />
          <Text style={styles.title}>How do you feel today?</Text>
          <Text style={styles.description}>
            Indicate your state by pressing the below button that best describes
            your condition.
          </Text>
          <View style={styles.stats}>
            <View style={styles.row}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                      <Woman />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    {/* <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                    </LinearGradient> */}
                    <Man />
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    {/* <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                    </LinearGradient> */}
                    <Kid />
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    {/* <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                    </LinearGradient> */}
                    <Woman />
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                      <Man />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                      <Kid />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity style={styles.touchable}>
                    <LinearGradient
                      colors={['#4457FF', '#1900B5']}
                      style={styles.personWrapperActive}>
                      <Woman />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={styles.chartWrapper}>
              <LineChart
                data={{
                  labels,
                  datasets,
                }}
                width={width}
                height={height * 0.25}
                withShadow={false}
                fromZero={false}
                withHorizontalLabels={false}
                segments={4}
                chartConfig={{
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: '#ffffff',
                  backgroundGradientToOpacity: 1,
                  color: (opacity = 1) => `rgba(25, 0, 181, ${opacity})`,
                  strokeWidth: 5,
                }}
                bezier
                style={{marginLeft: -60, marginTop: -20}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 34,
                }}>
                <View
                  style={{
                    width: width * 0.81,
                    backgroundColor: 'rgba(223, 31, 50,0.2)',
                    height: height * 0.07,
                  }}
                />
                <View
                  style={{
                    width: width * 0.81,
                    backgroundColor: 'rgba(216, 209, 0,0.2)',
                    height: height * 0.07,
                  }}
                />
                <View
                  style={{
                    width: width * 0.81,
                    backgroundColor: 'rgba(0, 216, 22,0.2)',
                    height: height * 0.07,
                  }}
                />
              </View>
              <View>
                <Good
                  width={20}
                  height={20}
                  style={{
                    position: 'absolute',
                    top: -height * 0.08,
                    left: -width * 0.08,
                  }}
                />
                <SomeRisk
                  width={20}
                  height={20}
                  style={{
                    position: 'absolute',
                    top: -height * 0.17,
                    left: width * 0.16,
                  }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <View
                  style={{
                    width: 60,
                    height: 7,
                    backgroundColor: '#00D816',
                    borderRadius: 50,
                    margin: 5,
                  }}
                />
                <Text>Good</Text>
              </View>
              <View style={styles.col}>
                <View
                  style={{
                    width: 60,
                    height: 7,
                    backgroundColor: '#D8CF00',
                    borderRadius: 50,
                    margin: 5,
                  }}
                />
                <Text>Some Risk</Text>
              </View>
              <View style={styles.col}>
                <View
                  style={{
                    width: 60,
                    height: 7,
                    backgroundColor: '#DF1F32',
                    borderRadius: 50,
                    margin: 5,
                  }}
                />
                <Text>High Risk</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={styles.message}>
              <Text style={styles.text}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reminder}>
              <Text style={styles.text}>Reminder</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default CircleScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 25,
  },
  description: {
    marginVertical: 15,
    marginHorizontal: 25,
    color: Colors.white,
  },
  stats: {
    flex: 5,
    backgroundColor: Colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  message: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EC7E00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminder: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#33BDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
  touchable: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  personWrapperActive: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
