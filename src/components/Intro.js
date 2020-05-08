import React from 'react'
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Report from '../assets/img/report.svg'
import Circle from '../assets/img/circle.svg'
import HeatMap from '../assets/img/heatmap.svg'
import Map from '../assets/img/map.png'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const {width, height} = Dimensions.get('window')

const Intro = ({onDone}) => {
  const slides = [
    {
      key: 1,
      title: 'Self Report',
      text: 'Self report your health condition',
    },
    {
      key: 2,
      title: 'Care Circle',
      text: 'Get updates on your Care Circle’s condition',
    },
    {
      key: 3,
      title: 'Heat Map',
      text: 'Heat map and COVID-19 stats in your area',
    },
  ]

  const _renderItem = ({item}) => {
    return (
      <View style={{flex: 1}} key={item.key}>
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          {item.title === 'Self Report' && <Report />}
          {item.title === 'Care Circle' && <Circle />}
          {item.title === 'Heat Map' && (
            <View>
              <Image source={Map} />
              <HeatMap style={styles.heatMap} />
            </View>
          )}
          <Text style={styles.text}>{item.text}</Text>
        </LinearGradient>
      </View>
    )
  }

  return (
    <AppIntroSlider
      data={slides}
      renderItem={e => _renderItem(e)}
      onDone={() => onDone()}
      showSkipButton
      showPrevButton
    />
  )
}

export default Intro

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    margin: 30,
    width: width * 0.6,
    textAlign: 'center',
  },
  heatMap: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
})
