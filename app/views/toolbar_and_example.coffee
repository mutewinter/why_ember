App.ToolbarAndExampleView = Ember.ContainerView.extend
  init: ->
    @_super()

    @addAndSaveView(App.CodeToolbarView.create(
      codeView: @get('codeView')), 'toolbarView')

    return unless @get('exampleViewClassName')

    exampleViewClass = Ember.get(@get('exampleViewClassName'))
    @addAndSaveView(exampleViewClass.create(), 'exampleView')
    @get('codeView').set('exampleView', @get('exampleView'))

  # Internal: Push the view on the childViews stack and save it locally with
  # the given name.
  #
  # Returns the view object.
  addAndSaveView: (view, name) ->
    @set name, view
    @get('childViews').pushObject view
    view
