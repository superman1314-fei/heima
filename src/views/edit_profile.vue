<template>
  <div class="edit">
    <van-nav-bar title="编辑资料" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <!-- 引入vant组件的文件上传 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="currentUser.nickname" @click="nickname=!nickname"></mycell>
    <van-dialog v-model="nickname" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value="currentUser.nickname" required label="昵称" placeholder="请输入昵称" />
    </van-dialog>
    <mycell title="密码" :desc="currentUser.password" @click="nickpassword=!nickpassword"></mycell>
    <van-dialog
      v-model="nickpassword"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :beforeClose="beforeClose"
    >
      <van-field ref="originPass" required label="原密码" placeholder="请输入原密码" />
      <van-field ref="newPass" required label="新密码" placeholder="请输入新密码" />
    </van-dialog>
    <mycell title="性别" :desc="currentUser.gender===0?'女':'男'"></mycell>
  </div>
</template>

<script>
import mycell from "../components/mycell"; //单向格
import { getUserById } from "../apis/user"; //引入用户详情的api
import { uploadFile } from "../apis/upload"; //引入文件上传api
import { getUpDateById } from "../apis/user"; // 编辑用户信息api
export default {
  data() {
    return {
      //定义一个数据接收数据
      currentUser: {},
      nickname: false,
      nickpassword: false
    };
  },
  components: {
    mycell
  },
  methods: {
    //修改图片
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器

      let formdata = new FormData();
      formdata.append("file", file.file);
      let res1 = await uploadFile(formdata);
      if (res1.data.message === "文件上传成功") {
        //  实现预览效果
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + res1.data.data.url;

        let res2 = await getUpDateById(this.$route.params.id, {
          head_img: this.currentUser.head_img
        });
        // console.log(res2);
        if (res2.data.message === "修改成功") {
          this.$toast.success("修改成功");
          this.currentUser.head_img = res2.data.data.head_img;
        } else {
          this.$toast.fail("修改失败");
        }
        // console.log( this.currentUser);
      } else {
        this.$toast.fail("上传失败");
      }
      //  console.log(res1);

      //   console.log(file);
    },
    //修改昵称
    async updateNickname() {
      //   通过$refs 获取当前的dom元素的值 input是当前的文本框
      //    console.log(this.$refs.nick.$refs.input.value);

      let res = await getUpDateById(this.$route.params.id, {
        nickname: this.$refs.nick.$refs.input.value
      });
      // console.log(res);
      if (res.data.message === "修改成功") {
        this.$toast.success("修改成功");
        this.currentUser.nickname = res.data.data.nickname;
      } else {
        this.$toast.fail("修改失败");
      }
      // console.log(this.currentUser);
    },
    //修改密码
    async updatePassword() {
      // console.log(111);
      // 获取原密码
      let originPass = this.$refs.originPass.$refs.input.value;
      // console.log(originPass);
      let newPass = this.$refs.newPass.$refs.input.value;
      // console.log(newPass);

      if (originPass === this.currentUser.password) {
        if (/^\S{3,8}$/.test(newPass)) {
          let res3 = await getUpDateById(this.$route.params.id, {
            password: newPass
          });
        //   console.log(res3);
          if (res3.data.message === "修改成功") {
            this.$toast.success("修改成功");
            this.currentUser.password = newPass;
          }
        } 
      } 
      // console.log(this.currentUser);
    },
    //进行双向绑定 调用方法
           async beforeClose(action,done){
            //    第一种方法
    //         console.log(action);
    //         if(action=='confirm'){
    //                let originPass = this.$refs.originPass.$refs.input.value;
    //                let newPass = this.$refs.newPass.$refs.input.value;
    //     if (originPass === this.currentUser.password) {
    //     if (/^\S{3,8}$/.test(newPass)) {
    //       let res3 = await getUpDateById(this.$route.params.id, {
    //         password: newPass
    //       });
    //     //   console.log(res3);
    //       if (res3.data.message === "修改成功") {
    //         this.$toast.success("修改成功");
    //         this.currentUser.password = newPass;
    //           done()
    //       }
    //     }else{
    //         done(false)
    //     }
    //   }else{
    //     this.$refs.originPass.$refs.input.focus();
    //       done(false)
    //   }

    //         }else{
    //             done() 
    //         }
            // console.log(done);
            // 第二种方法
            if(action=='confirm'){
                 let originPass = this.$refs.originPass.$refs.input.value;
                //    let newPass = this.$refs.newPass.$refs.input.value;
                   if(originPass !== this.currentUser.password){
                       this.$toast.fail('请输入正确的密码')
                       this.$refs.originPass.$refs.input.focus()
                       done(false)
                   }else if(!/^\S{3,8}$/.test(this.$refs.newPass.$refs.input.value)){
                    //    !/^\S{3,16}$/.test(this.$refs.newPass.$refs.input.value)
                       this.$toast.fail('请正确输入新密码')
                       done(false)
                   }else{
                        done()
                   }

            }else{
                done()
            }
            
    },
  },
 
  async mounted() {
    //  console.log(this.$route.params.id);  可以获取id
    let res = await getUserById(this.$route.params.id);
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
      //判断是否存在图片 如果有图片就渲染出来  没有就给一个默认图片
      if (this.currentUser.head_img) {
        this.currentUser.head_img = this.currentUser.head_img;
      } else {
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/image/lu.png";
      }
    }
    // console.log(this.currentUser);
  },
  
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