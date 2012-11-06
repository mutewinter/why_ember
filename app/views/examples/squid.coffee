require 'views/examples/example'

# Public: A view that holds the example squid to be modified by the CodeView.
App.SquidView = App.ExampleView.extend
  templateName: 'templates/examples/squid'
  classNames: 'squid'

  # Public: Variables exported for the Code Editor to play with.
  exportedVariables: 'squidView'.w()
  squidView: (-> this).property()

  # --------------
  # Default Values
  # --------------

  name: 'Derpy Squid'
  phylum: 'Cephaderp'
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
    # Note: We restrict values to < 1000 due to performance issues lager values
    # cause.
    @$().css(
      left: if @get('x') < 1000 then @get('x') else 1000
      top: if @get('y') < 1000 then @get('y') else 1000
      'background-color': @get('backgroundColor')
    )
    if @get('imageWidth') > 200 or @get('imageHeight') > 200
      @$().css(float: 'none')
    else
      @$().css(float: 'right')

    @$('img').css(
      width: if @get('imageWidth') < 1000 then @get('imageWidth') else 1000
      height: if @get('imageHeight') < 1000 then @get('imageHeight') else 1000
    )
  ).observes('x', 'y', 'imageWidth', 'imageHeight', 'backgroundColor', 'float')

  # Public: Set the image width and height to the same value.
  imageSize: (size) ->
    @set('imageWidth', size)
    @set('imageHeight', size)
