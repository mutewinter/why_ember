# Public: The one and only Ember router. We move between all slide states here.
App.Router = Ember.Router.extend
  # Logs transitions to the console
  enableLogging: true

  goToSlide: Ember.Route.transitionTo('slides.show')
  goHome: Ember.Route.transitionTo('index')

  root: Ember.Route.extend
    # Loading state, entered when there are promises returned by deserialize.
    loading: Ember.State.extend()

    # /
    index: Ember.Route.extend
      route: '/'
      redirectsTo: 'slides.index'

    # /slides
    slides: Ember.Route.extend
      route: '/slides'
      index: Ember.Route.extend
        route: '/'
        connectOutlets: (router) ->
          # Fetch all the slides and show them
          controller = router.get('applicationController')
          controller.connectOutlet 'slides', App.get('slides')

      # /slides/:slug
      show: Ember.Route.extend
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
        exit: (router) ->
          App.set('lastShownSlide', App.get('currentSlide'))
          App.set('currentSlide', null)
        connectOutlets: (router, slide) ->
          controller = router.get('applicationController')
          App.set('currentSlide', slide)
          controller.connectOutlet 'slideContainer', slide
