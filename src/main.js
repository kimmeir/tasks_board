import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UUID from "vue-uuid";
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  UUID,
  render: h => h(App)
}).$mount('#app')
