App = require('app')
App.Slide = Ember.Object.extend
  # Public: Get the slug for this slide that will be used in the URL.
  slug: (->
    @get('slideName').dasherize()
  ).property('slideName')

  # Public: Make the slide name human friendly by titlecasing it.
  name: (->
    @get('slideName')
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (c) -> c.toUpperCase())
      .replace(/jquery/gi, 'jQuery')
  ).property('slideName')

  # Public: The full template name.
  templateName: (->
    if @get('slideName')
      "templates/slides/#{@get('slideName')}"
  ).property('templateName')

  isLastShownSlide: (->
    this == App.get('lastShownSlide')
  ).property('App.lastShownSlide')
