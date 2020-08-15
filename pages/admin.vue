<template>
  <v-container>
    <v-card>
      <v-form
        class="pa-6 pa-md-10 d-flex flex-wrap justify-space-between"
        :disabled="!buttonActive"
        @submit.prevent="submitHandler"
      >
        <!-- <v-row class="pa-6" justify="space-between"> -->
        <!-- <v-col cols="6" md="5"> -->
        <v-text-field
          v-model="email"
          class="mr-4"
          label="User"
          placeholder="Email"
        ></v-text-field>
        <!-- </v-col> -->
        <!-- <v-col cols="6" md="5"> -->
        <v-select
          v-model="role"
          class="mr-4"
          :items="['admin', 'moderator']"
          label="Add role"
        ></v-select>
        <!-- </v-col> -->
        <!-- <v-col cols="2" md="2"> -->
        <v-btn
          :disabled="!buttonActive"
          class="mt-3"
          type="submit"
          light
          color="primary"
        >
          Add role
        </v-btn>
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-form>
    </v-card>
    <v-spacer></v-spacer>
    <v-card>
      <v-form
        class="pa-6 pa-md-10 d-flex flex-wrap justify-space-between"
        @submit.prevent="messageHandler"
      >
        <!-- <v-row class="pa-6" justify="center"> -->
        <!-- <v-col cols="12" md="9"> -->
        <v-text-field
          v-model="text"
          class="mr-4"
          :disabled="!buttonActive"
          label="Enter message"
          min-width="400px"
        ></v-text-field>
        <!-- </v-col> -->
        <!-- <v-col cols="3" justify="end"> -->
        <v-btn
          :disabled="!buttonActive"
          class="mt-3"
          type="submit"
          light
          color="primary"
        >
          Post message
        </v-btn>
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-form>
    </v-card>
    <v-row class="ma-4" justify="center">
      <message />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    email: '',
    role: '',
    text: '',
  }),
  middleware: 'adminRoute',
  computed: {
    ...mapGetters({
      getMessage: 'getMessage',
      currentUser: 'user/getCurrentLocalUser',
    }),
    buttonActive() {
      return this.currentUser.isAdmin
    },
  },
  created() {
    if (this.currentUser.isAdmin || this.currentUser.isModerator) {
      console.log('waddap maintenance crew')
    } else this.$router.replace({ path: '/' })
  },
  methods: {
    submitHandler() {
      const addAdminRole = this.$fireFunc.httpsCallable('addCustomRole')
      addAdminRole({
        email: this.email,
        role: this.role,
      }).then((result) => {
        console.log(result)
      })
    },
    messageHandler() {
      this.$fireStore
        .collection('message')
        .doc(this.getMessage.id)
        .update({ text: this.text })
        .then(() => (this.text = ''))
        .catch(() => console.log('u not an admin dude'))
    },
  },
  head() {
    return {
      title: 'Admin page',
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

<style></style>
