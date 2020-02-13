const Mock = require('mockjs') // 获取mock对象
var Random = Mock.Random
// const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写

//学生和老师——》获取某学期课程
Mock.mock(`${domain}/user/getCourseList`, 'get', {
  code: 200,
  'data|4':[{
    'sid|+1':10011,
    'yearSemester':'2016~2017 第二学期',
    'cName|+1':['c语言(周五3-5)','java（周三3-5，周四8-10）','网站设计（周三3-5，周四8-10）','计算机基础（周四8-10）'],
    'tName|+1':['温老师','陈老师','谢老师','曹老师'],
    'stuId|+1:':'162011001',
    'sName':'@CNAME',
    'className|1-8':1,
    'attendTotal|18-36':1,
    'normal': function () {
      return (this.attendTotal-this.late-this.truant-this.leave)
    },
    'late|0-5': 1,
    'truant|0-5': 1,
    'leave|0-5': 1,
    score: function () {
      return (100 - this.late * 1 - this.truant * 5)
    }
  }]
});

//学生和老师——》获取课程考勤详情
Mock.mock(`${domain}/user/getCourseDetail`, 'get', {
  code: 200,
  'data|8':[{
    'sid|+1':1,
    'number|+1':1,
    date:'@Date',
    'status|1':['正常','请假','旷课','迟到'],
  }]
});

//管理员和老师查看学生信息
Mock.mock(`${domain}/user/getStudent`, 'get', {
  code: 200,
  'data|1':[{
    'sid|+1':162011001,
    'sName':'@NAME',
    'sex':'@SEX',
    'phone':'@phone',
    'grade|1':[206,2017,2018,2019],
    'faculty|1':['电气学院'],
    'majoy|1':['计算机','通信','电气','电子'],
    'className|1-8':1,
  }]
});

//老师获取要考勤的学生数据
Mock.mock(`${domain}/teacher/getAttendStu`, 'get', {
  code: 200,
  'data|16':{
    sid:200101,
    stuTotal:16,
    'yearSemester':'2016~2017 第二学期',
    'cName|+1':['c语言(周五3-5)','java（周三3-5，周四8-10）','网站设计（周三3-5，周四8-10）','计算机基础（周四8-10）'],
    'tName|+1':['温老师','陈老师','谢老师','曹老师'],
    'stuList|16':[{
    'sid|+1':200101001,
    'number|+1':1,
    'stuId|+1':162011001,
    'sName':'@CNAME',
    'sex|1':['男','女'],
    'className|+1':['16计算机7班','16计算机8班','16计算机1班','16计算机6班'],
  }]}
});

//管理员获取所有课程
Mock.mock(`${domain}/admin/getAllCoures`, 'get', {
  code: 200,
  'data|1-10':[{
    'sid|+1':10011,
    'yearSemester':'2016~2017 第二学期',
    'majoy|1':['计算机','通信','电气','电子'],
    'cName|+1':['c语言','java','网站设计','计算机基础'],
    'time|+1':['周五3-5','周三3-5，周四8-10','周三3-5，周四8-10','周四8-10'],
    'tName|+1':'@NAME',
    'attendTotal|18-36':1,
    'normal': function () {
      return (this.attendTotal-this.late-this.truant-this.leave)
    },
    'late|0-5': 1,
    'truant|0-5': 1,
    'leave|0-5': 1,
  }]
});

//————————————————————————————————————————————————————————
// 随机生成文章数据
// 定义请求链接，类型，还有返回数据
// 获取每个课程每个学生的具体情况
Mock.mock(`${domain}/courseStuDatas`, 'post', {
  code: 200,
  'course|0-2': [{
    'c_id|+1': 2001,
    'c_name|+1': ["java", "c语言", "网站设计"],
    'times|1-2': [
      {
        'time|+1': ["周一 3-5", "周二 4-5", "周三 7-8", "周四 12-15", "周一 9-11"],
        'students|50-100': [
          {
            's_id|+1': 162011001,
            's_name': '@cname',
            'normal|1-18': 1,
            'late|0-5': 1,
            'truant|0-5': 1,
            'leave|0-5': 1,
            score: function () {
              return (100 - this.late * 2 - this.truant * 5)
            }
          }]
      }]
  }]
});


// 获取上课考勤总体情况，做图表用的
// 一个老师两门课，每门课有1-2个班，每门课每周可能1-2堂
//classes 老师可能会带几个班级
//每个班级都有id
Mock.mock(`${domain}/courseTotal/1.json`, 'get', {
  totalPages: 3,//总共分成3个请求
  code: 200,
  'classes|0-2': [
    // {  //顺序抽取哪堂课
    //   'class_id|+1': 20160101, //具体班级的id
    //   'course_name': 'java',
    //   'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
    //   'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
    //     {
    //       'actualNum': -1,
    //       'late|0-5': 1,
    //       'truant|0-5': 1,
    //       'leave|0-5': 1,
    //     }
    //   ],
    //   'total|50-100': 1  //该门课总上课人数
    // },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 90,
      'lateRatio': 6,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});

Mock.mock(`${domain}/courseTotal/2.json`, 'get', {
  totalPages: 3,//总共分成3个请求
  code: 200,
  'classes|2': [
    {  //顺序抽取哪堂课
      'class_id|+1': 20160101, //具体班级的id
      'course_name': 'java',
      'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
      'normalRatio': 89,
      'lateRatio': 7,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|50-100': 1  //该门课总上课人数
    },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 95,
      'lateRatio': 3,
      'truantlRatio': 2,
      'leavelRatio': 0,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});

Mock.mock(`${domain}/courseTotal/3.json`, 'get', {
  totalPages: 3, //总共分成3个请求
  code: 200,
  'classes|2': [
    {  //顺序抽取哪堂课
      'class_id|+1': 20160101, //具体班级的id
      'course_name': 'java',
      'course_time|+1': [['周二8-10', '周四8-10'], ['周一 8-10', '周三 8-10 ']],
      'normalRatio': 89,
      'lateRatio': 7,
      'truantlRatio': 2,
      'leavelRatio': 2,
      'times|32-36': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|50-100': 1  //该门课总上课人数
    },
    {
      'class_id|+1': 20160201, //具体班级的id
      'course_name': 'c语言',
      'course_time|+1': [['周二8-10'], ['周一 8-10']],
      'normalRatio': 70,
      'lateRatio': 15,
      'truantlRatio': 5,
      'leavelRatio': 5,
      'times|16-18': [  //该门课对应的周数，显示每一周的详细情况
        {
          'actualNum': -1,
          'late|0-5': 1,
          'truant|0-5': 1,
          'leave|0-5': 1,
        }
      ],
      'total|80-110': 1  //该门课总上课人数
    }
  ],
});


