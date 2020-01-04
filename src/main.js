import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index.js'
//引入css重置样式
import './style/reset.css'
//引入全局轻提示
import { Toast } from 'vant';
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
