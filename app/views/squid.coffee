# Public: A view that holds the example squid to be modified by the CodeView.
App.SquidView = Ember.View.extend
  templateName: 'templates/squid'
  classNames: 'squid'

  # --------------
  # Default Values
  # --------------

  name: 'Default Squid'
  phylum: 'Boringpants'
  x: 0
  y: 0
  imageWidth: 100
  imageHeight: 100
  backgroundColor: 'transparent'

  # ---------
  # Observers
  # ---------

  # Internal: Observes all of the properties that affect the css of this view.
  # When the properties change, we simply update the
  cssPropertiesChanged: (->
    @$().css(
      left: @get('x')
      top: @get('y')
      'background-color': @get('backgroundColor')
    )

    @$('img').css(@get('imageSize'))
  ).observes('x', 'y', 'imageSize', 'backgroundColor')

  # -------------------
  # Computed Properties
  # -------------------

  # Public: Computed property for getting the width and height of the image.
  # Also a setter for the height and width at the same time.
  #
  # size - Integer value for the new width and height of the Squid image.
  #
  # Returns an object with the keys 'width' and 'height' set to their
  # appropriate values.
  imageSize: ((key, size) ->
    # Two arguments means the user passed a new size value.
    if arguments.length != 1
      @set('imageWidth', size)
      @set('imageHeight', size)

    width: @get('imageWidth')
    height: @get('imageHeight')
  ).property('imageWidth', 'imageHeight')
