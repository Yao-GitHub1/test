<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name">
        <component :is="tab.name" v-bind="attrs" v-if="tab.name === activeName"></component>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import List from 'components/list/list.vue'
import IndexMixin from './index.mixin.js'
import passed from './components/passed.vue'
import approval from './components/approval.vue'
import create from './components/create.vue'
export default {
  name: 'project-approval',
  mixins: [IndexMixin],
  components: {
    List,
    passed,
    approval,
    create
  },
  watch: {
    activeName: {
      handler (val) {
        val === 'passed' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.getList(1)
        )
        val === 'approval' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.getList(0)
        )
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      attrs: {},
      activeName: 'passed',
      tabs: [
        {
          label: '已通过',
          name: 'passed'
        }, {
          label: '审核中',
          name: 'approval'
        }, {
          label: '申请创建',
          name: 'create'
        }
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
      getList (audit) {
        // console.log(9999999999)
          if(audit==1){
            this.formDataMap.passed = []
          }
          else if(audit==0){
            this.formDataMap.approval = []
          }
        var url = '/api/Admin_Project/ProjectList';
        let json={
          pageNum: 1,
          pageSize: 10,
          Audit: audit,
          Keywords: ''
          }
        this.$axios.post(url,json, { emulateJSON: true }).then(response => {
        if(response.data.Code==200){
          if(audit==1){
            this.formDataMap.passed = response.data.ResultsData
          }
          else if(audit==0){
            this.formDataMap.approval = response.data.ResultsData
          }
        }
        else{
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
<style lang="less">
.file-wrapper{
  li{
    width: 90px;
    height: 90px;
    border: 1px dashed #ddd;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    margin-right: 10px;
    i{
      font-size: 40px;
      color: #ddd;
    }
  }
}
</style>
