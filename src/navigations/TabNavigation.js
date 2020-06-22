import React, {useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MapScreen from '../screens/MapScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import HomeStackNavigation from './HomeStackNavigation'
import CircleStackNavigation from './CircleStackNavigation'
import {Context} from '../utils/Store'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  const {appState} = useContext(Context)
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.white,
        style: {backgroundColor: '#4457FF', fontFamily: 'B Yekan'},
        inactiveTintColor: '#9c9c9c',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName
          if (route.name === appState.i18n.t('homePage.tabName')) {
            iconName = 'home'
          } else if (route.name === appState.i18n.t('circlePage.tabName')) {
            iconName = 'users'
          } else if (route.name === appState.i18n.t('mapPage.tabName')) {
            iconName = 'eye'
          }
          return <Icon name={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen
        name={appState.i18n.t('homePage.tabName')}
        component={HomeStackNavigation}
      />
      <Tab.Screen
        name={appState.i18n.t('circlePage.tabName')}
        component={CircleStackNavigation}
      />
      <Tab.Screen
        name={appState.i18n.t('mapPage.tabName')}
        component={MapScreen}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
