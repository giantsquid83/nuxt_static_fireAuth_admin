<template>
  <v-container class="pb-0" :class="isMounted ? 'visible' : 'hidden'">
    <div v-show="currentUser.loggedIn">
      <v-card class="text-center">
        <v-card-text class="py-2">
          Logged in user: {{ currentUser.email }}
        </v-card-text>
        <v-card-text class="py-2">
          Status:
          {{
            currentUser.isAdmin
              ? 'Admin'
              : currentUser.isModerator
              ? 'Moderator'
              : 'User'
          }}
        </v-card-text>
        <v-card-text class="py-2">
          Verified: {{ currentUser.emailVerified ? 'Yes' : 'No' }}
        </v-card-text>
        <!-- <v-card-subtitle> Admin status: {{ isAdmin }} </v-card-subtitle> -->
      </v-card>
    </div>
    <v-form @submit.prevent="submitHandler">
      <v-container class="pb-0">
        <v-row justify="center">
          <v-col v-show="!currentUser.loggedIn" cols="6">
            <v-text-field v-model="email" label="email" />
            <v-text-field v-model="password" type="password" label="password" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            v-show="!currentUser.loggedIn"
            class="mx-4"
            @click.prevent="register"
            >Register</v-btn
          >
          <v-btn type="submit">{{
            currentUser.loggedIn ? 'Log Out' : 'Log In'
          }}</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserForm',
  data: () => ({
    email: '',
    password: '',
    isMounted: false,
  }),
  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentLocalUser',
    }),
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    submitHandler() {
      this.currentUser.loggedIn ? this.logOff() : this.login()
    },
    login() {
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          console.log('logged in user: ', cred)
          this.email = ''
          this.password = ''
        })
        .catch((err) => {
          console.log('catchErr: ', err)
        })
    },
    register() {
      this.$fireAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((credential) => {
          console.log('created user: ', credential)
          // console.log(credential.user);
          this.email = ''
          this.password = ''
          credential.user.sendEmailVerification().then(() => {
            console.log('email sent')
          })
        })
        .catch((err) => {
          console.log('catchErr', err)
        })
    },
    logOff() {
      this.$fireAuth.signOut().then(() => {
        console.log('logged off')
      })
    },
    getCurrentUser() {
      console.log(this.$fireAuth.currentUser)
    },
  },
}
</script>

<style>
.hidden {
  display: none;
}
.visible {
  display: block;
}
</style>
