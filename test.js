'use strict'

var test = require('tape')
var document = require('global/document')
var raf = require('raf')
var thermo = require('./')
var Component = require('./component')

test(function (t) {
  t.plan(6)
  thermo.createComponent(Component, function (state, element, done) {
    t.deepEqual(state(), {heading: 'Hello World!'})

    t.equal(element.tagName, 'H1')
    t.equal(elements().length, 1)
    t.equal(elements()[0], element)

    state.set({heading: 'New Heading'})
    raf(function afterRender () {
      t.equal(element.childNodes[0].data, 'New Heading')
      done()
      t.notOk(elements().length)
    })

  })
})

test('partial application', function (t) {
  t.plan(2)
  var render = thermo.createComponent(Component)
  render(function (state, element, done) {
    t.equal(typeof state, 'function')
    t.equal(element.tagName, 'H1')
    done()
  })
})

test('initial state', function (t) {
  t.plan(1)
  var render = thermo.createComponent(Component)
  render({heading: 'Initial Heading'}, function (state, element, done) {
    t.equal(state().heading, 'Initial Heading')
    done()
  })
})

function elements () {
  return document.getElementsByClassName('component')
}
