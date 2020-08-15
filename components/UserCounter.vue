<template>
  <v-card class="d-flex flex-wrap flex-direction-column">
    <v-card-subtitle>Counter for user</v-card-subtitle>
    <v-card-text class="py-0">{{ userNumber }}</v-card-text>
    <v-card-actions class="d-flex flex-wrap">
      <v-btn class="ma-2" :disabled="!buttonActive" @click="addOne(1)">+</v-btn>
      <v-btn class="ma-2" :disabled="!buttonActive" @click="addOne(-1)"
        >-</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserCounter',
  data: () => ({}),
  computed: {
    ...mapGetters({
      userNumber: 'getUserNumber',
      currentUser: 'user/getCurrentLocalUser',
    }),
    buttonActive() {
      return this.currentUser.loggedIn && this.currentUser.emailVerified
    },
  },
  methods: {
    ...mapActions({
      addOne: 'addOneAct',
      substractOne: 'substractOneAct',
    }),
  },
}
</script>

<style></style>
