window.App = require("app")
require "router"

# The order in which each module should be required.
folderOrder = 'models data templates controllers views'.w()

# Programatically require the modules in each sub-folder so we don't have to do
# it explicitly. This sort of defeats the purpose of AMD, but I don't care.
folderOrder.forEach (folder) ->
  # Go through the prefixes in order and rquire them
  window.moduleNames.filter((moduleName) ->
    new RegExp("^#{folder}").test(moduleName)
  ).forEach((matchingModule) -> require(matchingModule))

App.initialize()
