# Public: The content of the slide that appears below the title.
App.SlideContentView = Ember.View.extend
  tagName: 'section'
  classNames: 'slide-content'
  templateNameBinding: 'content.templatePath'
  previewBinding: 'parentView.preview'
