<template>
  <div>
    <el-tabs v-model="projectStatus">
      <!-- <el-tab-pane label="通过项目" name="passed"> -->
      <el-tab-pane label="通过项目" name="1">
        <List @refreshData="getData" :forms="forms" :tables="tables"></List>
      </el-tab-pane>
      <!-- <el-tab-pane label="驳回项目" name="reject"> -->
      <el-tab-pane label="驳回项目" name="2">
        <List @refreshData="getData" :forms="forms" :tables="tables"></List>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import List from 'components/list/list.vue'
import IndexMixin from './index.mixin.js'
import axios from 'axios'
import qs from 'qs' // qs这个包在install  axios 时就已经装了，因为 qs 是 axios 的依赖包
axios.defaults.withCredentials = true // 带cookie请求
axios.defaults.timeout = 5000 //  请求的超时时间 5000ms
export default {
  name: 'project-approval',
  mixins: [IndexMixin],
  components: {
    List
  },
  data () {
    return {
      // projectStatus: 'passed'
      projectStatus: '1'
    }

  },
  watch : {
    'projectStatus':function(val) { //监听切换状态-计划单
      // console.log(val)
      this.getList()
    },
    "$route":{
      handler(route){
        const that=this
        if(route,name==='Report'){
          that.getList()
        }
      },
      deep:true
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      console.log(9999999999)
      this.tables.tableData=[];
      var url = '/api/Admin_Project/ProjectList';
      let json={
        pageNum: 1,
        pageSize: 10,
        Audit: this.projectStatus,
        Keywords: ''
        }
      this.$axios.post(url,json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData
        // this.$children[0].pager.total = response.data.TotalCount
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
      // error callback
      console.log(response.data.Msg);
      });
    },
    getData(searchForm,pager){
      this.tables.tableData=[];
      // console.log('查询')
      // console.log(searchForm.projectName)
      let json={
        pageNum: pager.pageNum,
        pageSize: pager.pageSize,
        Audit: this.projectStatus,
        Keywords: searchForm.projectName
      }
      var url = '/api/Admin_Project/ProjectList';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      console.log(response.data.ResultsData);
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData
        // this.$children[0].pager.total = response.data.TotalCount
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
      // error callback
      console.log(response.data);
      })
    },
    delProject(pid){
      console.log(pid)
      let json = {
        ProjectID:pid
      }
      // console.log(json)
      var url = '/api/Admin_Project/DeleteProject';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
        this.getList()//刷新数据
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
