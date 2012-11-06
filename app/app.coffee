# Public: Declare the main application. and export it.
module.exports = Ember.Application.create
  firstSlide: (->
    @get('slides.firstObject')
  ).property('slides.@each')

  # Public: The next slide based on the index of this slide within the array of
  # slides.
  nextSlide: (->
    slides = @get('slides')
    slideIndex = slides.indexOf(@get('currentSlide'))
    slides.objectAt(slideIndex + 1)
  ).property('currentSlide')

  # Public: The previous slide based on the index of this slide within the
  # array of slides.
  previousSlide: (->
    slides = @get('slides')
    slideIndex = slides.indexOf(@get('currentSlide'))
    slides.objectAt(slideIndex - 1)
  ).property('currentSlide')

  # Public: The position of the slide in the slide deck.
  #
  # Returns the 1-indexed slide position.
  currentSlidePosition: (->
    currentSlide = @get 'currentSlide'
    return unless currentSlide
    slidePosition = @get('slides').indexOf(currentSlide) + 1
  ).property('currentSlide')

  customEvents:
    'touchend': 'click'

  init: ->
    @_super()
    jQuery.timeago.settings.refreshMillis = 1000
    jQuery.timeago.settings.strings.seconds = '%d seconds'

  # Public: We keep our application configuration in a neat little config
  # object.
  config: Ember.Object.create
    # Public: Safe mode hides dangerous variables from the user in the code
    # box.
    safeMode: true
    # Public: Hide slide notes by default.
    showNotes: true
