import AsyncStorage from '@react-native-community/async-storage'

export const SaveStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return {success: true}
  } catch (err) {
    // saving error
  }
}

export const GetStorageData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return {success: true, data: value}
    }
  } catch (e) {
    // error reading value
  }
}
