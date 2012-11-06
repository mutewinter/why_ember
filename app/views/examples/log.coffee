require('views/examples/example')

# Public: The squid view, with some computed properties
App.LogView = App.ExampleView.extend
  classNames: 'log'
  exportedFunctions: 'log'.w()
  templateName: 'templates/examples/log'

  init: ->
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
    if variable? and typeof variable is 'object' and
    Ember.typeOf(variable) is 'object'
      maxPairs = 3
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
    else if Ember.typeOf(variable) is 'array'
      string = "[#{variable}]"
    else if Ember.typeOf(variable) is 'string'
      string = "\"#{variable}\""
    else if variable?
      # Just call toString
      string = variable.toString()
    else
      string = variable

    string


  logMessagesText: (->
    lineNumber = 0
    @get('logMessages').map((message) ->
      lineNumber++
      "#{lineNumber}> #{message}"
    ).join('\n')
  ).property('logMessages.@each')

  willRunCode: ->
    @clearLog()

  clearLog: ->
    @get('logMessages').clear()
