'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"', // https://cms.xiangbama.com http://xiangba.liuyishou.vip/server/index.php
  BASE_API: '"http://submit.reardatchina.com/server/index.php"',
  UPLOAD_API: '"http://submit.reardatchina.com/server/upload.php"'
})
