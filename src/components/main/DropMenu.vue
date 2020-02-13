<template>
  <div class="drop-menu" @mouseenter="ifShow=true" @mouseleave="ifShow=false">
    <div class="title"  >
      <span>账户</span>
      <i class="fa fa-angle-down"></i>
    </div>
    <transition name="fade">
      <ul v-show="ifShow">
        <li v-for="(item,index) in list" :key="index" @click="choose(index)">{{item}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dropMenu",
  data() {
    return {
      list: ["修改密码", "退出"],
      ifShow: false
    };
  },
  methods:{
    choose(index){
      if(index == 0){
        this.$router.push('/updatePW')
      }
      if(index == 1){
        sessionStorage.clear();
        this.$router.push('/login')
      }
      console.log('index',index)
    },
  },
};
</script>

<style stope>
.drop-menu {
  position: relative;
  color: aliceblue;
  cursor: pointer;
  font-size: 12px;
}
.drop-menu .title span {
    padding: 0 10px;
}
.drop-menu ul {
  position: absolute;
  top: 100%;
  background-color: #fff;
  z-index: 999;
  padding: 0 10px;
  top: 48px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
}
.drop-menu ul li{
    height: 38px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
