# Public: Slide notes, hidden until the global showNotes flag is set to true.
App.NotesView = Ember.View.extend
  tagName: 'section'

  classNames: 'slide-notes'
  classNameBindings: 'shown'.w()

  shownBinding: 'App.config.showNotes'
