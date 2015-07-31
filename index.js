'use strict'

var document = require('global/document')
var Loop = require('main-loop')
var virtualDom = require('virtual-dom')
var assert = require('assert')
var partial = require('ap').partial

exports.createComponent = createComponent

function createComponent (Component, callback) {
  assert(Component, 'Component is required')
  if (arguments.length < 2) return partial(createComponent, Component)

  // Call the component constructor to get a new state
  var state = Component()

  // Add an element for later use
  var div = document.createElement('div')
  document.body.appendChild(div)

  // create a raf rendering loop and add the target element to the dom
  var loop = Loop(state(), Component.render, virtualDom)
  div.appendChild(loop.target)
  // update the loop whenever the state changes
  state(loop.update)

  return callback(state, loop.target, destroy)

  function destroy () {
    // remove the element from the DOM
    document.body.removeChild(div)
  }
}
