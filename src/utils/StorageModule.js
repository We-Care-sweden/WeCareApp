import AsyncStorage from '@react-native-community/async-storage'

const SaveStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return {success: true}
  } catch (error) {}
}

const GetStorageData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return {success: true, data: value}
    } else {
      return {success: false, data: null}
    }
  } catch (error) {}
}

const ClearStorage = async () => {
  try {
    await AsyncStorage.clear()
    return {success: true}
  } catch (error) {}
}

export {SaveStorageData, GetStorageData, ClearStorage}
