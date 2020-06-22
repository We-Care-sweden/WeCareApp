import firestore from '@react-native-firebase/firestore'

const CreateQuestions = async (language, questions) => {
  try {
    for (let question of questions) {
      await firestore()
        .collection('questions')
        .doc(language)
        .collection('001')
        .doc(question.id)
        .set({title: question.title, answers: question.answers})
    }
    return {success: true}
  } catch (error) {}
}

const CreateRisks = async risks => {
  try {
    for (let risk of risks) {
      await firestore()
        .collection('risks')
        .doc(risk.id)
        .set({id: risk.id, risks: risk.risks})
    }
    return {success: true}
  } catch (error) {
    console.log('catch', error)
  }
}

const GetQuestions = async language => {
  try {
    const questionSnapshot = await firestore()
      .collection('questions')
      .doc(language)
      .collection('001')
      .get()
    const results = []
    questionSnapshot.forEach(question => {
      results.push(question.data())
    })
    return {success: true, data: results}
  } catch (error) {}
}

const GetRisks = async () => {
  try {
    const riskSnapshot = await firestore()
      .collection('risks')
      .get()
    const results = []
    riskSnapshot.forEach(ris => {
      results.push(ris.data())
    })
    return {success: true, data: results}
  } catch (error) {}
}

export {CreateQuestions, CreateRisks, GetQuestions, GetRisks}
