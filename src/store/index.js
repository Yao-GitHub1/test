import Vue from 'vue'
import vuex from 'vuex'
// import form from './module/form'
Vue.use(vuex)

const store = new vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },

  modules: {
    // form
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
})

export default store
