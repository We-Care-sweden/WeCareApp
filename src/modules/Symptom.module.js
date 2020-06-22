import firestore from '@react-native-firebase/firestore'

const CreateSymptom = async symptom => {
  try {
    const added = await firestore()
      .collection('symptoms')
      .add(symptom)
    if (added) {
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

export {CreateSymptom}
