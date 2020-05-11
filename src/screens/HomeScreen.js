import React, {useRef, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
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
import AddPerson from '../components/AddPerson'
import ConfirmDialog from '../components/ConfirmDialog'

const {width, height} = Dimensions.get('window')

const HomeScreen = () => {
  const [openFeelGood, setOpenFeelGood] = useState(false)
  const [openAddPerson, setOpenAddPerson] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [circleEditMode, setCircleEditMode] = useState(false)

  return (
    <>
      <FeelGood open={openFeelGood} onClose={() => setOpenFeelGood(false)} />
      <AddPerson open={openAddPerson} onClose={() => setOpenAddPerson(false)} />
      <ConfirmDialog
        open={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
      />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.reportWrapper}>
            <LinearGradient
              colors={['#7280FF', '#351ADC']}
              style={styles.linearGradient}>
              <Header />
              <Text style={styles.title}>How do you feel today?</Text>
              <Text style={styles.description}>
                Indicate your state by pressing the below button that best
                describes your condition.
              </Text>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  style={styles.healthy}
                  onPress={() => setOpenFeelGood(true)}>
                  <Text style={styles.text}>I feel good</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sick}>
                  <Text style={styles.text}>I feel sick</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.circleWrapper}>
            <LinearGradient
              colors={['#7280FF', '#351ADC']}
              style={styles.linearGradient}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.title}>Care Circle</Text>
                </View>
                <View style={styles.col}>
                  <TouchableOpacity
                    style={styles.touchableEdit}
                    onPress={() => setCircleEditMode(prevState => !prevState)}>
                    {circleEditMode ? (
                      <View style={styles.doneButton}>
                        <Text style={styles.text}>Done</Text>
                      </View>
                    ) : (
                      <Edit />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.description}>
                Here you can add or remove people you are in close contact with
                to get updates on their health status.
              </Text>
              <View style={styles.row}>
                <View
                  style={[
                    styles.col,
                    {flex: 1},
                    circleEditMode && {opacity: 0.5},
                  ]}>
                  <Woman />
                </View>
                <View
                  style={[
                    styles.col,
                    {flex: 1},
                    circleEditMode && {opacity: 0.5},
                  ]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View
                  style={[
                    styles.col,
                    {flex: 2},
                    circleEditMode && {opacity: 0.5},
                  ]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  {circleEditMode && (
                    <TouchableOpacity
                      style={styles.delete}
                      onPress={() => setOpenConfirmDialog(true)}>
                      <Delete width={40} height={40} />
                    </TouchableOpacity>
                  )}
                  <View
                    style={[styles.green, circleEditMode && {opacity: 0.5}]}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Man />
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <View style={styles.yellow} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Kid />
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <View style={styles.red} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Kid />
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <View style={styles.red} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Kid />
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <View style={styles.red} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Kid />
                </View>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.text}>Mom</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <Text style={styles.text}>Reported 5h ago</Text>
                </View>
                <View style={[styles.col, {flex: 2}]}>
                  <View style={styles.red} />
                </View>
              </View>
              <View style={styles.col}>
                <TouchableOpacity
                  style={styles.addPerson}
                  onPress={() => setOpenAddPerson(true)}>
                  <Text style={styles.text}>Add Person</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.tipsWrapper}>
            <Text>Prevention best practices</Text>
            <View style={styles.row}>
              <View style={[styles.col, {flex: 1}]}>
                <Image source={Tips1} />
              </View>
              <View style={[styles.col, {flex: 3}]}>
                <Text>
                  Make sure to avoid crowded places and keep safe distance from
                  other people.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  reportWrapper: {
    marginHorizontal: 0.5,
    minHeight: 290,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 25,
  },
  description: {
    marginVertical: 15,
    marginHorizontal: 25,
    color: Colors.white,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
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
    marginVertical: 20,
    marginHorizontal: 0.5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  addPerson: {
    width: 140,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EC7E00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  touchableEdit: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
    marginTop: 15,
  },
  doneButton: {
    backgroundColor: '#99ccff',
    borderRadius: 50,
    width: 50,
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
    padding: 20,
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
