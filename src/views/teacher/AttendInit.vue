<template>
  <div class="attend-init">
    <el-row type="flex" justify="center" style="padding: 15px;">
      <el-form :inline="true" style="margin-top: 100px;">
        <el-form-item>
          <div class="block">
            <el-cascader :options="semesterList" style="width: 400px;" v-model="tcId" placeholder="请选择教学班">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startFn">开始考勤</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tcId: -1,
        semesterList: [],
      }
    },
    computed: {
      //动态生成联级选择器内容
      // props() {
      //   return {
      //     lazy: true,
      //     lazyLoad: (node, resolve) => {
      //       var level = node.level
      //       if (level == 1) {
      //         this.selCourse.year = node.data.value
      //         resolve(node);
      //       }
      //       if (level == 2) {
      //         this.selCourse.semester = node.data.value
      //         this.$http.get('/api/teacher/getSemesterCourses', {
      //           params: {
      //             tId: sessionStorage.getItem('userId'),
      //             year: this.selCourse.year,
      //             semester: this.selCourse.semester
      //           }
      //         })
      //           .then((res) => {
      //             if (res.status == 200) {
      //               resolve(res.data.data);
      //             }
      //             else {
      //               console.log('请求错误！', res.data.message)
      //             }
      //           })
      //       }
      //     }
      //   }
      // },
    },
    mounted() {
      this.$http.get('/api/teacher/getSemesterCourses', {
        params: {
          tId: sessionStorage.getItem('userId'),
          year: this.GLOBAL.year,
          semester: this.GLOBAL.semester
        }
      })
        .then((res) => {
          if (res.status == 200) {
            this.semesterList = res.data.data
            // resolve(res.data.data);
          }
          else {
            console.log('请求错误！', res.data.message)
          }
        })
        .catch(error => {
          console.log('错误！', error)
        })

    },
    methods: {
      //开始考勤
      startFn() {
        if (this.tcId == -1) {
          this.$message({
            type: 'warning',
            message: '请选择教学班'
          });
        }
        else {
          this.$router.push('/user/teacher/teacher-attend/' + this.tcId)
        }
      },
    },
  };
</script>

<style scoped>
</style>