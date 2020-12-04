export default {
  data () {
    return {
      forms: {
        formModel: [
          {
            elemType: 'input',
            prop: 'projectName',
            label: '',
            placeholder: '请输入关键字',
            labelWidth: '0px'
          }
        ],
        formData: {}
      },
      tables: {
        tableModel: [
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
            label: '申请时间',
            prop: 'createtime'
          }, {
            label: '操作',
            render: (h,params) => {
              return <div>
                {
                  this.projectStatus === '2' ? null//如果是驳回项目不显示《查看》
                  : <el-button type='text' onClick={() => {
                    this.$router.push({
                      path: '/project-detail',
                      query: {
                        id:params.row.id,
                        }
                    })
                  }}>查看</el-button>
                }
                <el-button type='text' onClick={() => {
                    this.delProject(params.row.id)
                  }}>删除</el-button>
              </div>
            }
          }
        ],
        // tableData: [{permitpicture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3216805947,683070568&fm=26&gp=0.jpg'}]
        tableData: []
      }
    }
  }
}
