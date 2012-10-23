# Public: The content of the slide, headings, bullets, images, anything.
App.SlideContentView = Ember.View.extend
  tagName: 'section'
  classNames: 'slide'.w()

  templateNameBinding: 'content.templateName'
