import React, {createContext, useReducer} from 'react'
import I18n from '../utils/i18n'

export const Context = createContext()

const initialState = {
  notification: false,
  drawer: false,
  i18n: I18n,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'showNotification':
      return {...state, notification: true}
    case 'hideNotification':
      return {...state, notification: false}
    case 'openDrawer':
      return {...state, drawer: true}
    case 'closeDrawer':
      return {...state, drawer: false}
    case 'setLanguage':
      I18n.locale = action.payload
      return {...state}
  }
}

const Store = ({children}) => {
  const [appState, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{appState, dispatch}}>{children}</Context.Provider>
  )
}

export default Store
