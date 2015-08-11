'use strict'

// Mock Component for testing purposes

var Observ = require('observ')
var h = require('virtual-dom/h')

module.exports = Component

function Component (data) {
  data = data || {}
  return Observ({
    heading: data.heading || 'Hello World!'
  })
}

Component.render = function render (state) {
  return h('h1.component', state.heading)
}
