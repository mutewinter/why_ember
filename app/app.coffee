# Public: Declare the main application. and export it.
module.exports = Ember.Application.create
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

  slidePositionText: (->
    currentSlide = @get 'currentSlide'
    return unless currentSlide
    slidePosition = @get('slides').indexOf(currentSlide) + 1
    totalSlides = @get('slides.length')
    "#{slidePosition} / #{totalSlides}"
  ).property('currentSlide')
