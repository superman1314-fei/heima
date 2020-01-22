import Vue from 'vue' //引入
import VueRouter from 'vue-router' //引入路由模块
//引入组件
import Login from '../views/login.vue' //引入登录组件
import Personal from '../views/personal.vue' //引入个人中心组件
import Edit from '../views/edit_profile.vue' //编辑中心 
import Index from '../views/index.vue'//首页
import Register from '../views/register.vue'//首页
Vue.use(VueRouter) //挂载路由

//创建路由
let router =new VueRouter({
        //登录页
        routes:[{
            name:'Login',
            path:'/login',
            component:Login
        },
        //首页
        {
            name:'Index',
            path:'/',
            component:Index
        },
        // 注册页
        {
            name:'Register',
            path:'/register',
            component:Register
        },
        //个人中心页
        {
            name:'Personal',
            path:'/personal/:id',//添加id
            component:Personal
        },
        //编辑页面
        {
            name:'Edit',
            path:'/edit/:id',
            component:Edit
        }
    ]
})
// 设置导航守卫
router.beforeEach((to, from, next) => {
            // 并不是每一个页面都需要登录才能访问的
    if(to.path.indexOf('/personal')===0){
        //证明你现在在访问这个页面
        let token=localStorage.getItem('heima_token') 
        console.log(token);
        
        //判断这个页面是否存在token值
        if(token){
            //存在就进行下一步操作
            next()
        }else{
            // 否则就跳转到登录页需要用户登录
            next({name:'Login'})
            
            // next()
        }
    }else{
        // 如果不是访问需要授权的页面就不用判断是否登录
        next()
    }
  })
//暴露路由
export default router