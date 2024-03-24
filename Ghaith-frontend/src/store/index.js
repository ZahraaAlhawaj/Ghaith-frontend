import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user
  }
})

export default store
