# Public: View that contains a CodeMirror view and an accompanying status bar.
App.CodeEditorAndStatusBarView = Ember.ContainerView.extend
  classNames: 'code-and-status-bar'
  classNameBindings: 'codeView.isFocused:focused codeView.language
    noToolbar'.w()

  init: ->
    @_super()

    @addAndSaveView(App.CodeView.create(
      template: @get('template')
      language: @get('language')
      height: @get('height')
    ), 'codeView')

    return if @get('noToolbar')
    @addAndSaveView(App.CodeToolbarView.create(
      codeView: @get('codeView')), 'toolbarView')

  # Internal: Push the view on the childViews stack and save it locally with
  # the given name.
  #
  # view - An instantied Ember.View subclass.
  # name - A string name to store the view under.
  #
  # Returns the view object.
  addAndSaveView: (view, name) ->
    @set name, view
    @get('childViews').pushObject view
    view
