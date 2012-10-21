App = require("app")
App.Router = Ember.Router.extend
  enableLogging: true

  root: Ember.Route.extend
    index: Ember.Route.extend
      route: "/"
      redirectsTo: "home"

    home: Ember.Route.extend
      route: "/home"
      connectOutlets: (router, context) ->
        router.get("applicationController").connectOutlet "home"
