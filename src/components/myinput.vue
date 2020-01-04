<template>
  <input type="text"
   class="myinput"
   :class="{'success':statu,'error':!statu}"
   @input="handieInput"
    @blur="bandieBlur"

    />
</template>

<script>
export default {
    data () {
        return {
            //标记用户输入是否合法
            statu:true
        }
    },
    //声明接收数据的成员
    props:['rules','msg'],
   methods:{
       handieInput(event){
           //获取users 里面的数据
           let value =event.target.value
        //    console.log(value);
        //test 侧重匹配 判断检测字符串是否匹配某个模式
        if(this.rules && this.rules.test(value)){
            this.statu=true
        }else{
            this.statu=false
        }
           //父组件传进来的数据
           this.$emit('input',value)
       },
       bandieBlur(event){
           let value=event.target.value
           if(this.rules && !this.rules.test(value)){
            //    console.log(this.msg || '输入不正确');
               this.$toast(this.msg || '输入不正确')
           }    
       }
   }
}
</script>

<style lang='less' scoped>
.myinput {
  width: 318/360 * 100vw;
  height: 40px;
  outline: none; //轮廓线取消样式
  border: none; //取消边框样式
  border-bottom: 3px solid #ccc;
  font-size: 15px;
  line-height: 40px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>