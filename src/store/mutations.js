import Vue from 'vue'

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId] // user.name === user['name']
    if (!resource[child]) { // Only add the posts array if it's a new thread
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }

export default {
  setUser (state, payload) {
    state.user = payload
  },

  setError (state, payload) {
    state.error = payload
  },

  setLoading (state, payload) {
    state.loading = payload
  },

  setItem (state, {item, id, resource}) {
    item['.key'] = id
    Vue.set(state[resource], id, item)
  },

  setBox (state, {box, boxId}) {
    Vue.set(state.boxes, boxId, box)
  },

  appendContentToBox: makeAppendChildToParentMutation({parent: 'boxes', child: 'contents'})
}
