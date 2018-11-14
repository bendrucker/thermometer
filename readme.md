# thermometer [![Build Status](https://travis-ci.org/bendrucker/thermometer.svg?branch=master)](https://travis-ci.org/bendrucker/thermometer) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/thermometer.svg)](https://greenkeeper.io/)

> Concisely test [Observable](https://github.com/raynos/observ) + [virtual-dom](https://github.com/matt-esch/virtual-dom) components

thermometer constructs your components, renders them to the DOM, and updates the DOM whenever your state changes. This allows you to test components that interact with the DOM, such as listening on events. For simple components, you can make assertions directly on the vtree. But for things like testing DOM events (e.g. clicking a button), you'll need a DOM. In the browser, thermometer relies on the real DOM. In Node, it will use [min-document](https://github.com/raynos/min-document), allowing you to test most DOM interactions without a browser.

It will also instantiate [dom-delegator](https://github.com/raynos/dom-delegator) for you. This behavior depends on deduping your modules and works best with npm 3.

## Install

```
$ npm install --save virtual-dom@~2.0.0 dom-delegator
$ npm install --save-dev thermometer
```


## Usage

See the [tests](test.js) and the [sample component](component.js) for a full example.

## API

#### `thermometer.createComponent(Component, data, callback)` -> `undefined` / `function`

When a callback is omitted, a partially applied function will be returned for the Component.

##### Component

*Required*  
Type: `function`

A component constructor which is expected to return an observable state. It should also have a `Component.render` function that returns a vtree from [virtual-dom](https://github.com/matt-esch/virtual-dom).

##### data

Type: `object`  
Default: `undefined`

Initial data to pass to the component.

##### callback

Type: `function`  
Arguments: `state, element, done`

###### state

Type: `function`

The observable state returned by `Component`

###### element

Type: [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

The component's element in the DOM.

###### done

Type: `function`

A function that will remove the `element` from the DOM.


## License

MIT © [Ben Drucker](http://bendrucker.me)
