<template>
  <v-app>
    <TheNavbar/>
    <v-content>
      <router-view></router-view>
    </v-content>    
  </v-app>
</template>

<script>
  import TheNavbar from '@/components/TheNavbar'

  export default {
    components: {
      TheNavbar
    }
  }
</script>

<style>
html {
  overflow: auto;
}
</style>