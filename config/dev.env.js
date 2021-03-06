'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://39.105.80.32:8888/"',
  // BASE_API: '"http://localhost:8888"',
})
