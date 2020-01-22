<template>
  <!-- 左右的文章结构 -->
  <div class="single" v-if="post.type===1 && post.cover.length <=2">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <div class="singlev" v-else-if="post.type===2">
    <p class="content">{{post.title}}</p>
    <div class="playarea">
      <img :src="post.cover[0].url" alt />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
  <div class="singlet" v-else-if="post.type===1 && post.cover.length >=3">
    <p class="content">{{post.title}}</p>
    <div class="imgs">
      <img :src="item.url" alt v-for="item in post.cover" :key="item.id" />
    </div>
    <p class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["post"],
  mounted() {}
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    margin: 10px 0;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  } 
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
.singlev {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #ccc; 

  .playarea{
    width: 100%;
      position: relative;
     
  >img{
    width: 100%;
    display: block;
    margin-bottom: 10px 
    
  }
  >.playicon{
    position: absolute;
    width: 60/360*100vw;
    height: 60/360*100vw;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: 40/360*100vw;
    color: #fff;
    line-height: 65/360*100vw;
    box-shadow: 0 0 15px #fff;
  } 
  }

}
.singlet{
    display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #ccc; 
 
  >.imgs{
    display: flex;
     justify-content: space-around;
    >img{
      width: 32.33%;
    }
  }
}
</style>
