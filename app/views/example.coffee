# Public: A generic example view that defines default variables used in all
# example view.
App.ExampleView = Ember.View.extend
  # Public: Array of String variable names to export for the Code Editor to
  # play with.
  exportedVariables: []

  # Internal: Callback when the code is about to be run.
  willRunCode: Ember.K
  # Internal: Callback after the code has been run.
  didRunCode: Ember.K
