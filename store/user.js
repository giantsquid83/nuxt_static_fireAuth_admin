export const state = () => ({
  user: {
    loggedIn: false,
  },
  boob: 'boobs are nice! ! !',
})

export const getters = {
  getCurrentLocalUser: (state) => state.user,
}

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (!authUser) {
      await commit('clearUserMUT')

      return
    }
    console.log('onAuthStateChangedAction Triggered, user logged in:', authUser)
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName } = authUser

    await commit('localUserUpdateMUT', {
      uid,
      email,
      emailVerified,
      displayName,
      // photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.admin,
      isModerator: claims.moderator,
    })
  },
  emptyAct({ commit }) {
    console.log('emptyAct')
    commit('emptyMut')
  },
}

export const mutations = {
  clearUserMUT(state) {
    return (state.user = {
      loggedIn: false,
    })
  },
  localUserUpdateMUT(state, userObj) {
    state.user = {
      loggedIn: true,
    }
    state.user.uid = userObj.uid
    state.user.email = userObj.email
    state.user.emailVerified = userObj.emailVerified
    state.user.displayName = userObj.displayName
    state.user.isAdmin = userObj.isAdmin
    state.user.isModerator = userObj.isModerator
  },
  emptyMut() {
    console.log('emptyMut')
  },
}
