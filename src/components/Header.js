import React, {useContext} from 'react'
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native'
import Logo from './Logo'
import RingImg from '../assets/img/ring.svg'
import Badge from '../assets/img/badge.svg'
import Menu from '../assets/img/menu.svg'
import Back from '../assets/img/leftArrow.svg'
import {Context} from '../utils/Store'
import {useNavigation} from '@react-navigation/native'

const {height} = Dimensions.get('window')

const Header = ({back}) => {
  const {dispatch} = useContext(Context)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            back ? navigation.goBack() : dispatch({type: 'openDrawer'})
          }>
          {back ? <Back /> : <Menu />}
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
    height: height * 0.1,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#7280FF',
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
