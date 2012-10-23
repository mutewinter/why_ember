# Public: A minature preview of the slide.
App.SlidePreviewView = Ember.View.extend
  classNames: 'slide preview'.w()
  classNameBindings: 'content.isLastShownSlide:flash'

  templateNameBinding: 'content.templateName'
