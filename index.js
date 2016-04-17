'use strict'

var document = require('global/document')
var Loop = require('main-loop')
var virtualDom = require('virtual-dom')
var assert = require('assert')
var partial = require('ap').partial
var Delegator = require('dom-delegator')

// Instantiate a DOM delegator once, since it caches itself
Delegator()

exports.createComponent = createComponent

function createComponent (Component/* [data, [...renderArgs, [callback]]] */) {
  assert(Component, 'Component is required')
  if (arguments.length < 2) return partial(createComponent, Component)

  var args = Array.prototype.slice.call(arguments, 1)

  var callback = args.pop()
  var data = args.length ? args.shift() : undefined

  // Call the component constructor to get a new state
  var state = Component(data)

  // Add an element for later use
  var div = document.createElement('div')
  div.style.height = '100%'
  document.body.appendChild(div)

  // create a raf rendering loop and add the target element to the dom
  var loop = Loop(state(), render, virtualDom)
  div.appendChild(loop.target)
  // update the loop whenever the state changes
  state(loop.update)

  return callback(state, loop.target, destroy)

  function render (data) {
    return Component.render.apply(null, [data].concat(args))
  }

  function destroy () {
    // remove the element from the DOM
    document.body.removeChild(div)
  }
}
