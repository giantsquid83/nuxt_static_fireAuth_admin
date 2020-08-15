<template>
  <v-card>
    <v-card-subtitle>Counter for Moderator</v-card-subtitle>
    <v-card-text class="py-0">{{ modNumber }}</v-card-text>
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
  name: 'ModCounter',
  data: () => ({}),
  computed: {
    ...mapGetters({
      modNumber: 'getModNumber',
      currentUser: 'user/getCurrentLocalUser',
    }),
    buttonActive() {
      return this.currentUser.isModerator || this.currentUser.isAdmin
    },
  },
  methods: {
    ...mapActions({
      addOne: 'modAddOneAct',
    }),
  },
}
</script>

<style></style>
