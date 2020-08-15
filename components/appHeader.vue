<template>
  <div>
    <div v-if="currentUser.isAdmin || currentUser.isModerator">
      <v-app-bar dense dark>
        <v-row class="justify-center">
          <!-- <nuxt-link class="nav-link" to="/">Home</nuxt-link>
          <nuxt-link class="nav-link" to="/admin">Admin page</nuxt-link> -->
          <v-btn class="mx-2" :nuxt="true" to="/">Home</v-btn>
          <v-btn class="mx-2" :nuxt="true" to="/admin">Admin page</v-btn>
        </v-row>
      </v-app-bar>
    </div>
    <!--
      Must have this empty v-else somehow =(
     -->
    <div v-else></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentLocalUser',
    }),
  },
}
</script>

<style>
/* .nav-link {
  
} */
</style>
