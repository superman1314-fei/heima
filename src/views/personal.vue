<template>
  <div class="personal">
    <router-link :to="{path:`/edit/${currentUser.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date |dateFormat}} </div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title='我的关注' desc='关注用户'></mycell>
       <mycell title='我的跟帖' desc='跟帖/回复'></mycell>
          <mycell title='我的收藏' desc='视频/文章'></mycell>
             <mycell title='设置' ></mycell>
             <mybutton id="btn">退出</mybutton>
  </div>
</template>

<script>
  import mycell from '../components/mycell' //引入单元格 
  import mybutton from '../components/mybutton' // 引入按钮】
  import {getUserById} from '../apis/user' //引入api方法
  import {dateFormat} from '../components/myfilters' //添加时间过滤器
export default {
  data () {
    return {
       currentUser:{}  //定义一个对象 获取数据
    }
  },
  components:{
    mycell,mybutton
  },
  filters:{
    dateFormat
  },
 async mounted (){
        // console.log(this.$route.params.id);
        // console.log(this.currentUser);
        
     let res=await getUserById(this.$route.params.id)
      // console.log(res);
      if(res.data.message==="获取成功"){
        this.currentUser=res.data.data  //将数据赋值给currentUser
        this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
      }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }

}
#btn{
     margin-top: 10px
  }
</style>
