<template>
  <div class="index">
    <div class="heads">
      <!-- 图标 -->
      <div class="log">
        <span class="iconfont iconnew"></span>
      </div>
      <!-- 搜索框 -->
      <span class="search">搜索内容</span>
      <!-- 个人中心图标 -->
      <van-icon
        name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        class="user"
        @click="$router.push({ path:`/personal/${id}`})"
      />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list v-model="cate.loading" :finished="cate.finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false' :offset='10'>
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
 <articleBlock v-for="item in cate.postList" :key="item.id" :post="item"></articleBlock>
</van-pull-refresh>
         
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCatePost } from "../apis/cate"; //栏目api
import { getPostList } from "../apis/article"; //文章类表
import articleBlock from "../components/articleBlock.vue"; //新闻类表
export default {
  data() {
    return {
      id: "",
      active: localStorage.getItem("heima_token") ? 1 : 2, //这个的栏目信息
      cateList: [] //文章类表
    };
  },
  components: {
    articleBlock
  },
  async mounted() {
    this.id = JSON.parse(localStorage.getItem("heima_user") || "{}").id;

    let res = await getCatePost(); //获取栏目信息
    this.cateList = res.data.data;

    this.cateList = this.cateList.map(value => {
      return {
        ...value, // 展开对象，我要这个对象的所有成员
        postList: [], // 这个栏目的新闻列表数据
        pageSize: 5, //这个栏目每页所显示的记录数
        pageIndex: 1, // 这个栏目 当前的页码
        loading:false,//这个栏目的加载状态
        finished:false,//这个栏目是否加载完毕
        isLoading:false//这个栏目是否在刷新
      };
    });
    this.init();
  },

  methods: {
    async init() {
      let res1 = await getPostList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: this.cateList[this.active].id
      }); //文章的类表
      if(this.cateList[this.active].loading){
 this.cateList[this.active].loading=false //将当前的loading重新设置为false
      }
    if(this.cateList[this.active].isLoading){
      this.cateList[this.active].isLoading=false
    }
    //当数据全部加载完毕后显示没有更多了
   if(res1.data.data.length<this.cateList[this.active].pageSize){
      this.cateList[this.active].finished=true
    }
     //将数据存储到当前栏目的postList中
      this.cateList[this.active].postList.push(...res1.data.data)
    },
    //上拉加载
    onLoad(){
      this.cateList[this.active].pageIndex++;
      setTimeout(()=>{
        this.init()
      },2000)
    },
    //下拉刷新
    onRefresh(){
      //重置加载到第一页
      this.cateList[this.active].pageIndex=1;
      // 清空数据
      this.cateList[this.active].postList.length=0
      // 发起请求
      setTimeout(()=>{
        this.init()
      },1000)
      // 将finished设置为false 可以继续上拉加载
      this.cateList[this.active].finished=false
    }
  },
  watch: {
    active() {
      if (this.cateList[this.active].postList.length === 0) {
        this.init();
      }
    }
  }
};
</script>

<style lang='less' scoped>
.heads {
  width: 100%;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .log {
    padding: 0 10px;
    .iconfont {
      font-size: 60px;
    }
  }
  .search {
    height: 40px;
    background: rgba(255, 255, 255, 0.8);
    flex: 1;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
  }
  .user {
    font-size: 25px;
    padding: 0px 10px;
  }
}
</style>