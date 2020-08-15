<template>
  <v-card v-show="getMessage.text">
    <v-card-subtitle>Admin says:</v-card-subtitle>
    <v-card-text>{{ getMessage.text }}</v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getMessage: 'getMessage',
    }),
  },
}
</script>

<style></style>
