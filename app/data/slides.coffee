# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App = require('app')

App.set 'slides', [
  App.Slide.create {name: 'First Slide'}
  App.Slide.create {name: 'Second Slide'}
  App.Slide.create {name: 'Third Slide'}
]
