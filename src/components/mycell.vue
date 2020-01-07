<template>
  <div class="cell" @click="handlecick">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}} <span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
    props:['title','desc'],
    methods:{
        handlecick(event){
            //告诉父组件被点击了
            this.$emit('click',event)     
        }
    }
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