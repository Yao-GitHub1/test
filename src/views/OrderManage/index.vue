<template>
  <div>
    <el-tabs v-model="orderStatus">
      <el-tab-pane label="所有订单" name="1">
        <List @refreshData="getData" :forms="forms" :tables="tables"></List>
      </el-tab-pane>
      <el-tab-pane label="未发货订单" name="tobedelivered">
        <List @refreshData="getData" :forms="forms" :tables="tables"></List>
      </el-tab-pane>
      <el-tab-pane label="已发货订单" name="goodstobereceived">
        <List @refreshData="getData" :forms="forms" :tables="tables"></List>
      </el-tab-pane>
      <el-tab-pane label="取消订单" name="toprocess">
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
  name: 'order-approval',
  mixins: [IndexMixin],
  components: {
    List
  },
  data () {
    return {
      orderStatus: '1'
    }
  },
  watch : {
    'orderStatus':function(val) { //监听切换状态-计划单
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
    getList () {//获取列表数据
      console.log(this.orderStatus)
      this.tables.tableData=[];
      var url = '/api/Admin_Order/OrderList';
      let json={
        pageNum: 1,
        pageSize: 10,
        ArticleType: this.orderStatus,
        SearchContent: ''
        }
      this.$axios.post(url,json, { emulateJSON: true }).then(response => {
      console.log(this.$children)
      console.log(this.$children[0])
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData.Data
        this.$children[0].pager.total = response.data.ResultsData.TotalCount
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
    getData(searchForm,pager){//搜索
      this.tables.tableData=[];
      let json={
        pageNum: pager.pageNum,
        pageSize: pager.pageSize,
        ArticleType: this.orderStatus,
        SearchContent: searchForm.ordersheetno
      }
      var url = '/api/Admin_Order/OrderList';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      if(response.data.Code==200){
        this.tables.tableData = response.data.ResultsData.Data
        this.$children[0].pager.total = response.data.ResultsData.TotalCount
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
    Send(oid){//发货
      // console.log(oid)
      let json = {
        id:oid,
        statusnow:'发货'
      }
      var url = '/api/Admin_Order/EditStatusnow';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        console.log(response.data);
      }
      else{
        console.log(response.data)
      }
      }, response => {
        console.log(response);
      })
    }

  }
}
</script>
