// 'use strict'
// module.exports = {
//   NODE_ENV: '"production"'
// }

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"https://www.mingongtong.com:8089/api"'   //线上接口请求前缀
})
