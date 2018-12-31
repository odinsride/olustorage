
<template>
  <v-container v-if="boxes" fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-3>
        <v-flex xs12 sm6 md4 offset-sm3 offset-md4>
          <v-text-field
            name="box"
            label="Search"
            id="searchString"
            hint="Search by Box Number or Contents"
            type="text"
            solo
            v-model="searchString"
            clearable>
              <v-tooltip slot="append-outer" right>
                <v-btn 
                  color="secondary" 
                  slot="activator" 
                  style="top: -15px"
                  class="elevation-5"
                  fab small
                  @click="$refs.boxCreate.boxEditor = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
                <span>Add Box</span>
              </v-tooltip>
            </v-text-field>   
        </v-flex>
        <v-flex xs12 sm6 md4 offset-md4>
          <BoxEditor ref="boxCreate" />
        </v-flex>
      </v-flex>
    </v-layout>
    
    <BoxList v-if="boxes && !searchString" :boxes="boxes" />
    <BoxList v-if="boxes && searchString" :boxes="getBox()" />
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import BoxList from '@/components/BoxList'
import BoxEditor from '@/components/BoxEditor'

export default {
  components: {
    BoxList,
    BoxEditor
  },

  data () {
    return {
      searchString: null
    }
  },

  computed: {
    boxes () {
      return Object.values(this.$store.state.boxes)
    }
  },

  methods: {
    ...mapActions(['fetchAllBoxes', 'fetchContents']),

    getBox () {
      var searchResults, contentsBoxIds

      // If searchString is an integer, search by box number,
      // otherwise, search by contents
      if (Number.isInteger(parseInt(this.searchString))) {
        searchResults = Object.values(this.$store.state.boxes)
          .filter(box => box.boxNumber === parseInt(this.searchString))
      } else {
        // Get a list of boxIds where the contents were found
        contentsBoxIds = this.getContentsBoxIds()

        // Filter the box list by contents boxId values
        searchResults = Object.values(this.$store.state.boxes)
          .filter(box => {
            if (contentsBoxIds.indexOf(box['.key']) >= 0) { return true }
          })
      }

      return searchResults
    },

    getContentsBoxIds () {
      // Search through the contents records and store matches
      var contentsBoxIds = []
      var contents = Object.values(this.$store.state.contents)
        .filter(content => content.description.toUpperCase().startsWith(this.searchString.toUpperCase()))

      // Save the boxIds from the matches to be returned
      contents.forEach(content => {
        contentsBoxIds.push(content.boxId)
      })

      return contentsBoxIds
    },

    reset () {
      this.searchString = null
    }
  },

  created () {
    this.fetchAllBoxes()
      .then(boxes => {
        boxes.forEach(box => this.fetchContents({ids: Object.keys(box.contents)}))
      })
  }
  // methods: {
  //   getBox (boxNumber) {
  //     this.$store.dispatch('fetchBox', {boxNumber: boxNumber})
  //   }
  // }
}
</script>