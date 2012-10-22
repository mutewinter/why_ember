# Public: Declare the main application. and export it.
module.exports = Ember.Application.create
  currentSlideBinding: 'router.slideController.content'

  nextSlide: (->
    slides = @get('slides')
    slideIndex = slides.indexOf(@get('currentSlide'))
    slides.objectAt(slideIndex + 1)
  ).property('currentSlide')

  previousSlide: (->
    slides = @get('slides')
    slideIndex = slides.indexOf(@get('currentSlide'))
    slides.objectAt(slideIndex - 1)
  ).property('currentSlide')
