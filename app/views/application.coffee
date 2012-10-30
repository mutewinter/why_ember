# Public: The view that encompasses the entire application, everything is
# rendered as a child of this view.
App.ApplicationView = Ember.View.extend
  templateName: 'templates/application'
  classNames: 'application'
  classNameBindings: 'wiggleLeft wiggleRight'.w()

  init: ->
    @_super()
    # Don't need to unbind this because the ApplicationView will never be
    # destroyed
    $(document).on('keyup', @documentKeyUp.bind(this))

  # Public: Reset the state of the classes set on this view.
  resetClasses: ->
    @set('wiggleLeft', false)
    @set('wiggleRight', false)

  documentKeyUp: (e) ->
    # Don't try to advanced slides when on the home page.
    return unless App.get('currentSlide')

    router = App.get('router')
    switch e.which
      when 37, 38 # Left, Up
        if App.get('previousSlide')
          router.goToSlide router, App.get('previousSlide')
        else
          @set('wiggleLeft', true)
      when 32, 39, 40 # Space, Right, Down
        if App.get('nextSlide')
          router.goToSlide router, App.get('nextSlide')
        else
          @set('wiggleRight', true)
