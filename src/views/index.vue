<template>
  <div class="index">
    <div class="heads">
      <!-- 图标 -->
<div class="log">      <span class="iconfont iconnew"></span></div>
      <!-- 搜索框 -->
     
     
        <span class="search">搜索内容</span>
      
      <!-- 个人中心图标 -->
      <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" class="user "/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.heads{
  width: 100%;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .log{
    padding: 0 10px;
    .iconfont{
      font-size: 60px;
    }
  }
  .search{
    height: 40px;
    background: rgba(255, 255, 255, 0.8);
    flex:1;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;

  }
  .user{
    font-size: 25px;
    padding: 0px 10px;
   
  }
  
}
</style>