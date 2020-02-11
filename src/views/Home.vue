<template>
  <div class="home">
    <el-container>
      <el-header style="padding:0px;height:45px"><app-header /></el-header>
        <el-container>
          <el-aside width="200px"><app-nav-side @setNavTitle="setNavTtile"/></el-aside>
          <el-container>
              <el-header style="padding:0px;height:45px"><app-curNav >{{navTitle}}</app-curNav></el-header>
              <el-main style="padding: 15px;">
                <div class="container">
                  <router-view />
                </div>
              </el-main>
          </el-container>
        </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "../components/main/Header";
import NavSide from "../components/main/NavSide";
import curNav from "../components/main/curNav";
export default {
  name: "home",
  data() {
    return {
      navTitle: '考勤统计',
    };
  },
  components: {
    "app-header": Header,
    "app-nav-side":NavSide,
    "app-curNav":curNav,
  },
  methods: {
    setNavTtile(title){
      this.navTitle = title
    },
  },

};
</script>

<style scoped>
.home{
  height: 100%;
}
.el-main .container{
  box-sizing: border-box;
  width: 100%;
  min-height: 500px;
  background-color: #fff;
  padding: 10px;
}
</style>

