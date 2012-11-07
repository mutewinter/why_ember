# Public: The view to represent a single slide.
App.SlideView = Ember.View.extend
  classNames: 'slide'
  templateName: 'templates/slide'

  didInsertElement: ->
    # When we insert a preview element, listen to tap events on the parent,
    # then route to that slide. We do this because it's hard to listen to a
    # click and a tap event on a div element. It would work fine with an achor
    # tag, but we're use a div!
    if @get('preview')
      @$().parent().on('touchend', =>
        App.router.send('goToSlide', @get('content'))
      )

  willDestroyElement: ->
    @$().parent().off('touchend')

