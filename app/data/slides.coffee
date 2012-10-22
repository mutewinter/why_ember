# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App = require('app')

App.set 'slides', [
  App.Slide.create slideName: 'overview'
  App.Slide.create slideName: 'computed_properties'
  App.Slide.create slideName: 'class_bindings'
  App.Slide.create slideName: 'attribute_bindings'
  App.Slide.create slideName: 'jquery_integration'
]
