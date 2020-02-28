<!-- <template>
  <div class="other">
    待开发。。。
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
</style> -->


<template>
  <div class="code" @click="refreshCode">
    <SIdentify :backgroundColorMax="255" :backgroundColorMin="230" :identifyCode="identifyCode"></SIdentify>
  </div>
</template>

<script>
import SIdentify from '../../components/Identify'

  export default {
    name: "codetest",
    components:{
     SIdentify:SIdentify
    },
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: ""
      };
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      }
    }
  };
</script>

<style>
  .code {
    margin: 400px auto;
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }
</style>