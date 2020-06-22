import firestore from '@react-native-firebase/firestore'

const CreateUser = async user => {
  try {
    const added = await firestore()
      .collection('users')
      .add(user)
    if (added) {
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

const EditUser = async (uuid, user) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('uuid', '==', uuid)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      await userSnapshot.docs[0].ref.set(user, {merge: true})
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

const GetUser = async uuid => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('uuid', '==', uuid)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      return {success: true, data: userSnapshot.docs[0].data()}
    }
    return {success: false}
  } catch (error) {}
}

const GenerateMemberToken = async (uuid, member) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('uuid', '==', uuid)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      const user = userSnapshot.docs[0].data()
      user.memberTokens.push(member.accessToken)
      user.members.push(member)
      await userSnapshot.docs[0].ref.set(
        {memberTokens: user.memberTokens, members: user.members},
        {merge: true},
      )
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

const MemberRegister = async (uuid, id) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('memberTokens', 'array-contains', id)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      const user = userSnapshot.docs[0].data()
      const index = user.members.findIndex(item => item.accessToken === id)
      if (index !== -1) {
        const member = user.members[index]
        member.uuid = uuid
        user.members[index] = member
        await userSnapshot.docs[0].ref.set(
          {members: user.members},
          {merge: true},
        )
        return {success: true}
      }
      return {success: false}
    }
    return {success: false}
  } catch (error) {}
}

const RemoveMember = async (uuid, id) => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('uuid', '==', uuid)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      const user = userSnapshot.docs[0].data()
      const memberIndex = user.members.findIndex(
        item => item.accessToken === id,
      )
      user.members.splice(memberIndex, 1)
      const accessIndex = user.memberTokens.findIndex(item => item === id)
      user.memberTokens.splice(accessIndex, 1)
      await userSnapshot.docs[0].ref.set(
        {members: user.members, memberTokens: user.memberTokens},
        {merge: true},
      )
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

const GetCircleData = async uuid => {
  try {
    const userSnapshot = await firestore()
      .collection('users')
      .where('uuid', '==', uuid)
      .limit(1)
      .get()

    if (!userSnapshot.empty) {
      const membersData = []
      const chartData = {data: []}
      let lastReported = ''

      const user = userSnapshot.docs[0].data()
      if (user.members && user.members.length > 0) {
        for (let member of user.members) {
          const lastWeek = new Date()
          lastWeek.setDate(lastWeek.getDate() - 7)
          const symptomSnapshot = await firestore()
            .collection('symptoms')
            .where('uuid', '==', member.uuid)
            .where('created', '>', lastWeek)
            .orderBy('created', 'asc')
            .limit(7)
            .get()

          if (symptomSnapshot.size < 7) {
            for (let i = 1; i <= 7 - symptomSnapshot.size; i++) {
              chartData.data.push(0)
            }
          }
          if (!symptomSnapshot.empty) {
            symptomSnapshot.forEach((symptom, index) => {
              const riskLevel = symptom.data().risk.level
              if (index === symptomSnapshot.size - 1) {
                lastReported = symptom.data().created
              }
              chartData.data.push(
                !riskLevel || riskLevel <= 8
                  ? 1
                  : riskLevel <= 16 && riskLevel > 8
                  ? 2
                  : riskLevel > 16 && 3,
              )
            })
          }
          const _member = {
            name: member.name,
            icon: member.icon,
            uuid: member.uuid,
            chartData,
            lastReported,
          }
          membersData.push(_member)
        }
        return {success: true, data: membersData}
      }
      return {success: true, data: []}
    }
    return {success: false}
  } catch (error) {
    console.log(error)
  }
}

const AddLocation = async user => {
  try {
    const added = await firestore()
      .collection('locations')
      .add(user)
    if (added) {
      return {success: true}
    }
    return {success: false}
  } catch (error) {}
}

export {
  CreateUser,
  EditUser,
  GetUser,
  GenerateMemberToken,
  MemberRegister,
  RemoveMember,
  GetCircleData,
  AddLocation,
}
