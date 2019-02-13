<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center primary--text" mt-5>
        <h1>Welcome to {{ appTitle }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote grey--text text--darken-1 font-weight-regular text-xs-center">
          A simple way of tracking items in boxes <br>
          with search capabilities!
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn color="secondary" to="/signup">
          <v-icon left dark small>face</v-icon>
          Sign Up          
        </v-btn>
        <v-btn color="secondary" to="/signin">
          <v-icon left light small>lock_open</v-icon>
          Sign In
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    }
  }
}
</script>