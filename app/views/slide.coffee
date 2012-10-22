# Public: The view to represent a single slide.
App.SlideView = Ember.View.extend
  templateName: 'templates/slide'
  contentBinding: 'controller.content'

  slidePositionText: (->
    slidePosition = App.get('slides').indexOf(@get('content')) + 1
    totalSlides = App.get('slides.length')
    "#{slidePosition} / #{totalSlides}"
  ).property('content')
