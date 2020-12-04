export default {
  data () {
    return {
      tables: {
        tableModel: [
          {
            label: '姓名',
            prop: 'realname'
          }, {
            label: '照片',
            prop: 'imgurl',
            render: (h, {row}) => {
              var imgList = row.imgurl || []
              imgList = imgList.map(e => (
                <li><img src={e} height="35ps"/></li>
              ))
              return <ul class="img-list">{imgList}</ul>
            }
          }, {
            label: '标题',
            prop: 'subject'
          }, {
            label: '内容',
            prop: 'content'
          }, {
            label: '时间',
            prop: 'createTime'
          }, {
            label: '操作',
            render: (h, {row}) => {
              return <div>
                <el-button type='text'
              onClick={() => {
                    this.delWorkmatesCircle(row.id)
                  }}>删除</el-button>
              </div>
            }
          }
        ],
        tableData: []
      }
    }
  }
}
