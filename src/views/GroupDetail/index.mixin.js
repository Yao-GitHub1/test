const layOut = {
  xlSpan: 24,
  colSpan: 24,
  mdSpan: 24,
  smSpan: 24,
}
export default {
  data () {
    return {
      formModelMap: {
        groupInfo: [
          {
            elemType: 'input',
            prop: 'TeamName',
            label: '班组名称',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'RealName',
            label: '班组负责人',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'TeamAdminIstrator',
            label: '班组管理员人数',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'TeamTotalNumber',
            label: '班组民工人数',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'Score',
            ...layOut,
            label: '班组评分',
            disabled: true
          }, {
            elemType: 'render',
            prop: 'handlerCount',
            ...layOut,
            label: ' 操作',
            render: (h, formData) => {
              return <el-button size="small" type="danger"
              onClick={() => {
                    this.delTeam(formData.ID,formData.ProjectID)
                  }}>删除</el-button>
            }
          }
        ],
        groupAdmin: [
          {
            label: '姓名',
            prop: 'realname'
          }, {
            label: '职位',
            prop: 'rolename'
          }, {
            label: '工作内容',
            prop: 'worktodo'
          }, {
            label: '操作',
            render: (h, {row}) => {
              return <el-button type="text"
              onClick={() => {
                    this.delprojectAdmin(row.id,1)//1代表管理员
                  }}>删除</el-button>
            }
          }
        ],
        group: [
          {
            label: '姓名 ',
            prop: 'realname'
          },{
            label: '工种',
            prop: 'myposition'
          }, {
            label: '工作内容',
            prop: 'worktodo'
          },  {
            label: '操作',
            render: (h, {row}) => {
              return <div>
                <el-button type="text"
              onClick={() => {
                    this.delprojectAdmin(row.id,0)//0代表管民工
                  }}>删除</el-button>
              </div>
            }
          }
        ],
        enclosure: [
          {
            elemType: 'input',
            prop: 'name',
            label: '项目名称'
          }
        ],
        report: [
          {
            label: '姓名',
            prop: 'realname'
          }, {
            label: '身份',
            prop: 'Manager',
            render: (h, {row}) => {
              var Manager = (row.Manager===1)?'管理员':'民工';
              return <ul class="img-list">{Manager}</ul>
            }
          }, {
            label: '报告图片',
            prop: 'Picture',
            render: (h, {row}) => {
              var imgList = row.Picture || []
              imgList = imgList.map(e => (
                <li><img src={e} height="100%"/></li>
              ))
              return <ul class="img-list">{imgList}</ul>
            }
          }, {
            label: '文字描述',
            prop: 'content'
          }, {
            label: '操作',
            render: (h, {row}) => {
              return <div>
                <el-button type="text"
              onClick={() => {
                    this.delReport(row.id)
                  }}>删除</el-button>
              </div>
            }
          }
        ]
      },
      formDataMap: {
        groupInfo: {},
        groupAdmin: [],
        group: [],
        enclosure: {},
        report: []
      }

    }
  }
}
