<template>
  <v-list class="os-transparent">

    <ContentListItem
      v-for="content in contents"
      :content="content"
      :key="content['.key']"
    />

  </v-list>
</template>

<script>
import ContentListItem from './ContentListItem'

export default {
  components: {
    ContentListItem
  },
  props: {
    contents: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>
.os-transparent {
  background: transparent !important
}
</style>
