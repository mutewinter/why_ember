# Public: All templates must be loaded explicitly here so they are available
# when they are used by a view or another Handlebars template.

require 'templates/application'

require 'templates/slide'
require 'templates/slides'

App.get('slides').forEach (slide) ->
  require slide.get('templateName') if slide.get('templateName')
