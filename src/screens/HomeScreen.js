import React, {useState, useContext, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Edit from '../assets/img/edit.svg'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import Delete from '../assets/img/delete.svg'
import Tips1 from '../assets/img/tips1.png'
import FeelGood from '../components/FeelGood'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import {Context} from '../utils/Store'
import {GetStorageData} from '../utils/StorageModule'
import {Symptom} from '../models/symptom/Symptom'
import {CreateSymptom} from '../modules/Symptom.module'
import {
  MemberRegister,
  RemoveMember,
  GetCircleData,
} from '../modules/User.module'
import moment from 'moment'
import ContactTracing from '../components/ContactTracing'

const HomeScreen = ({navigation}) => {
  const {appState} = useContext(Context)
  const [openFeelGood, setOpenFeelGood] = useState(false)
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [circleEditMode, setCircleEditMode] = useState(false)
  const [membersData, setMembersData] = useState([])
  const [removeMemberName, setRemoveMemberName] = useState(null)
  const [removeMemberUuid, setRemoveMemberUuid] = useState(null)

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL)
  }, [])

  useEffect(() => {
    getMembers()
  }, [openConfirmDeleteDialog, circleEditMode])

  const handleOpenURL = async event => {
    const route = event.url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[0]
    if (routeName === 'member') {
      const uuidData = await GetStorageData('deviceUUID')
      if (uuidData.success) {
        const registerDate = await MemberRegister(uuidData.data, id)
        if (registerDate.success) {
          return Alert.alert(
            appState.i18n.t('circlePage.success'),
            appState.i18n.t('circlePage.added'),
          )
        }
      }
    }
  }

  const getMembers = async () => {
    const uuidData = await GetStorageData('deviceUUID')
    if (uuidData.success) {
      const circleData = await GetCircleData(uuidData.data)
      if (circleData.success) {
        setMembersData(circleData.data)
      }
    }
  }

  const showConfirm = member => {
    setRemoveMemberName(member.name)
    setRemoveMemberUuid(member.uuid)
    setOpenConfirmDeleteDialog(true)
  }

  const removeMember = async () => {
    const uuidData = await GetStorageData('deviceUUID')
    setOpenConfirmDeleteDialog(false)
    if (uuidData.success) {
      const removeData = await RemoveMember(uuidData.data, removeMemberUuid)
      if (removeData.success) {
        getMembers()
      }
    }
  }

  const feelGood = async () => {
    try {
      const uuidData = await GetStorageData('deviceUUID')
      if (uuidData.success) {
        const symptom = {}
        Object.assign(symptom, Symptom)

        symptom.uuid = uuidData.data
        symptom.type = 'healthy'
        symptom.created = new Date()

        const addData = await CreateSymptom(symptom)
        if (addData.success) {
          setOpenFeelGood(true)
        }
      }
    } catch (error) {}
  }

  return (
    <>
      <FeelGood open={openFeelGood} onClose={() => setOpenFeelGood(false)} />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        name={removeMemberName}
        onCancel={() => setOpenConfirmDeleteDialog(false)}
        onRemove={() => removeMember()}
      />
      <SafeAreaView>
        <View style={styles.constainer}>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.reportWrapper}>
              <LinearGradient
                colors={['#7280FF', '#351ADC']}
                style={styles.linearGradient}>
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {appState.i18n.t('homePage.title')}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>
                    {appState.i18n.t('homePage.description')}
                  </Text>
                </View>
                <View style={styles.buttonsWrapper}>
                  <TouchableOpacity
                    style={styles.healthy}
                    onPress={() => feelGood()}>
                    <Text style={styles.text}>
                      {appState.i18n.t('homePage.feelGood')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sick}
                    onPress={() => navigation.navigate('Symptoms')}>
                    <Text style={styles.text}>
                      {appState.i18n.t('homePage.feelSick')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.circleWrapper}>
              <LinearGradient
                colors={['#7280FF', '#351ADC']}
                style={styles.linearGradient}>
                <View style={styles.row}>
                  <View style={[styles.col, {alignItems: 'flex-start'}]}>
                    <Text style={styles.title}>
                      {appState.i18n.t('homePage.circleTitle')}
                    </Text>
                  </View>
                  <View style={[styles.col, {alignItems: 'flex-end'}]}>
                    <TouchableOpacity
                      style={styles.touchableEdit}
                      onPress={() =>
                        setCircleEditMode(prevState => !prevState)
                      }>
                      {circleEditMode ? (
                        <View style={styles.doneButton}>
                          <Text style={styles.text}>
                            {appState.i18n.t('homePage.done')}
                          </Text>
                        </View>
                      ) : (
                        <Edit />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.description}>
                  {appState.i18n.t('homePage.circleDescription')}
                </Text>
                {membersData && membersData.length > 0 ? (
                  membersData.map((member, index) =>
                    member.uuid ? (
                      <View
                        style={[styles.row, {marginVertical: 15}]}
                        key={index}>
                        <View
                          style={[
                            styles.col,
                            {flex: 1},
                            circleEditMode && {opacity: 0.5},
                          ]}>
                          {member.icon === 0 ? (
                            <Woman />
                          ) : member.icon === 1 ? (
                            <Man />
                          ) : (
                            member.icon === 2 && <Kid />
                          )}
                        </View>
                        <View
                          style={[
                            styles.col,
                            {flex: 1},
                            circleEditMode && {opacity: 0.5},
                          ]}>
                          <Text style={styles.text}>{member.name}</Text>
                        </View>
                        {member.chartData.data &&
                        member.chartData.data.length > 0 ? (
                          <>
                            <View
                              style={[
                                styles.col,
                                {flex: 2},
                                circleEditMode && {opacity: 0.5},
                              ]}>
                              <Text style={styles.text}>
                                {member.lastReported &&
                                  appState.i18n.t('homePage.reported')}{' '}
                                {member.lastReported
                                  ? moment(member.lastReported._seconds * 1000)
                                      .startOf('minute')
                                      .fromNow()
                                  : appState.i18n.t('homePage.notReported')}
                              </Text>
                            </View>
                            <View style={[styles.col, {flex: 2}]}>
                              {circleEditMode && (
                                <TouchableOpacity
                                  style={styles.delete}
                                  onPress={() => showConfirm(member)}>
                                  <Delete width={40} height={40} />
                                </TouchableOpacity>
                              )}
                              {member.chartData.data[
                                member.chartData.data.length - 1
                              ] === 1 ? (
                                <View
                                  style={[
                                    styles.green,
                                    circleEditMode && {opacity: 0.5},
                                  ]}
                                />
                              ) : member.chartData.data[
                                  member.chartData.data.length - 1
                                ] === 2 ? (
                                <View
                                  style={[
                                    styles.yellow,
                                    circleEditMode && {opacity: 0.5},
                                  ]}
                                />
                              ) : (
                                member.chartData.data[
                                  member.chartData.data.length - 1
                                ] === 3 && (
                                  <View
                                    style={[
                                      styles.red,
                                      circleEditMode && {opacity: 0.5},
                                    ]}
                                  />
                                )
                              )}
                            </View>
                          </>
                        ) : (
                          <View style={styles.col}>
                            {circleEditMode && (
                              <TouchableOpacity
                                style={styles.delete}
                                onPress={() => showConfirm(member)}>
                                <Delete width={40} height={40} />
                              </TouchableOpacity>
                            )}
                            <Text
                              style={[
                                styles.text,
                                circleEditMode && {opacity: 0.5},
                              ]}>
                              {appState.i18n.t('homePage.notReported')}
                            </Text>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View style={[styles.row, {marginVertical: 20}]}>
                        <Text style={styles.description}>
                          {appState.i18n.t('homePage.noMember')}
                        </Text>
                      </View>
                    ),
                  )
                ) : (
                  <View style={[styles.row, {marginVertical: 20}]}>
                    <Text style={styles.description}>
                      {appState.i18n.t('homePage.noMember')}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </View>
            <View style={styles.tipsWrapper}>
              <LinearGradient
                colors={['#7280FF', '#351ADC']}
                style={[styles.linearGradient, {paddingVertical: 10}]}>
                <View style={styles.row}>
                  <Text style={styles.title}>Prevention best practices</Text>
                </View>
                <View style={[styles.row, {marginBottom: 20}]}>
                  <View style={[styles.col, {flex: 1, paddingHorizontal: 15}]}>
                    <Image source={Tips1} />
                  </View>
                  <View style={[styles.col, {flex: 3}]}>
                    <Text style={styles.description}>
                      Make sure to avoid crowded places and keep safe distance
                      from other people.
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.tipsWrapper}>
              <LinearGradient
                colors={['#7280FF', '#351ADC']}
                style={[styles.linearGradient, {paddingVertical: 10}]}>
                <ContactTracing />
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  constainer: {
    height: '100%',
    zIndex: 1,
    elevation: 2,
  },
  linearGradient: {
    flex: 1,
  },
  reportWrapper: {
    flex: 1,
    marginHorizontal: 0.5,
    minHeight: 210,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 25,
  },
  description: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    marginVertical: 15,
    marginHorizontal: 25,
    color: Colors.white,
  },
  text: {
    // fontFamily: 'B Yekan',
    textAlign: 'left',
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  healthy: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#33BDBD',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  sick: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FF4D58',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  circleWrapper: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 0.5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  touchableEdit: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  doneButton: {
    backgroundColor: '#99ccff',
    borderRadius: 50,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  green: {
    width: 40,
    height: 7,
    borderRadius: 50,
    backgroundColor: '#00D816',
  },
  yellow: {
    width: 40,
    height: 7,
    borderRadius: 50,
    backgroundColor: '#D8CF00',
  },
  red: {
    width: 40,
    height: 7,
    borderRadius: 50,
    backgroundColor: '#DF1F32',
  },
  tipsWrapper: {
    flex: 1,
    borderRadius: 16,
    // borderTopLeftRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  delete: {
    position: 'absolute',
    top: 5,
    width: 40,
    height: 40,
    zIndex: 1,
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
