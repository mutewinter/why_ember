# Public: The view to represent a single slide.
App.SlideView = Ember.View.extend
  templateName: 'templates/slide'
  contentBinding: 'controller.content'
