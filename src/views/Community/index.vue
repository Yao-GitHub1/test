<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name">
        <iTable :tableModel="tables.tableModel" :tableData="tables.tableData" border></iTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import List from 'components/list/list.vue'
import IndexMixin from './index.mixin.js'
export default {
  name: 'order-approval',
  mixins: [IndexMixin],
  components: {
    List
  },
  data () {
    return {
      activeName: 'gongyouquan',
      tabs: [
        {
          label: '工友圈',
          name: 'gongyouquan'
        }, {
          label: '采购需求',
          name: 'caigou'
        }, {
          label: '招标招商',
          name: 'zhaobiao'
        }, {
          label: '招聘求职',
          name: 'zhaopin'
        }, // {
        //   label: '投诉信息',
        //   name: 'complaint'
        // }
      ]
    }
  },
  watch: {
    activeName: {
      handler (val) {
        // this.attrs = {
        //   formModel: this.tableModel[val],
        //   formData: this.tableData[val]
        // },
        this.getProjectInfo(val)
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // this.projectInfo()
  },
  methods: {
    getProjectInfo (val) {//获取数据
    // console.log(val);
      let json={
        pageNum: 1,
        pageSize: 100000,
        ArticleType: val,
        SearchContent: ''
      }
      var url = '/api/Admin_WorkersCircle/WorkmatesCircle';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      console.log(response.data);
      if(response.data.Code==200){
        this.tables.tableData=response.data.ResultsData
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
    delWorkmatesCircle(wid){//删除
      console.log(wid)
      let json = {
        ID:wid
      }
      var url = '/api/Admin_WorkersCircle/DeleteWorkmatesCircle';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
      }
      else{
        // alert(response.data.Msg)
        console.log(response.data)
      }
      }, response => {
        console.log(response);
      })
    }
  }

}
</script>
