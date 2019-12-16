import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters'
import mutations from './mutations'
import actions from './actions.js'
import user from './modules/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {

  // },
  // mutations: {

  // },
  // actions: {

  // },
  // modules: {

  // }
  state,
  getters,
  mutations,
  actions,
  modules:{
    user
  }
})
