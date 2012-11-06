# Public: The model object that represents a single slide.
App.Slide = Ember.Object.extend
  # Public: Get the slug for this slide that will be used in the URL.
  slug: (->
    @get('templateName').dasherize()
  ).property('templateName')

  # Public: The full template name, including the folder path.
  templatePath: (->
    if @get('templateName')
      "templates/slides/#{@get('templateName')}"
  ).property('templateName')

  isLastShownSlide: (->
    this == App.get('lastShownSlide')
  ).property('App.lastShownSlide')
