<template>
  <div class="edit">
    <van-nav-bar title="编辑资料" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <!-- 引入vant组件的文件上传 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="currentUser.nickname"></mycell>
    <mycell title="密码" :desc="currentUser.password"></mycell>
    <mycell title="性别" :desc="currentUser.gender===0?'女':'男'"></mycell>
  </div>
</template>

<script>
import mycell from "../components/mycell"; //单向格
import { getUserById } from "../apis/user"; //引入用户详情的api
export default {
  data() {
    return {
      currentUser: {}
    };
  },
  components: {
    mycell
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  },
  async mounted() {
    //  console.log(this.$route.params.id);  可以获取id
    let res = await getUserById(this.$route.params.id);
    if (res.data.message === "获取成功") {
            this.currentUser = res.data.data;
            //判断是否存在图片 如果有图片就渲染出来  没有就给一个默认图片
        if(this.currentUser.head_img){
             this.currentUser.head_img = 'http://127.0.0.1:3000' +this.currentUser.head_img
        }else{
            this.currentUser.head_img='http://127.0.0.1:3000/uploads/image/lu.png'
        }
    }
    console.log(this.currentUser);
  }
};
</script>

<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
///deep/ 是引入的组件重置样式 要不然权重不够
/deep/.van-uploader__upload {
  width: 90/360 * 100vw;
  height: 90/360 * 100vw;
}

/deep/.van-uploader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>