import React, {useRef, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const {width, height} = Dimensions.get('window')

const ConfirmDialog = ({open, onCancel}) => {
  const openAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (open) {
      Animated.timing(openAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(openAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }, [open])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scaleX: openAnim}, {scaleY: openAnim}],
          opacity: openAnim,
        },
      ]}>
      <SafeAreaView>
        <View style={styles.dialogContainer}>
          <View style={styles.confirm}>
            <View style={styles.row}>
              <Text>
                Do you really want to remove Mom from your Care Circle?
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => onCancel()}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.remove}>
                <Text style={{color: Colors.white}}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

export default ConfirmDialog

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: '100%',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(153, 204, 255,0.8)',
  },
  dialogContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // borderWidth: 1,
  },
  confirm: {
    width: width * 0.9,
    backgroundColor: '#EDEBFD',
    borderRadius: 10,
    padding: 20,
  },
  cancel: {
    backgroundColor: Colors.white,
    width: 140,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    backgroundColor: '#DF1F32',
    width: 140,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
})
