# Public: A Handlebars helper that renders a code view, with the content of the
# template and a set of buttons immediately following.
Handlebars.registerHelper 'code', (options) ->
  Ember.Handlebars.helpers.view.call(this, 'App.CodeAndExampleView', options)
