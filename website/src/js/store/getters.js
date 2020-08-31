export default {
    isLoggedIn (state) {
        return state.currentUser !== null
    },

    isNotLoggedIn (state, getters) {
        return getters.isLoggedIn === false
    }
}
