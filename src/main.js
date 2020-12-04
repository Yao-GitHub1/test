// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'base/css/common.scss'
import "babel-polyfill";
import plugins from '@/plugins/plugins';
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'

// import axios from '../assets/js/axios.js';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$axios = axios

axios.defaults.baseURL = ''
axios.defaults.withCredentials = false

// axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.headers.post['Content-Type'] = 'application/json';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(plugins)
Vue.use(VueQuillEditor)
// Vue.use(axios);


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



Array.prototype.insert = function(index,item){
	this.splice(index,0,item);
}
