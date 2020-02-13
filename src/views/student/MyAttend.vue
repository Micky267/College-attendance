<template>
  <div class="my-attend">
    <el-form :inline="true" :model="formSelect" class="demo-form-inline">
      <el-form-item label="学期">
        <div class="block">
          <el-cascader
            v-model="formSelect.year"
            :options="semesterList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </div>
        <!-- <el-input v-model="formSelect.year" placeholder="请选择学期"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="courseList" border style="width: 100%">
      <el-table-column prop="yearSemester" label="学期" width="180"></el-table-column>
      <el-table-column prop="cName" label="课程" width="250"></el-table-column>
      <el-table-column prop="tName" label="授课老师" width="120"></el-table-column>
      <el-table-column prop="attendTotal" label="考勤次数" width="120"></el-table-column>
      <el-table-column prop="normal" label="正常次数" width="120"></el-table-column>
      <el-table-column prop="late" label="迟到次数" width="120"></el-table-column>
      <el-table-column prop="truant" label="旷课次数" width="120"></el-table-column>
      <el-table-column prop="leave" label="请假次数" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailFn(scope.$index, scope.row)">查看详情</el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="100" @current-change="pageChange"></el-pagination>
    <el-dialog title="课程考勤详情" :visible.sync="dialogTableVisible" width="40%" >
      <div style="padding-bottom:15px">{{detailTitle}} </div>
      <el-table :data="courseDetail" border height="300" >
        <el-table-column property="number" label="序号" width="150"></el-table-column>
        <el-table-column property="date" label="日期" width="180"></el-table-column>
        <el-table-column property="status" label="状态" ></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "myAttend",
  data() {
    return {
      formSelect: { 
        year: [],
        course: ""
      },
      semesterList,
      dialogTableVisible: false,
      courseList: [],
      courseDetail: [],
      detailTitle:'',
    }
  },
  mounted(){
    const sid = sessionStorage.getItem('sid')
    // this.$http.get(`/getCourse?sid=${sid}`)
    this.$http.get(`/user/getCourseList`)
    .then((res)=>{
      this.courseList = res.data.data
      console.log('获取学生学期+课程请求的结果',res)
    })
  },
  methods: {
    // 选择学期
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {

    },
    detailFn(index, row) {
      this.dialogTableVisible = true
      this.$http.get('/user/getCourseDetail')
        .then((res) => {
          console.log('请求详情拿到的结果',res)
          this.courseDetail = res.data.data
        })
        .catch( (error)=> {
            console.log(error);
        })
      this.detailTitle = `${row.year} ${row.cName} ${row.tName}`
      console.log(row);
    },
    //当前页发生变化
    pageChange(page){
      console.log('当前是第几页',page)
    }
  },
  }
const semesterList = [{
        value: '2016',
        label: '2016~2017',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]},{
        value: '2017',
        label: '2017~2018',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]},{
        value: '2018',
        label: '2018~2019',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]
      },{
        value: '2019',
        label: '2019~2020',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]
    }]


</script>

<style scoped>
  .el-pagination{
    margin-top: 15px;
  }
</style>
