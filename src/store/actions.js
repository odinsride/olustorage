import firebase from 'firebase'
import router from '@/router'

export default {
  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('setUser', {email: firebaseUser.user.email})
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  userSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('setUser', {email: firebaseUser.user.email})
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  autoSignIn ({commit}, payload) {
    commit('setUser', {email: payload.email})
  },

  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  },

  createBox ({commit, state}, {boxNumber, notes, contents}) {
    return new Promise((resolve, reject) => {
      const boxId = firebase.database().ref('boxes').push().key
      const box = {boxNumber, notes, contents: {}}

      const updates = {}
      updates[`boxes/${boxId}`] = box

      contents.forEach(function (content) {
        // Get a new key for each content
        content.contentId = firebase.database().ref('contents').push().key
        // Add the content to the box
        box.contents[content.contentId] = content.contentId
        // Add the content to the updates, don't want to pass contentId though
        updates[`contents/${content.contentId}`] = {description: content.description, boxId: boxId}
      })

      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', {resource: 'boxes', item: box, id: boxId})

          // Loop through contents to assign to box and populate contents in state
          contents.forEach(function (content) {
            content.boxId = boxId
            console.log(content)
            commit('appendContentToBox', {parentId: boxId, childId: content.contentId})
            commit('setItem', {
              resource: 'contents',
              item: {description: content.description, boxId: content.boxId},
              id: content.contentId})
          })

          resolve(state.boxes[boxId])
        })
    })
  },

  fetchContents ({dispatch}, {ids}) {
    return dispatch('fetchItems', {resource: 'contents', ids})
  },

  fetchAllBoxes ({state, commit}) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('boxes').once('value', snapshot => {
        const boxesObject = snapshot.val()
        Object.keys(boxesObject).forEach(boxId => {
          const box = boxesObject[boxId]
          commit('setItem', {resource: 'boxes', id: boxId, item: box})
        })
        resolve(Object.values(state.boxes))
      })
    })
  },

  fetchItem ({state, commit}, {id, resource}) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
        resolve(state[resource][id])
      })
    })
  },

  fetchItems ({dispatch}, {ids, resource}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource})))
  }

}
