export default {
  data () {
    return {
      forms: {
        formModel: [
          {
            elemType: 'input',
            prop: 'Name',
            label: '姓名'
          }, {
            elemType: 'input',
            prop: 'Phone',
            label: '手机号码'
          }
        ],
        formData: {}
      },
      tables: {
        tableModel: [
          {
            label: '姓名',
            prop: 'Name'
          }, {
            label: '手机号',
            prop: 'Phone'
          }, {
            label: '身份证号码',
            prop: 'IDCardno',
          }, {
            label: '身份证照',
            prop: 'PhotoPath',
            render: (h, {row}) => {
              var imgList = row.PhotoPath || []
              imgList = imgList.map(e => (
                <li><img src={e} height="30"/></li>
              ))
              return <ul class="img-list">{imgList}</ul>
            }

            // render: (h, params) => {
            //   var row = params.row || []
            //   return row.PhotoPath ? <img src={row.PhotoPath} height="30"/> : null
            // }
          }, {
            label: '认证时间',
            prop: 'CertificationTime'
          }, {
            label: '操作',
            // render: () => {
            //   return <div>
            //     <el-button type='text'>删除</el-button>
            //   </div>
            // }
          }
        ],
        tableData: []
      }
    }
  }
}
