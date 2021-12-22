import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defpath:'/home',
    token:'',
    islogin:false,
    errList: [],
  },
  mutations: {
    GoTopath(state,defpath){
      state.defpath=defpath
    },
    Token(state,token){
      state.token=token
      if (token) {
        state.islogin=true
      }else{
        state.islogin=false
      }
    },
    ErrList(state,errors){
      state.errList.push(errors)
      setTimeout(() => {
        state.errList.shift();
      }, 2000);
    }
  },
  actions: {
  },
  modules: {
  }
})
