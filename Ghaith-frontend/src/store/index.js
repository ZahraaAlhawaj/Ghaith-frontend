import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, user) {
      console.log('userrr', user)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user
  }
})

export default store
