fs   = require 'fs'
path = require 'path'

# See docs at http://brunch.readthedocs.org/en/latest/config.html.

exports.config =

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

      order:
        before: [
          'vendor/scripts/console-helper.js'
          'vendor/scripts/jquery-1.8.2.js'
          'vendor/scripts/handlebars-1.0.0.beta.6.js'
          'vendor/scripts/ember-latest.js'
          'vendor/scripts/coffee-script.js'
          'vendor/scripts/codemirror.js'
          'vendor/scripts/codemirror-coffeescript.js'
          'vendor/scripts/codemirror-javascript.js'
          'vendor/scripts/codemirror-css.js'
          'vendor/scripts/jquery.timeago.js'
        ]

    stylesheets:
      defaultExtension: 'css'
      joinTo: 'stylesheets/app.css'
      order:
        before: ['vendor/styles/normalize.css']

    templates:
      precompile: true
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js' : /^app/

  modules:
    wrapper: (path, data) ->
      """
window.require.define({#{path}: function(exports, require, module) {
  #{data}
}});
window.moduleNames.push(#{path});
\n\n
      """

  server:
    port: 3333
    base: '/'
    run: no
