import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import SymptomScreen from '../screens/SymptomScreen'
import ConfirmSymptom from '../screens/ConfirmSymptom'

const HomeStack = createStackNavigator()

const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Symptoms" component={SymptomScreen} />
      <HomeStack.Screen name="Confirm" component={ConfirmSymptom} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigation
