<template>
  <div class="but" @click="handlerclick">
      <!-- 插槽表达式 通过login传过来的数据放进匿名插槽 -->
      <slot></slot> 
  </div>
</template>

<script>
export default {
   methods:{
       handlerclick(event){
        //    this拿到vue实例 $emit 发送数据给父组件
           this.$emit('click',event)
       }
   }
}
</script>

<style lang='less' scoped>
    .but{
        width: 318/360*100vw;
        background-color: red;
        height: 40px;
        text-align:center;
        line-height: 40px;
        margin: 0 auto;
        border: none;
        border-radius: 40px;
        color: #fff;
    }
</style>