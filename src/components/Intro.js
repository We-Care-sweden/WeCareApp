import React, {useContext} from 'react'
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Report from '../assets/img/report.svg'
import Circle from '../assets/img/circle.svg'
import HeatMap from '../assets/img/heatmap.svg'
import Map from '../assets/img/map.png'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Context} from '../utils/Store'

const {width} = Dimensions.get('window')

const Intro = ({onDone}) => {
  const {appState} = useContext(Context)
  const slides = [
    {
      key: 1,
      title: 'Self Report',
      text: appState.i18n.t('intro.selfReport'),
    },
    {
      key: 2,
      title: 'Care Circle',
      text: appState.i18n.t('intro.circle'),
    },
    {
      key: 3,
      title: 'Heat Map',
      text: appState.i18n.t('intro.heatMap'),
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
      nextLabel={appState.i18n.t('intro.next')}
      prevLabel={appState.i18n.t('intro.previous')}
      skipLabel={appState.i18n.t('intro.skip')}
      doneLabel={appState.i18n.t('intro.done')}
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
    // fontFamily: 'B Yekan',
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
