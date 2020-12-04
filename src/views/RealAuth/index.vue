<template>
  <div>
    <List @refreshData="getData" :forms="forms" :tables="tables"></List>
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
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let json={
        pageNum: 1,
        pageSize: 10,
        Name: '',
        Phone: ''
      }
      var url = '/api/Admin_User/RealNameInfoList';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      console.log(response.data.ResultsData);
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData
        this.$children[0].pager.total = response.data.TotalCount
      }
      else
        alert(response.data.Msg)
      }, response => {
      // error callback
      console.log(response.StatusCode);
      });
    },
    getData(searchForm,pager){
      // console.log('www',searchForm)
      // console.log('aaa',pager)
      let json={
        pageNum: pager.pageNum,
        pageSize: pager.pageSize,
        Name: searchForm.Name,
        Phone: searchForm.Phone
      }
      var url = '/api/Admin_User/RealNameInfoList';
      // var url = 'https://www.mingongtong.com:8089/api/Admin_Project/ProjectAuditList';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      console.log(response.data.ResultsData);
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData
        this.$children[0].pager.total = response.data.TotalCount
      }
      else
        alert(response.data.Msg)
      }, response => {
      // error callback
      console.log(response.data);
      });
    },
    audit(row,status){
      console.log(status)
      let json = {
        ProjectID:row.id,
        Audit:status
      }
      // console.log(json)
      var url = '/api/Admin_Project/Audit';
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
    },


  }
}
</script>
