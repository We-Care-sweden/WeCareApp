import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import LogoImg from '../assets/img/logo.svg'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const Logo = () => {
  return (
    <View style={styles.container}>
      <LogoImg width={30} height={30} />
      <Text style={styles.mainText}>WeCare</Text>
      <Text style={styles.subText}>about you and your family</Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  mainText: {
    position: 'absolute',
    bottom: 4,
    left: 30,
    fontSize: 25,
    fontFamily: 'times new roman',
    color: Colors.white,
  },
  subText: {
    position: 'absolute',
    top: 23,
    left: 25,
    fontSize: 7,
    color: Colors.white,
  },
})
