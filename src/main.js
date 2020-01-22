import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index.js'
//引入css重置样式
import './style/reset.css'
//引入全局轻提示
import { Toast,NavBar,Uploader,Dialog,Field,Picker,Icon,Tab,Tabs,List,PullRefresh } from 'vant';
Vue.use(Toast) //添加轻提示1
   .use(NavBar) //导航栏
   .use(Uploader) //文件上传
   .use(Dialog )//添加弹出框
   .use(Field)//添加Field输入框
   .use(Picker)//选择器
  .use(Icon)//图标
  .use(Tab)//栏目
  .use(Tabs)//栏目
  .use(List)//上拉加载
  .use(PullRefresh) //下拉刷新
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
