require('views/examples/example')

# Public: The squid view, with some computed properties
App.LogView = App.ExampleView.extend
  classNames: 'log'
  classNameBindings: 'isExpanded:expanded'
  exportedFunctions: 'log'.w()
  templateName: 'templates/examples/log'
  isExpanded: false

  init: ->
    @_super()
    @set('logMessages', [])

  # Public: Log a message into the logger area.
  #
  # object - Any object or primitive type.
  #
  # Returns the object.
  log: (object) ->
    @get('logMessages').pushObject(@variableToString(object))
    object

  # Internal: Convert any type of variable to a string.
  #
  # variable - Anything, Objects, Strings, Arrays, even undefined.
  #
  # Returns the string.
  variableToString: (variable) ->
    emberType = Ember.typeOf(variable)
    if variable? and typeof variable is 'object' and
    (emberType is 'object' or emberType is 'instance')
      maxPairs = 4
      count = 0
      string = Ember.keys(variable).map((key) ->
        # Log a few of the Ember object's key value pairs.
        count++
        return if count > maxPairs
        if variable instanceof Ember.Object
          "#{key}: #{variable.get(key)}"
        else
          "#{key}: #{variable[key]}"
      ).join(', ')
      string += '...' if count > maxPairs
      string = "{#{string}}"
    else if emberType is 'array'
      string = "[#{variable}]"
    else if emberType is 'string'
      string = "\"#{variable}\""
    else if variable?
      # Just call toString
      string = variable.toString()
    else
      string = variable

    string

  willRunCode: ->
    @clearLog()

  clearLog: ->
    @get('logMessages').clear()

  # Public: Newline separated and log count prefixed log messages.
  logMessagesText: (->
    lineNumber = 0
    @get('logMessages').map((message) ->
      lineNumber++
      "#{lineNumber}> #{message}"
    ).join('\n')
  ).property('logMessages.@each')

  # ------------
  # User Actions
  # ------------
  expand: -> @toggleProperty('isExpanded')
