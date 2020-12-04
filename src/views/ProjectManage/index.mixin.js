export default {
  data () {
    return {
      formModelMap: {
        passed: [
          {
            label: '项目名称',
            prop: 'projectname'
          }, {
            label: '负责人',
            prop: 'realname'
          }, {
            label: '项目照片',
            prop: 'permitpicture',
            render: (h, params) => {
              var row = params.row
              return row.permitpicture ? <img src={row.permitpicture} height="30"/> : null
            }
          }, {
            label: '建设单位',
            prop: 'ConstructionUnit'
          }, {
            label: '地址',
            prop: 'ProjectLocation'
          }, {
            label: '通过时间',
            prop: 'audittime	'
          }, {
            label: '操作',
            render: (h, params) => {
              return <div>
                <el-button type='text' onClick={() => {
                  this.$router.push({
                    path: '/project-detail',
                      query: {
                        id:params.row.id,
                        }
                  })
                }}>查看</el-button>
                {this.projectStatus === 'passed' ? <el-button type='text'>删除</el-button> : null}
              </div>
            }
          }
        ],
        approval: [
          {
            label: '项目名称',
            prop: 'projectname'
          }, {
            label: '负责人',
            prop: 'realname'
          }, {
            label: '项目照片',
            prop: 'permitpicture',
            render: (h, params) => {
              var row = params.row
              return row.permitpicture ? <img src={row.permitpicture} height="30"/> : null
            }
          }, {
            label: '建设单位',
            prop: 'ConstructionUnit'
          }, {
            label: '地址',
            prop: 'ProjectLocation',
          }, {
            label: '通过时间',
            prop: 'audittime	'
          }, {
            label: '操作',
            render: (h, params) => {
              return <div>
                <el-button type='text' onClick={() => {
                  this.$router.push({
                    path: '/project-detail',
                      query: {
                        id:params.row.id,
                        }
                  })
                }}>查看</el-button>
                {this.projectStatus === 'passed' ? <el-button type='text'>删除</el-button> : null}
              </div>
            }
          }
        ],

      },
      formDataMap: {
        passed: [],
        approval: [],
        create: {}
      }
    }
  }
}
