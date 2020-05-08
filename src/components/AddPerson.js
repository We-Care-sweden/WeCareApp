import React, {useRef, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import Close from '../assets/img/close.svg'

const {width, height} = Dimensions.get('window')

const AddPerson = ({open, onClose}) => {
  const openAnim = useRef(new Animated.Value(height)).current

  useEffect(() => {
    if (open) {
      Animated.timing(openAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(openAnim, {
        toValue: height,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }, [open])

  return (
    <Animated.View style={[styles.container, {marginTop: openAnim}]}>
      <LinearGradient
        colors={['#7280FF', '#351ADC']}
        style={styles.linearGradient}>
        <SafeAreaView>
          <View style={{alignItems: 'flex-end', width}}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => onClose()}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.boxWrapper}>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.title}>Add Person to your Care Circle</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Share this unique join link with the person that you would
                  like to be added to your Care Circle.
                </Text>
              </View>
              <View style={styles.row}>
                <TextInput style={styles.input} placeholder="Share URL" />
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.share}>
                  <Text style={styles.shareText}>Share Link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
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
    zIndex: 1,
    elevation: 1,
  },
  linearGradient: {
    flex: 1,
  },
  boxWrapper: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: 10,
    width: width * 0.95,
    alignItems: 'center',
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    padding: 10,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    width: 300,
    height: 40,
    fontSize: 10,
    padding: 10,
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
    color: Colors.white,
  },
})
