<template>
  <!-- <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title v-text="content.description"></v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile> -->
  <v-chip color="rgb(224,242,241)" class="primary--text text--lighten-1">
    <strong>{{content.description}}</strong>
  </v-chip>
</template>

<script>
export default {
  props: {
    content: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>
</style>
