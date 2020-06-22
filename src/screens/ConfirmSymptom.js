import React, {useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Confirm from '../assets/img/confirm.svg'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {Context} from '../utils/Store'
import {CreateSymptom} from '../modules/Symptom.module'
import {EditUser} from '../modules/User.module'
import {SaveStorageData} from '../utils/StorageModule'

const ConfirmSymptom = ({route, navigation}) => {
  const {appState} = useContext(Context)
  const {data} = route.params
  const paramsData = JSON.parse(data)
  const {symptom} = paramsData
  const {showAge} = paramsData
  const {uuid} = paramsData
  const {ageRange} = paramsData

  const shareData = async () => {
    symptom.created = new Date()
    const addData = await CreateSymptom(symptom)
    let editData = {}
    if (showAge) {
      editData = await EditUser(uuid, {
        ageRange,
      })
      await SaveStorageData('ageRange', ageRange.toString())
    } else {
      editData.success = true
    }
    if (addData.success && editData.success) {
      navigation.navigate('Home')
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LinearGradient
          colors={['#7280FF', '#351ADC']}
          style={styles.linearGradient}>
          <View style={{alignItems: 'center', flex: 1}}>
            <View style={[styles.row, {flex: 4, alignItems: 'flex-end'}]}>
              <Confirm />
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {appState.i18n.t('symptomPage.thanks')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.description}>
                {appState.i18n.t('symptomPage.shareDescription')}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <TouchableOpacity
                  style={styles.returnBotton}
                  onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.returnText}>
                    {appState.i18n.t('symptomPage.return')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.col}>
                <TouchableOpacity
                  style={styles.shareBotton}
                  onPress={() => shareData()}>
                  <Text style={styles.shareText}>
                    {appState.i18n.t('symptomPage.share')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmSymptom

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'B Yekan',
    color: Colors.white,
    fontSize: 20,
  },
  description: {
    fontFamily: 'B Yekan',
    color: Colors.white,
    fontSize: 15,
  },
  returnBotton: {
    backgroundColor: Colors.white,
    width: 140,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBotton: {
    backgroundColor: '#33BDBD',
    width: 140,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnText: {
    fontFamily: 'B Yekan',
  },
  shareText: {
    fontFamily: 'B Yekan',
    color: Colors.white,
  },
})
