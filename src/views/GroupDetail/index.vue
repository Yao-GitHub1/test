<template>
  <div class="projectDetail">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name">
        <component :is="tab.name" v-bind="attrs" v-if="activeName === tab.name"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import IndexMixin from './index.mixin.js'
import groupInfo from './components/projectInfo'
import groupAdmin from './components/projectAdmin'
import group from './components/group'
import enclosure from './components/enclosure'
import report from './components/report.vue'
export default {
  name: 'projectDetail',
  mixins: [IndexMixin],
  components: {
    groupInfo,
    groupAdmin,
    group,
    enclosure,
    report
  },
  data () {
    return {
      activeName: 'groupInfo',
      attrs: {},
      tabs: [
        {
          label: '班组',
          name: 'groupInfo'
        }, {
          label: '班组管理员',
          name: 'groupAdmin'
        }, {
          label: '民工',
          name: 'group'
        }, {
          label: '围栏',
          name: 'enclosure'
        } ,{
          label: '报告',
          name: 'report'
        }
      ]
    }
  },
  watch: {
    activeName: {
      handler (val) {
        val === 'groupInfo' && (
          this.attrs = {
            formModel: this.formModelMap[val],
            formData: this.formDataMap[val]
          },
          this.getTeamInfo()
        )
        val === 'groupAdmin' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.TeamMemberList(1)
        )
        val === 'group' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.TeamMemberList(0)
        )
         val === 'report' && (
          this.attrs = {
            tableModel: this.formModelMap[val],
            tableData: this.formDataMap[val]
          },
          this.TeamReport()
        )
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getTeamInfo () {//获取班组信息
      // console.log(this.$route.query.id)
      var tid=this.$route.query.id//获取传送的参数
      let json={
        TeamID: tid
      }
      var url = '/api/Admin_Team/TeamInfo';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      console.log(response.data.ResultsData);
      if(response.data.Code==200){
        this.formDataMap.groupInfo=response.data.ResultsData
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
    delTeam(tid,pid){//删除班组
      // console.log(pid)
      let json = { id:tid }
      var url = '/api/Admin_Project/DeleteTeam';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        console.log(response.data);
        this.$router.push("/project-detail?id="+pid)
      }
      else
        alert(response.data.Msg)
      }, response => {
        console.log(response);
      })
    },
    TeamMemberList (type) {//获取班组成员
        this.formDataMap.groupAdmin=[];
      var tid=this.$route.query.id//获取传送的参数
      // console.log(tid)
      let json={pageNum: 1, pageSize: 10, TeamID: tid,Type:type }
      var url = '/api/Admin_Team/TeamMemberList';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      // console.log(response.data);
      if(response.data.Code==200){
        // console.log(response.data.ResultsData);
        if(type===1)
          this.formDataMap.groupAdmin=response.data.ResultsData
        if(type===0)
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
    delprojectAdmin(tid,type){//删除项目管理员（班组人员）
      console.log(tid)
      let json = { id:tid }
      var url = '/api/Admin_Project/DeleteprojectAdmin';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        // alert(response.data.Msg)
        console.log(response.data);
        if(type==1){
          this.formDataMap.groupAdmin=[];
        }
        if(type==0){
          this.formDataMap.group=[];
        }
        this.TeamMemberList(type)//重新加载接口

      }
      else
        alert(response.data.Msg)
      }, response => {
        console.log(response);
      })
    },

    TeamReport() {//获取班组报告
      this.formDataMap.report=[];
      var tid=this.$route.query.id//获取传送的参数
      let json={pageNum: 1, pageSize: 10, TeamID: tid }
      var url = '/api/Admin_Team/TeamReport';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      console.log(response.data);
      if(response.data.Code==200){
        console.log(response.data.ResultsData);
        this.formDataMap.report=response.data.ResultsData
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
    delReport(rid){//删除报告
      console.log(rid)
      let json = { id:rid }
      var url = '/api/Admin_Team/DeleteReport';
      this.$axios.post(url, json, { emulateJSON: true }).then(response => {
      if(response.data.Code==200){
        console.log(response.data);
        this.formDataMap.report=[];
        this.TeamReport()//重新加载接口
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
td{
  li{
    width: 30px;
    height: 30px;
    overflow: hidden;
    float: left;
    margin-right: 10px;
    img{
      height: 100%;
    }
  }
}
</style>
