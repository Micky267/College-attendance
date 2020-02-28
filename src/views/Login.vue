<template>
  <div class="login">
    <div class="container">
      <div class="title">高校考勤系统</div>
      <div id="darkbannerwrap"></div>
      <el-form :label-position="labelPosition">
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入账号" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            <div class="forget-pw"><router-link to="/update-pw">忘记密码</router-link></div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="inpuIdentify"  placeholder="请输入验证码" style="width: 200px;float: left;"></el-input>
          <div  @click="refreshCode" style="float: right">
            <SIdentify  :backgroundColorMax="255" :backgroundColorMin="230" :identifyCode="identifyCode"  ></SIdentify>
          </div>
        </el-form-item>

        <el-form-item>
          <el-radio-group v-model="role">
            <el-radio label="1">学生</el-radio>
            <el-radio label="2">老师</el-radio>
            <el-radio label="3">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="background-color: #189F92;width:100%;">登录</el-button>
          <!-- <el-button type="primary" @click="sendEmail()" style="background-color: #189F92;width:100%;">发生邮箱</el-button> -->
        </el-form-item>
      </el-form>
      <!-- <el-button type="primary" @click="upDatas()" style="background-color: #189F92;width:100%;" >上传数据</el-button> -->
    </div>
  </div>
</template>

<script>
  import SIdentify from '../components/Identify'
  export default {
    name: "curNav",
    components: {
      SIdentify
    },
    data() {
      return {
        labelPosition: 'right',
        userId: '',
        password: '',
        role: '1',
        data: '',
        inpuIdentify: '',  //用户输入的验证码
        identifyCodes: "1234567890",  //验证码的数字
        identifyCode: ""  //当前生成的验证码
      }
    },

    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      submitForm() {
        if(this.inpuIdentify.trim() == ''){
          this.$message.warning('请输入验证码！')
        }
       else  if(this.inpuIdentify == this.identifyCode){
          if (this.userId.trim() == '' || this.password.trim() == '') {
          this.$message.warning('账号或者密码不能为空！')
        }
        else {
          this.$http.get('/api/user/login', {
            params: {
              sid: this.userId,
              pw: this.password,
              role: Number(this.role)
            }
          })
            .then(res => {
              if (res.data.message == "success") {  
                sessionStorage.setItem('userId', this.userId);
                this.GLOVAL.userId = this.userId;
                switch (this.role) {
                  case '1':
                    this.$router.push('user/student')
                    sessionStorage.setItem('role', 1);
                    break
                  case '2':
                    this.$router.push('user/teacher')
                    sessionStorage.setItem('role', 2);
                    break
                  case '3':
                    this.$router.push('user/admin')
                    sessionStorage.setItem('role', 3);
                    break
                  default:
                    return
                }
              }
              else {
                this.$message.warning('密码错误！')
              }
            })
            .catch(error => {
              console.error('错误！', error)
            })
        }
        }
        else{
          this.$message.warning('验证码错误！')
        }

      },

       //发送邮箱
       sendEmail(){
      let params= {
              sid: '162011001',
              email: '939505073@qq.com',
              role: '1'
            }
        this.$http.post("/api/user/send-email",params)
        .then(res=>{
          console.log('发送邮箱返回的数据',res)
        })
       }, 
      //验证码的方法
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
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.png) no-repeat center;
    background-size: cover;
  }

  .container {
    box-sizing: border-box;
    width: 420px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    margin: 120px auto 0 auto;
    left: 0;
    right: 0;
    padding: 40px;
    border-radius: 10px;
  }

  .container .title {
    background-color: #189F92;
    padding: 18px 10px 18px 60px;
    margin: 10px 0 0 -58px;
    color: #fff;
  }

  .container #darkbannerwrap {
    background: url(../assets/img/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
  }
  .container .forget-pw a{
    height: 25px;
    color: #f40;
    float: right;
  }

  .code {
    margin: 400px auto;
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }
</style>