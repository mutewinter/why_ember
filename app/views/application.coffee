# Public: The view that encompasses the entire application, everything is
# rendered as a child of this view.
App.ApplicationView = Ember.View.extend
  templateName: 'templates/application'

  init: ->
    @_super()
    # Don't need to unbind this because the ApplicationView will never be
    # destroyed
    $(document).on('keyup', @documentKeyUp)

  documentKeyUp: (e) ->
    router = App.get('router')
    switch e.which
      when 37, 38 # Left, Up
        router.goToSlide router, App.get('previousSlide')
      when 32, 39, 40 # Space, Right, Down
        router.goToSlide router, App.get('nextSlide')
