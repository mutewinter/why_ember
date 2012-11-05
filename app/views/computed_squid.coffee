# Public: The squid view, with some computed properties

# Since we extend SquidView, we must require it
require('views/squid')
App.ComputedSquidView = App.SquidView.extend

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
