/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import Entry from './src/Entry'
import Store from './src/utils/Store'

const App: () => React$Node = () => {
  return (
    <>
      <Store>
        <Entry />
      </Store>
    </>
  )
}

export default App
