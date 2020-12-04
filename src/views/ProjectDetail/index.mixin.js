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
        projectInfo: [
          {
            elemType: 'input',
            prop: 'ProjectName',
            label: '项目名称',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'RealName',
            label: '项目负责人',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'AdminIstrator',
            label: '项目管理员人数',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'TotalNumber',
            label: '项目总人数',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'ConstructionUnit',
            label: '建设单位',
            ...layOut,
            disabled: true
          }, {
            elemType: 'input',
            prop: 'ProjectLocation',
            ...layOut,
            label: '地址',
            disabled: true
          }, {
            elemType: 'input',
            prop: 'Score',
            ...layOut,
            label: '项目评分',
            disabled: true
          }, {
            elemType: 'render',
            prop: 'permitpicture',
            ...layOut,
            label: '项目照片',
            render: (h, formData) => {
              var permitpicture = formData.permitpicture || []
              permitpicture = permitpicture.map(e => (
                <li><img src={e} height='100%' /></li>
              ))
              return <ul class="img-list">{permitpicture}</ul>
            }
          }, {
            elemType: 'render',
            prop: 'handlerCount',
            ...layOut,
            label: ' 操作',
            render: (h, formData) => {
              return <el-button size="small" type="danger"
              onClick={() => {
                    this.delProject(formData.ID)
                  }}>删除</el-button>
            }
          }
        ],
        projectAdmin: [
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
            render: (h, params) => {
              return <el-button type="text"
              onClick={() => {
                    this.delprojectAdmin(params.row.id)
                  }}>删除</el-button>
            }
          }
        ],
        group: [
          {
            label: '班组名称',
            prop: 'name'
          }, {
            label: '班组负责人',
            prop: 'realname'
          }, {
            label: '总人数',
            prop: 'Number'
          }, {
            label: '操作',
            render: (h, params) => {
              return <div>
                <el-button type="text" onClick={() => {
                  this.$router.push({
                    path: '/group-detail',
                      query: {
                        id:params.row.id,
                        }
                  })
                }}>查看</el-button>
                <el-button type="text"
              onClick={() => {
                    this.delTeam(params.row.id)
                  }}>删除</el-button>
              </div>
            }
          }
        ],
        enclosure: [
          {
            elemType: 'input',
            prop: 'ProjectName',
            label: '项目名称'
          }
        ],
      },
      formDataMap: {
        projectInfo: { },
        projectAdmin: [],
        group: [],
        enclosure: {}
      }

    }
  }
}
