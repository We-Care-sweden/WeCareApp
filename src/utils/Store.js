import React, {createContext, useReducer} from 'react'

export const Context = createContext()

const initialState = {
  notification: false,
  drawer: false,
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
  }
}

const Store = ({children}) => {
  const [appState, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{appState, dispatch}}>{children}</Context.Provider>
  )
}

export default Store
