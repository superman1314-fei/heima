<template>
  <div class="login">
    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test" @click="$router.push({path:'/login'})"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <!-- 使用文本框  做双向绑定-->
          <myinput placeholder='请输入手机号' v-model="users.username" :rules='/^(1\d{10})$/' msg='请输入正确的用户名/手机号'></myinput>
          <myinput placeholder='请输入密码' v-model="users.password" :rules='/^\S{3,16}$/'  msg='请输入正确3-6位的密码'></myinput>
          <myinput placeholder='请输入昵称' v-model="users.nickname" :rules='/^\w+$/'  msg='请输入正确的用户名/手机号'></myinput>
          <!-- 使用按钮 @click 是子组件传进来的 -->
          <mybutton @click="register">注册</mybutton>
        </div>

        <p class="tips">
          已有账号！！！
          <router-link :to="{path:'/login'}">去登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//引入按钮子组件
import mybutton from "../components/mybutton";
//引入文本框子组件
import myinput from "../components/myinput";
//引入路由api方法 注册的api方法
import {register} from '../apis/user' 

export default {
  data () {
    return {
      users:{
        username:'', //手机
        password:'', //密码
        nickname:''//昵称
      }  
    }
  },
  components: {
    //注册按钮 和注册文本框
    mybutton,
    myinput
  },
  methods: {
    // 监听数据
    async register() {
  
      if(/^\w+$/.test(this.users.nickname) && /^\S{3,16}$/.test(this.users.password)  && /^(1\d{10})$/.test(this.users.username)){
         let res = await register (this.users)
          console.log(res);
          if(res.data.message==='注册失败'){
            this.$toast.fail(res.data.message)
          }else{
            this.$toast.success('注册成功') 
              this.$router.push({name:'Login'})
          }
      }else{
        this.$toast.fail('输入不合法')
      }
       
        
        
    },
  
  },
 
};
</script>

<style lang='less' scopen>
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>