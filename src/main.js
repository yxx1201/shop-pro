import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { componentFn } from './common/common';

componentFn()
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  scrollTo(0, 0)
  if (from.name == null) {
    store.commit("Token", localStorage.getItem('token'))
  }
  if (to.path == '/rotation') {
    store.commit("GoTopath", '/home')
  } else if (from.name == null && to.name == 'Type') {
    store.commit("GoTopath", '/type/' + to.params.type)
  } else if (to.path) {
    store.commit("GoTopath", to.path)
  }
  next()
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
