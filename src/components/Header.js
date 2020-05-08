import React, {useContext} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import Logo from './Logo'
import RingImg from '../assets/img/ring.svg'
import Badge from '../assets/img/badge.svg'
import Menu from '../assets/img/menu.svg'
import {Context} from '../utils/Store'

const Header = () => {
  const {dispatch} = useContext(Context)

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => dispatch({type: 'openDrawer'})}>
          <Menu />
        </TouchableOpacity>
      </View>
      <View style={styles.col}>
        <Logo />
      </View>
      <View style={[styles.col, {alignItems: 'flex-end'}]}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => dispatch({type: 'showNotification'})}>
          <RingImg />
          <Badge style={styles.badge} width={8} height={8} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  touchable: {
    margin: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 19,
  },
})
