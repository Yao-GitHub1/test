<template>
  <div class="projectDetail">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name">
        <component :is="tab.name" v-bind="attrs" v-if="activeName === tab.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import IndexMixin from './index.mixin.js'
import projectInfo from './components/projectInfo'
import projectAdmin from './components/projectAdmin'
import group from './components/group'
import enclosure from './components/enclosure'
import Track from './components/track'
import axios from 'axios'
import qs from 'qs' // qs这个包在install  axios 时就已经装了，因为 qs 是 axios 的依赖包
axios.defaults.withCredentials = true // 带cookie请求
axios.defaults.timeout = 5000 //  请求的超时时间 5000ms
export default {
  name: 'projectDetail',
  mixins: [IndexMixin],
  components: {
    projectInfo,
    projectAdmin,
    group,
    enclosure,
    Track
  },
  data () {
    return {
      activeName: 'projectInfo',
      attrs: {},
      tabs: [
        {
          label: '项目信息',
          name: 'projectInfo'
        }, {
          label: '项目管理员',
          name: 'projectAdmin'
        }, {
          label: '班组',
          name: 'group'
        }, {
          label: '项目围栏',
          name: 'enclosure'
        }, {
          label: '轨迹回放',
          name: 'Track'
        }
      ]
    }
  },
  watch: {
    activeName: {
      handler (val) {
        val === 'projectInfo' && (
          this.attrs = {
            formModel: this.formModelMap[val],
            formData: this.formDataMap[val]
          },
          this.getProjectInfo()
        )
        val === 'projectAdmin' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.projectAdmin()
        )
        val === 'group' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.ProjectTeam()
        )
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // this.projectInfo()
  },
  methods: {
    getProjectInfo () {//获取项目信息
      // console.log(this.$route.query.id)
      var pid=this.$route.query.id//获取传送的参数
      let json={
        ProjectID: pid
      }
      var url = '/api/Admin_Project/ProjectInfo';
      this.$axios.post(url, json, { emulateJSON: true,withCredentials:false }).then(response => {
      // console.log(response.data);
      if(response.data.Code==200){
        this.formDataMap.projectInfo=response.data.ResultsData
        // console.log(this.formDataMap.projectInfo);
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
      // error callback
      console.log(response.StatusCode);
      });
    },
    delProject(pid){//删除项目
      // var pid=this.$route.query.id
      // console.log(pid)
      let json = {
        ProjectID:pid
      }
      // console.log(json)
      var url = '/api/Admin_Project/DeleteProject';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
        this.$router.push("/all-approval")
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
        console.log(response);
      })
    },

    projectAdmin () {//获取项目管理员
        this.formDataMap.projectAdmin=[];
      var pid=this.$route.query.id//获取传送的参数
      let json={pageNum: 1, pageSize: 10, ProjectID: pid }
      var url = '/api/Admin_Project/ProjectAdmin';
      this.$axios.post(url, json, { emulateJSON: true,withCredentials:false }).then(response => {
      console.log(response.data);
      if(response.data.Code==200){
        console.log(this.formDataMap.projectAdmin);
        // console.log(response.data.ResultsData);
        this.formDataMap.projectAdmin=response.data.ResultsData
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
      // error callback
      console.log(response.StatusCode);
      });
    },
    delprojectAdmin(tid){//删除项目管理员（班组人员）
      console.log(tid)
      let json = { id:tid }
      // console.log(json)
      var url = '/api/Admin_Project/DeleteprojectAdmin';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
        this.formDataMap.projectAdmin=[];
        this.projectAdmin()//重新加载接口
      }
      else
        alert(response.data.Msg)
      }, response => {
        console.log(response);
      })
    },

    ProjectTeam () {//获取项目班组
      this.formDataMap.group=[];
      var pid=this.$route.query.id//获取传送的参数
      let json={pageNum: 1, pageSize: 10, ProjectID: pid }
      var url = '/api/Admin_Project/ProjectTeam';
      this.$axios.post(url, json, { emulateJSON: true,withCredentials:false }).then(response => {
      console.log(response.data);
      if(response.data.Code==200){
        console.log(response.data.ResultsData);
        this.formDataMap.group=response.data.ResultsData
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
      // error callback
      console.log(response.StatusCode);
      });
    },
    delTeam(tid){//删除班组
      console.log(tid)
      let json = { id:tid }
      // console.log(json)
      var url = '/api/Admin_Project/DeleteTeam';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
        this.formDataMap.projectAdmin=[];
        this.ProjectTeam()//重新加载接口
      }
      else
        alert(response.data.Msg)
      }, response => {
        console.log(response);
      })
    }


  }
}
</script>
<style lang="less">
.img-list{
  li{
    width: 60px;
    height: 60px;
    overflow: hidden;
    float: left;
    margin-right: 10px;
    img{
      height: 100%;
    }
  }
}
.projectDetail{
  height: 100%;
  .el-tabs{
    height: 100%;
  }
  .el-tabs__content{
    height: calc(100% - 50px);
    >div{
      height: 100%;
    }
  }
}
</style>
