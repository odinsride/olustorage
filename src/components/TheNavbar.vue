<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>        
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="primary">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon color="white--text" @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title class="white--text">
        <router-link :to="isAuthenticated ? '/home' : '/'" tag="span" style="cursor: pointer">
          <img src="@/assets/logo.png" class="logo mt-2" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          class="white--text"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn class="white--text" v-if="isAuthenticated" flat @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>        
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidebar: false
    }
  },

  computed: {
    appTitle () {
      return this.$store.state.appTitle
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    menuItems () {
      if (this.isAuthenticated) {
        return [
          { title: 'Home', path: '/home', icon: 'home' }
        ]
      } else {
        return [
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
        ]
      }
    }
  },

  methods: {
    userSignOut () {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>

<style>
.logo {
  width: 15%;
}
</style>
