<template>
  <div class="update-pw">
    <div class="container">
      <div class="title">修改密码</div>
      <div id="darkbannerwrap"></div>
      <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="email" :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="inpuCode" :rules="[
        { required: true, message: '请输入验证码', trigger: 'blur' },
      ]">
          <el-input v-model="ruleForm.inpuCode" placeholder="请输入验证码" style="width: 65%;"></el-input>
          <el-button type="primary" @click="sendEmail()" style="width: 30%;float: right;" :disabled="ifCodeBt">
            {{codeBt}}</el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" auto-complete="new-password">
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input v-model="ruleForm.rePassword" type="password" placeholder="请重复密码" auto-complete="new-password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.role">
            <el-radio label="1">学生</el-radio>
            <el-radio label="2">老师</el-radio>
            <el-radio label="3">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateFn('ruleForm')"
            style="background-color: #189F92;width: 30%;margin:10px 10px 0 50px;">修改</el-button>
          <el-button type="danger" @click="returnFn()" style="width: 30%;">返回</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else if (!patt.test(value)) {
          callback(new Error('最少6位，至少包括一个大写字母、一个小写字母、一个数字'));
        }
        else {
          if (this.ruleForm.rePassword !== '') {
            this.$refs.ruleForm.validateField('rePassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: { //表单内容
          inpuCode: '',
          email: '',
          rePassword: '',
          password: '',
          role: '1'
        },
        ifCodeBt: false,  //是否禁用按钮
        codeBt: '发送验证码',  //发送验证码按钮的内容
        emailCode: -1,  //邮箱返回的验证码。-1：说明还按下发送验证码。0：按下发送验证码了，但是找不到邮箱。
        labelPosition: 'right', //表单Label的位置
        rules: {  //表单验证
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    // computed: {
    //   codeBt(){

    //     return 
    //   }
    // },

    methods: {
      //更改密码
      updateFn(formName) {
        //验证表单
        this.$refs[formName].validate((valid) => {
          //如果验证通过的话
          if (valid) {
            //如果已按下发送验证码。
            if (this.emailCode != -1) {
              //如果邮箱正确
              if (this.emailCode != 0) {
                //如果验证码输入正确
                if (this.ruleForm.inpuCode == this.emailCode) {
                  this.$http.post('/api/user/updatePW', {
                    email: this.ruleForm.email,
                    pw: this.ruleForm.password,
                    role: Number(this.ruleForm.role)
                  })
                    .then((res) => {
                      console.log('修改密码结果', res)
                      if (res.data.status == "200") {
                        this.$router.push('/login')
                        this.$message({
                          type: 'success',
                          message: '修改成功'
                        });
                      }
                    })
                    .catch(error => {
                      console.error('错误！', error)
                    })
                }
                else {
                  this.$message.warning("验证码错误!")
                }
              } else {
                this.$message.warning("找不到该邮箱！")
              }
            } else {
              this.$message.warning("请发送验证码！")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //返回
      returnFn() {
        this.$router.push('/login')
      },

      //通过邮箱发生验证码
      sendEmail() {
        let s = 15
        let params = {
          email: this.ruleForm.email,
          role: Number(this.ruleForm.role)
        }
        this.$http.post("/api/user/send-email", params)
          .then(res => {
            if (res.data.status == "500") {
              console.log('错误！',res.data.message)
            }
            else {
              if (res.data.message == "success") {
                this.$message.success('发送验证码成功！')
                this.ifCodeBt = true
                let interval = setInterval(() => {
                  if (s == 0) {
                    this.ifCodeBt = false
                    this.codeBt = '发送验证码'
                    clearInterval(interval)
                  }
                  else {
                    this.codeBt = s-- + 's'
                  }
                }, 1000)
                this.emailCode = res.data.data
              }
              if (res.data.message == "fail") {
                this.$message.warning("找不到该邮箱！")
                this.emailCode = 0
              }
            }
            console.log('发送邮箱返回的数据', res)
          })
          .catch(error => {
            console.log('失败！', error)
          })
      },
    }
  };
</script>

<style scoped>
  .update-pw {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.png) no-repeat center;
    background-size: cover;
  }

  .container {
    box-sizing: border-box;
    width: 420px;
    height: 520px;
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
</style>