# Public: A container view to hold other views that are dynamically generated
# by the code example. We don't inherit from App.ExampleView because we need
# to be a sublcass fo Ember.ContainerView.
App.ExampleContainerView = Ember.ContainerView.extend
  classNames: 'example-container-view'

  exportedVariables: 'containerView'.w()
  exportedFunctions: []

  didRunCode: Ember.K
  willRunCode: ->
    @get('childViews').clear()

  containerView: (->
    this
  ).property()
