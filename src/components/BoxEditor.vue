<template>
  <v-dialog v-model="boxEditor" persistent max-width="500px">
    <v-card>
      <v-card-title color="primary">
        <span class="headline primary--text">Add Box</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field 
                v-model="form.boxNumber" 
                label="Box Number"
                autofocus
                prepend-icon="archive"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field 
                v-model="form.notes" 
                label="Box Notes"
                prepend-icon="notes"></v-text-field>
            </v-flex>
            <v-flex xs12 v-for="content in form.contents" :key="form.contents.indexOf(content)">
              <v-text-field 
                v-if="form.contents.length - 1 === form.contents.indexOf(content)"
                v-model="content.description" 
                :label="`Item ` + (form.contents.indexOf(content) + 1).toString()"
                type="text"
                ref="newContent"
                prepend-icon="note_add"
              >
                <template slot="append">
                  <v-icon @click="removeContentField">remove_circle</v-icon>
                  <v-icon @click="addContentField">add_circle</v-icon>
                </template>
              </v-text-field>
              <v-text-field 
                v-else
                v-model="content.description" 
                :label="`Item ` + (form.contents.indexOf(content) + 1).toString()"
                type="text"
                prepend-icon="note_add"></v-text-field>                
            </v-flex>
            <!-- <v-flex>
              <pre>{{ $data }}</pre>
            </v-flex> -->
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="reset">Cancel</v-btn>
        <v-btn color="primary" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      boxEditor: false,
      form: {
        boxNumber: null,
        notes: '',
        contents: [{
          description: '',
          contentId: ''
        }]
      }
    }
  },

  props: {
    box: {
      type: Object
    }
  },

  computed: {
    isUpdate () {
      return !!this.box
    }
  },

  methods: {
    ...mapActions(['createBox']),

    addContentField: function () {
      this.form.contents.push({
        description: '',
        contentId: ''
      })
    },

    removeContentField: function () {
      this.form.contents.pop()
    },

    reset () {
      this.boxEditor = false
      this.form = {
        boxNumber: null,
        notes: '',
        contents: [{
          description: '',
          contentId: ''
        }]
      }
    },

    save () {
      this.persist()
    },

    create () {
      this.createBox({
        boxNumber: parseInt(this.form.boxNumber),
        notes: this.form.notes,
        contents: this.form.contents
      })

      this.reset()
    },

    persist () {
      // return this.isUpdate ? this.update() : this.create()
      return this.create()
    }
  }
}
</script>

<style>

</style>
