# thermometer [![Build Status](https://travis-ci.org/bendrucker/thermometer.svg?branch=master)](https://travis-ci.org/bendrucker/thermometer)

> Concisely test [Observable](https://github.com/raynos/observ) + [virtual-dom](https://github.com/matt-esch/virtual-dom) components

thermometer constructs your components, renders them to the DOM, and updates the DOM whenever your state changes. This allows you to test components that interact with the DOM, such as listening on events. For simple components, you can make assertions directly on the vtree. But for things like testing DOM events (e.g. clicking a button), you'll need a DOM. In the browser,thermometer relies on the real DOM. In Node, it will use [min-document](https://github.com/raynos/min-document), allowing you to test most DOM interactions without a browser.


## Install

```
$ npm install --save thermometer
```


## Usage

See the [tests](/blob/master/tests.js) and the [sample component](/blob/master/component.js) for a full example.

## API

#### `thermometer.createComponent(Component, callback)` -> `undefined`

##### Component

*Required*  
Type: `function`

A component constructor which is expected to return an observable state. It should also have a `Component.render` function that returns a vtree from [virtual-dom](https://github.com/matt-esch/virtual-dom).

##### callback

*Required*  
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
