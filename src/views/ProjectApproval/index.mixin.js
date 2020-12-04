export default {
  data () {
    return {
      forms: {
        formModel: [
          {
            elemType: 'input',
            prop: 'projectName',
            label: '项目名称'
          }, {
            elemType: 'input',
            prop: 'handler',
            label: '负责人'
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
            // render: () => {
            //   return <div>
            //     <el-button type='text'>通过</el-button>
            //     <el-button type='text'>驳回</el-button>
            //   </div>
            // }
            render:(h,params)=>{
                return [h('el-button',{
                    attrs:{
                        type:'text'
                    },
                    on:{
                        click:()=>{
                          this.audit(params.row,1)
                        }
                    }
                },'通过'),
                h('el-button',{
                  attrs:{
                      type:'text'
                  },
                  on:{
                      click:()=>{
                        this.audit(params.row,2)
                      }
                  }
              },'驳回')]


            }
          }
        ],
        // tableData: [{permitpicture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3216805947,683070568&fm=26&gp=0.jpg'}]
      }
    }
  }

}
