<template>
  <div class="login">
      <div class="container">
          <div class="title">高校考勤系统</div>
          <div id="darkbannerwrap"></div>
          <el-form :label-position="labelPosition" >
            <el-form-item >
              <el-input v-model="name" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="角色" >
              <el-radio-group v-model="role">
                <el-radio label="学生" ></el-radio>
                <el-radio label="老师" ></el-radio>
                <el-radio label="管理员" ></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" style="background-color: #189F92;width:100%;" >提交</el-button>
            </el-form-item>
          </el-form>

      </div>
  </div>
</template>

<script>
export default {
  name: "curNav",
  data(){
      return {
        labelPosition: 'right',
        name: '',
        password: '',
        role: ''
      }
  },
  methods:{
    submitForm(){
      console.log("this",this.role)
      switch(this.role){
        case '学生':
         this.$router.push('user/student')
         sessionStorage.setItem('role', 1);
         break 
        case '老师':
         this.$router.push('user/teacher')
         sessionStorage.setItem('role', 2);
         break 
        case '管理员':
         this.$router.push('user/admin')
         sessionStorage.setItem('role', 3);
         break 
         default:
           return
      }
    }
  }
};
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.png) no-repeat center;
    background-size: cover;
    background-color: #f40;
}
.container{
    box-sizing: border-box;
    width: 420px;
    height: 420px;
    background-color: #fff;
    position: absolute;
    margin:120px auto 0 auto;
    left: 0;
    right: 0;
    padding: 40px;
    border-radius: 10px;
}
.container .title{
    background-color: #189F92;
    padding: 18px 10px 18px 60px;
    margin: 10px 0 0 -58px;
    color: #fff;
}
.container #darkbannerwrap{
    background: url(../assets/img/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}
</style>
