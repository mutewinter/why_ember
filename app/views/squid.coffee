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

  # Internal: Observes all of the properties that affect the css of this view.
  # When the properties change, we simply update the
  cssPropertiesChanged: (->
    @$().css(
      left: @get('x')
      top: @get('y')
      'background-color': @getWithDefault('backgroundColor', )
    )

    @$('img').css(
      width: @get('imageWidth')
      height: @get('imageHeight')
    )
  ).observes('x', 'y', 'imageWidth', 'imageHeight', 'backgroundColor')
