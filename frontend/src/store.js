import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    getters: {
        user(state) {
            return state.user
        },
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user)
        }
    }
})