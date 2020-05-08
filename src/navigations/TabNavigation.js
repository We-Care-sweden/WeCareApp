import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MapScreen from '../screens/MapScreen'
import CircleScreen from '../screens/CircleScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import HomeStackNavigation from './HomeStackNavigation'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.white,
        style: {backgroundColor: '#4457FF'},
        inactiveTintColor: '#9c9c9c',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Visualize') {
            iconName = 'eye'
          } else if (route.name === 'Care Circle') {
            iconName = 'users'
          }
          return <Icon name={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen name="Care Circle" component={CircleScreen} />
      <Tab.Screen name="Visualize" component={MapScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation
