App.ToolbarAndSquidView = Ember.ContainerView.extend
  init: ->
    @_super()

    @addAndSaveView(App.CodeToolbarView.create(
      codeView: @get('codeView')), 'toolbarView')

    @addAndSaveView(App.SquidView.create(), 'squidView')

    @get('codeView').set('squidView', @get('squidView'))

  # Internal: Push the view on the childViews stack and save it locally with
  # the given name.
  #
  # Returns the view object.
  addAndSaveView: (view, name) ->
    @set name, view
    @get('childViews').pushObject view
    view
