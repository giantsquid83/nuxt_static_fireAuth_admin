export const state = () => ({
  userNumber: {
    id: '',
    userNumber: 0,
  },
  modNumber: {
    id: '',
    modNumber: 0,
  },
  message: {
    id: '',
    text: '',
  },
})

export const getters = {
  getUserNumber: (state) => state.userNumber.userNumber,
  getModNumber: (state) => state.modNumber.modNumber,
  getMessage: (state) => state.message,
}

export const actions = {
  // Store action called nuxtServerInit:
  nuxtServerInit({ dispatch }) {
    // console.log('nuxtServerInit triggered', store.state.user.boob)
    // if (!res) {
    //   console.log('no res at nuxtServerInit')
    // }
    // if (res && res.locals && res.locals.user) {
    //   const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
    //   console.log('nuxtServerInit RES triggered', '/n', authUser)
    //   await dispatch('user/onAuthStateChangedAction', {
    //     authUser,
    //     claims,
    //     token,
    //   })
    //   // dispatch('user/onAuthStateChangedAction', { authUser, claims, token })
    // }
    // console.log('nuxtServerInit empty test action: ')
    // dispatch('user/emptyAct')
  },
  populateDataAct({ commit }, data) {
    console.log('populateDataAct triggered', data)
    commit('populateDataMut', data)
  },
  setAnyNumAct({ commit }, changedObj) {
    console.log('setAnyNumAct triggered', changedObj)
    commit('setAnyNumMut', changedObj)
  },
  addOneAct({ commit }, num) {
    commit('addOneMut', num)
  },
  modAddOneAct({ commit }, num) {
    commit('modAddOneMut', num)
  },
  listenMessageAct({ commit }, message) {
    commit('listenMessageMut', message)
  },
}

export const mutations = {
  populateDataMut(state, data) {
    console.log('populateDataMut triggered', data)
    state.userNumber = data.userNumber
    state.modNumber = data.modNumber
  },
  setAnyNumMut(state, numObj) {
    console.log('setAnyNumMut triggered')
    if (Number.isInteger(numObj.userNumber)) {
      Object.assign(state.userNumber, numObj)
    } else if (Number.isInteger(numObj.modNumber)) {
      Object.assign(state.modNumber, numObj)
    }
  },
  addOneMut(state, num) {
    this.$fireStore
      .collection('AllNumbers')
      .doc(state.userNumber.id)
      .update({
        userNumber: this.$fireStoreObj.FieldValue.increment(num),
      })
      .catch(() => console.log('u not a User'))
  },
  modAddOneMut(state, num) {
    this.$fireStore
      .collection('AllNumbers')
      .doc(state.modNumber.id)
      .update({
        modNumber: this.$fireStoreObj.FieldValue.increment(num),
      })
      .catch(() => console.log('u not a Moderator neither an Admin'))
  },
  listenMessageMut(state, obj) {
    state.message.text = obj.text
    state.message.id = obj.id
  },
}
