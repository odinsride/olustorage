<template>
  <v-flex xs12 sm6 md4 lg2>
    <v-card class="os-card os-card-gradient" hover height="100%">
      <v-card-title primary-title>
        <div>
          <h3 class="headline primary--text mb-0">Box {{box.boxNumber}}</h3>
          <div class="grey--text">{{box.notes ? box.notes : '&nbsp;'}}</div>
          <ContentList v-if="boxContents" :contents="boxContents" />
        </div>
      </v-card-title>

      <!-- <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-flex>
</template>

<script>
import ContentList from './ContentList'

export default {
  components: {
    ContentList
  },
  props: {
    box: {
      required: true,
      type: Object
    }
  },
  computed: {
    boxContents () {
      return Object.values(this.$store.state.contents)
        .filter(content => content.boxId === this.box['.key'])
    }
  }
}
</script>

<style scoped>
.os-card {
  border-radius: 5px;
}

.os-card-gradient {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#e0f2f1+0,ffffff+100 */
  background: rgb(224,242,241); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(224,242,241,1) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(224,242,241,1) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(224,242,241,1) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e0f2f1', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
}
</style>
