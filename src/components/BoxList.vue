<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap justify-center>
      <BoxListItem
        v-for="box in boxes"
        :box="box"
        :key="box['.key']"
      />
    </v-layout>
  </v-container>
</template>

<script>
import BoxListItem from './BoxListItem'

export default {
  components: {
    BoxListItem
  },
  props: {
    boxes: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>
