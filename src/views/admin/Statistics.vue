<template>
  <div class="statistics">
    <el-form :inline="true" class="demo-form-inline" v-model="select" label-width="80px" >
      <el-form-item label="学期">
        <div class="block">
          <el-cascader
            :options="semesterList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            :placeholder="curYearSemester"
            style="width: 207px;"
            ></el-cascader>
        </div>     
      </el-form-item>
      <el-form-item label="年级" v-model="select.grade"><el-input type="text"/></el-form-item>
      <el-form-item label="专业" v-model="select.majoy"><el-input type="text"/></el-form-item>
      <div class="block">
        <el-form-item label="课程" v-model="select.sName" ><el-input type="text"/></el-form-item>
        <el-form-item label="老师" v-model="select.tName"><el-input type="text"/></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px;margin-left: 50px;">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="courseList" border style="width: 100%" >
      <el-table-column prop="yearSemester" label="学期" width="180"></el-table-column>
      <el-table-column prop="majoy" label="专业" width="180"></el-table-column>
      <el-table-column prop="cNameTime" label="课程" width="250"></el-table-column>
      <el-table-column prop="tName" label="授课老师" width="100"></el-table-column>
      <el-table-column prop="attendTotal" label="考勤次数" width="80"></el-table-column>
      <el-table-column prop="stuTotal" label="学生总数" width="80"></el-table-column>
      <el-table-column prop="lateAVG" label="迟到人数" width="80"></el-table-column>
      <el-table-column prop="truantAVG" label="旷课人数" width="80"></el-table-column>
      <el-table-column prop="leaveAVG" label="请假人数" width="80"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailFn(scope.$index, scope.row)">查看详情</el-button>
        </template>
    </el-table-column> -->
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
    <el-row type="flex" justify="end">
      <span>提示：迟到、旷课、请假人数为每次点名平均人数</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "attendAttend",
  data() {
    return {
      select:{
        year:'',
        semester:'',
        majoy: '',
        cName: '',
        tName: '',
        grade:'',
      },
      semesterList,
      dialogTableVisible: false,
      courseList: [],
      courseDetail: [],
      detailTitle:'',
      curYearSemester:'2016-2017/第二学期'
    }
  },
  mounted(){
    const sid = sessionStorage.getItem('sid')
    // this.$http.get(`/getCourse?sid=${sid}`)
    this.$http.get(`/admin/getAllCoures`)
    .then((res)=>{
      this.courseList = res.data.data
      console.log('获取学生学期+课程请求的结果',res)
    })
  },
  methods: {
    // 选择学期
    handleChange(value) {
      this.curYearSemester = `${value[0]} 第${value[1]}学期`
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
      this.detailTitle = `${row.yearSemester} ${row.cName} ${row.tName}`
      console.log(row);
    },
    //当前页发生变化
    pageChange(page){
      console.log('当前是第几页',page)
    }
  },
  }
const semesterList = [{
        value: '2016-2017',
        label: '2016-2017',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]},{
        value: '2017-2018',
        label: '2017-2018',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]},{
        value: '2018-2019',
        label: '2018-2019',
        children:[{
          value: '1',
          label: '第一学期'
        },{
          value: '2',
          label: '第二学期'
        }]
      },{
        value: '2019-2020',
        label: '2019-2020',
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
