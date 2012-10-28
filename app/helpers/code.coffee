# Public: A Handlebars helper that renders a code view, with the content of the
# template and a set of buttons immediately following.
Handlebars.registerHelper 'code', (options) ->
  noButtons = options.hash?.noButtons
  Ember.Handlebars.helpers.view.call(this, 'App.CodeView', options)

  # Don't draw the buttons view if the user doesn't want it.
  return if noButtons

  # The last item in the child views array for the parent will now be the
  # App.CodeView created on the line above.
  codeView = options.hash._parentView.get('childViews.lastObject')
  options.fn = null
  options.hash = {}
  # We pass the code view as a reference to the buttons view so it can directly
  # call actions on it.
  Ember.Handlebars.helpers.view.call(this, 'App.CodeToolbarView', options)
  options.hash._parentView.get('childViews.lastObject').set('codeView', codeView)

  # Note, without explicitly returning null we get errant <app.codebuttonsview>
  # tags.
  return null
