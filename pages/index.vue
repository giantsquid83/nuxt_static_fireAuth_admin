<template>
  <v-container>
    <UserForm />
    <!-- <div class="text-center">
      <v-btn @click="fireTest">Get Current Num</v-btn>
    </div> -->
    <v-container class="pt-0">
      <v-row>
        <v-col cols="6">
          <UserCounter />
        </v-col>
        <v-col cols="6">
          <ModCounter />
        </v-col>
      </v-row>
      <v-row justify="center">
        <message />
      </v-row>
    </v-container>
    <!-- <v-btn @click="getUser">get user</v-btn> -->
  </v-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import UserCounter from '../components/UserCounter'
import ModCounter from '../components/ModCounter'
import UserForm from '../components/UserForm'
import message from '../components/message'

export default {
  components: {
    UserCounter,
    ModCounter,
    UserForm,
    message,
  },
  data: () => ({}),
  methods: {
    getUser() {
      // this.$fireAuth.currentUser.getIdTokenResult().then((idtr) => {
      //   console.log(idtr)
      // })
      console.log(this.$fireAuth.currentUser)
    },
  },
  head() {
    return {
      title: 'Home page',
      meta: [
        {
          hid: 'hid index',
          name: 'name index',
          content: 'Test Nuxt APP index page',
        },
      ],
    }
  },
}
</script>
