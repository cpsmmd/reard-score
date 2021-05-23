'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://submit.reardatchina.com/test/server/index.php"',
  BASE_API: '"http://reard.liuyishou.vip/Server/index.php"',
  UPLOAD_API: '"http://submit.reardatchina.com/server/upload.php"'
})
