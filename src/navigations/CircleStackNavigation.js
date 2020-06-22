import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import CircleScreen from '../screens/CircleScreen'
import MessageScreen from '../screens/MessageScreen'

const CircleStack = createStackNavigator()

const CircleStackNavigation = () => {
  return (
    <CircleStack.Navigator headerMode="none">
      <CircleStack.Screen name="CircleHome" component={CircleScreen} />
      <CircleStack.Screen name="Message" component={MessageScreen} />
    </CircleStack.Navigator>
  )
}

export default CircleStackNavigation
