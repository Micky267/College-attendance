<template>
  <div class="attend-init">
        <el-form  :inline="true">
          <el-form-item >
            <el-input type="text" v-model="tcid" placeholder="请输入教学班id"/>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="startFn">开始考勤</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tcid:'',
    }
  },
  methods: {
    startFn(){
      if(this.tcid){
        this.$router.push('/user/teacher/teacher-attend/'+this.tcid)
      }
      else{
        this.$message({
            type: 'warning',
            message: '请输入教学班id'
          });    
      }
    }
  },
};
</script>

<style scoped>
</style>
