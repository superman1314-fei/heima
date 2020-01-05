<template>
  <div class="cell">
      <div class="left" >{{title}}</div>
      <div class="right">{{desc}} <span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props:['title','desc']
}
</script>

<style lang='less' scoped>
    .cell{
            padding: 20px 10px;
            display:flex;
            justify-content: space-between;
            border-bottom: 1px solid #cccccc;
            >.right{
                font-size: 13px;
                color: #cccccc;
            }
    }
</style>