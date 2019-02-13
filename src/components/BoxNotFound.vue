<template>
  <v-alert
    :value="true"
    type="info"
    icon="info"
    transition="scale-transition"
    color="secondary"
    outline
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      message: 'Box not found matching this search'
    }
  }
}
</script>
