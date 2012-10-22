App = require('app')
App.Slide = Ember.Object.extend
  # Public: Get the slug for this slide that will be used in the URL.
  slug: (->
    @get('name').dasherize()
  ).property('name')
