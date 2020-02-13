<template>
  <div class="teacher-datas">
    <el-form :inline="true">
      <el-form-item label="学号"><el-input type="text" v-model="selectTid"/></el-form-item>
      <el-form-item><el-button @click="selectFn" type="primary">查询</el-button></el-form-item>
    </el-form>
    <el-table :data="stuData" border style="width: 100%" >
      <!-- <el-table-column prop="yearSemester" label="学期" width="180"></el-table-column> -->
      <el-table-column prop="tId" label="学号" width="120"></el-table-column>
      <el-table-column prop="sName" label="姓名" width="88"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="150"></el-table-column>
      <el-table-column prop="faculty" label="院系" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="changePW(scope.row)">修改密码</el-button></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectTid:'',
      stuData:[],
    }
  },
  mounted(){
      this.$http.get('/admin/getTeacher')
      .then((res)=>{
        console.log('管理员查询的的学生数据',res.data.data)
        this.stuData.push(res.data.data)
      })
  },
  methods:{
    selectFn(){

    },
    //修改密码
    changePW(){
      this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    }
  }
};
</script>

<style scoped>
</style>
