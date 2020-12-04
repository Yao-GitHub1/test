export default {
  data () {
    return {
      forms: {
        formModel: [
          {
            elemType: 'input',
            prop: 'ordersheetno',
            label: '',
            placeholder: '请输入订单号',
            labelWidth: '0px'
          }
        ],
        formData: {}
      },
      tables: {
        tableModel: [
          {
            label: '订单号',
            prop: 'ordersheetno'
          }, {
            label: '商品名称',
            prop: 'name'
          }, {
            label: '商品数量',
            prop: 'number'
          }, {
            label: '商品价格',
            prop: 'finaltotal'
          }, {
            label: '收件人',
            prop: 'recipient'
          }, {
            label: '电话',
            prop: 'phone'
          }, {
            label: '地址',
            prop: 'address'
          }, {
            label: '下单时间',
            prop: 'ordertime'
          }, {
            label: '状态',
            prop: 'statusnow'
          }
          , {
            label: '操作',
            render: (h,params) => {
              return <div>
                {
                  params.row.statusnowkey === 'tobedelivered' ? //如果是待发货，显示发货操作
                   <el-button type='text' onClick={() => {
                    this.Send(params.row.id)
                  }}>发货</el-button>
                  :null//否则无显示
                }
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
