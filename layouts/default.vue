<template>
  <v-app>
    <!-- <appHeader v-show="currentUser.isAdmin || currentUser.isModerator" /> -->
    <appHeader />
    <nuxt />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import appHeader from '../components/appHeader'

export default {
  components: {
    appHeader,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentLocalUser',
    }),
  },
  async mounted() {
    console.log('process.env: ', process.env.TEST_VARIABLE)
    const populateObj = {
      userNumber: {},
      modNumber: {},
    }
    await this.$fireStore
      .collection('AllNumbers')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          if (Number.isInteger(data.userNumber)) {
            populateObj.userNumber = data
          } else if (Number.isInteger(data.modNumber)) {
            populateObj.modNumber = data
          }
        })
      })
    this.populateDataAct(populateObj)
    this.$fireStore.collection('AllNumbers').onSnapshot(
      (snapshot) => {
        const changes = snapshot.docChanges()
        // console.log(changes);

        changes.forEach((change) => {
          if (change.type === 'modified') {
            const changed = change.doc.data()
            console.log('Modified change: ', changed)
            let obj = {}
            if (Number.isInteger(changed.userNumber)) {
              obj = changed
              this.setAnyNumAct(obj)
            } else if (Number.isInteger(changed.modNumber)) {
              obj = changed
              this.setAnyNumAct(obj)
            }
            console.log('obj', obj)
          }
        })
      },
      (err) => {
        console.log(err)
      }
    )
    this.$fireStore.collection('message').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const obj = {
          text: doc.data().text,
          id: doc.id,
        }
        // console.log(obj)
        this.listenMessageAct(obj)
      })
    })
  },
  methods: {
    ...mapActions({
      setAnyNumAct: 'setAnyNumAct',
      populateDataAct: 'populateDataAct',
      listenMessageAct: 'listenMessageAct',
    }),
  },
}
</script>
