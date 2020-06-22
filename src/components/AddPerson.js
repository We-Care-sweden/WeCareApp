import React, {useRef, useEffect, useContext, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Share,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Close from '../assets/img/close.svg'
import {Context} from '../utils/Store'
import Woman from '../assets/img/woman.svg'
import Man from '../assets/img/man.svg'
import Kid from '../assets/img/kid.svg'
import {GenerateMemberToken} from '../modules/User.module'
import UUIDGenerator from 'react-native-uuid-generator'
import {GetStorageData} from '../utils/StorageModule'
import {Member} from '../models/user/Member'

const {width, height} = Dimensions.get('window')

const AddPerson = ({open, onClose}) => {
  const {appState} = useContext(Context)
  const openAnim = useRef(new Animated.Value(height)).current
  const [activeIndex, setActiveIndex] = useState(null)
  const [memberName, setMemberName] = useState(null)
  const [showLink, setShowLink] = useState(false)
  const [shareUrl, setShareUrl] = useState(null)

  useEffect(() => {
    if (open) {
      Animated.spring(openAnim, {
        toValue: 0,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.spring(openAnim, {
        toValue: height,
        bounciness: -5,
        useNativeDriver: false,
      }).start()
    }
  }, [open])

  const submit = async () => {
    const id = await UUIDGenerator.getRandomUUID()
    const uuidData = await GetStorageData('deviceUUID')
    if (uuidData.success) {
      const member = {}
      Object.assign(member, Member)
      member.accessToken = id
      member.name = memberName
      member.icon = activeIndex
      const registerDate = await GenerateMemberToken(uuidData.data, member)
      if (registerDate.success) {
        setShareUrl('wecareapp://member/' + id)
        setShowLink(true)
      }
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({message: shareUrl})
      if (result.action === Share.sharedAction || result.activityType) {
        close()
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {}
  }

  const addNew = () => {
    setShowLink(false)
    setActiveIndex(null)
    setMemberName(null)
  }

  const close = () => {
    onClose()
    setShowLink(false)
    setActiveIndex(null)
    setMemberName(null)
  }

  return (
    <Animated.View style={[styles.container, {marginTop: openAnim}]}>
      <LinearGradient
        colors={['#7280FF', '#351ADC']}
        style={styles.linearGradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' && 'padding'}
          style={{flex: 1}}>
          <SafeAreaView>
            <View style={{alignItems: 'flex-end', width}}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => close()}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={styles.boxWrapper}>
              <View style={styles.box}>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                  <Text style={styles.title}>
                    {appState.i18n.t('homePage.addPersonTitle')}
                  </Text>
                </View>

                {!showLink ? (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.text}>
                        {appState.i18n.t('homePage.chooseName')}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <TextInput
                        style={styles.input}
                        textAlign={
                          appState.i18n.locale === 'farsi' ? 'right' : 'left'
                        }
                        onChangeText={text => setMemberName(text)}
                        value={memberName}
                        placeholder={appState.i18n.t('homePage.enterName')}
                      />
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.text}>
                        {appState.i18n.t('homePage.iconSelect')}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.col}>
                        <TouchableOpacity
                          onPress={() => setActiveIndex(0)}
                          style={[
                            styles.iconContainer,
                            activeIndex === 0 && {backgroundColor: '#4457FF'},
                          ]}>
                          <Woman />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.col}>
                        <TouchableOpacity
                          onPress={() => setActiveIndex(1)}
                          style={[
                            styles.iconContainer,
                            activeIndex === 1 && {backgroundColor: '#4457FF'},
                          ]}>
                          <Man />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.col}>
                        <TouchableOpacity
                          onPress={() => setActiveIndex(2)}
                          style={[
                            styles.iconContainer,
                            activeIndex === 2 && {backgroundColor: '#4457FF'},
                          ]}>
                          <Kid />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <TouchableOpacity
                        style={styles.share}
                        disabled={!memberName || activeIndex === null}
                        onPress={() => submit()}>
                        <Text style={styles.shareText}>
                          {appState.i18n.t('homePage.submit')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.text}>
                        {appState.i18n.t('homePage.addPersonDescription')}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <TextInput
                        multiline
                        style={[
                          styles.input,
                          {
                            width: '100%',
                            fontSize: 12,
                            padding: 10,
                            height: 55,
                          },
                        ]}
                        placeholder={appState.i18n.t('homePage.shareUrl')}
                        value={shareUrl}
                      />
                    </View>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                      <View style={styles.col}>
                        <View style={styles.row}>
                          <TouchableOpacity
                            style={styles.share}
                            onPress={() => onShare()}
                            disabled={!shareUrl}>
                            <Text style={styles.shareText}>
                              {appState.i18n.t('homePage.share')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                          <TouchableOpacity onPress={() => addNew()}>
                            <Text style={styles.text}>
                              {appState.i18n.t('homePage.addPerson')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Animated.View>
  )
}

export default AddPerson

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 2,
    elevation: 2,
  },
  linearGradient: {
    flex: 1,
  },
  boxWrapper: {
    minHeight: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: 10,
    width: width * 0.95,
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'B Yekan',
    textAlign: 'left',
    padding: 10,
    fontSize: 20,
  },
  text: {
    flex: 1,
    fontFamily: 'B Yekan',
    textAlign: 'left',
    padding: 15,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    // borderWidth: 1,
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    textAlign: 'left',
    width: 300,
    height: 40,
    fontSize: 12,
    paddingHorizontal: 15,
    color: 'black',
  },
  touchable: {
    margin: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  share: {
    backgroundColor: '#EC7E00',
    borderRadius: 50,
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    fontFamily: 'B Yekan',
    color: Colors.white,
  },
})
