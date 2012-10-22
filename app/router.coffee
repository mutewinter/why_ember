# Public: The one and only Ember router. We move between all slide states here.
App = require('app')

App.Router = Ember.Router.extend
  # Logs transitions to the console
  enableLogging: true
  showSlide: Ember.Route.transitionTo('slides.show')

  root: Ember.Route.extend
    # Loading state, entered when there are promises returned by deserialize.
    loading: Ember.State.extend()

    index: Ember.Route.extend
      route: '/'
      redirectsTo: 'slides.index'

    slides: Ember.Route.extend
      route: '/slides'
      index: Ember.Route.extend
        route: '/'
        connectOutlets: (router) ->
          # Fetch all the slides and show them
          controller = router.get('applicationController')
          controller.connectOutlet 'slides', App.get('slides')

      show: Ember.Route.extend
        nextSlide: (router) ->
          router.transitionTo 'show', App.get('nextSlide')

        previousSlide: (router) ->
          router.transitionTo 'show', App.get('previousSlide')

        route: '/:slug'
        serialize: (router, slide) ->
          if slide
            slug: slide.get('slug')
          else
            router.transitionTo 'slides.index'
            # Must return an empty slug to clear the URL
            slug: ''
        deserialize: (router, params) ->
          App.get('slides').findProperty('slug', params.slug)
        connectOutlets: (router, slide) ->
          controller = router.get('applicationController')
          controller.connectOutlet 'slide', slide
