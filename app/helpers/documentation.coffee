# Public: A helper to insert a documentation link.
Handlebars.registerHelper 'documentation', (path) ->
  new Ember.Handlebars.SafeString(
    "<a class=\"doc-link\"
      href=\"http://emberjs.com/api/classes/#{path}\">DOCS</a>"
  )
