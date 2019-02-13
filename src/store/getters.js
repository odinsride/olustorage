export default {
  isAuthenticated (state) {
    return state.user !== null && state.user !== undefined
  }
}
