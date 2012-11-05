# Public: A view containing code that should be made editable with CodeMirror.
ERROR_REGEX = /.*?Parse error on line (\d+): (.+)/

App.CodeView = Ember.View.extend
  classNames: 'code-view'

  # Defaults
  language: 'coffeescript'
  isCodeModified: false

  # ------------
  # Ember Events
  # ------------

  # Internal: Callback that is called when the element is in the DOM and we
  # are free to modify it with external JavaScript.
  #
  # Returns nothing.
  didInsertElement: ->
    # Trim the trailing and leading whitespace from the code before we draw it.
    code = $.trim @$().text()
    @$().text('')
    @set('starterCode', code)

    codeMirrorOptions =
      lineNumbers: true
      mode: @get('language')
      value: code
      onKeyEvent: (editor, rawEvent) =>
        # Keep this event from triggering a slide change.
        jQuery.Event(rawEvent).stopPropagation()
      onChange: =>
        if @get('isCoffeeScript')
          @runCode()

          if @code() != @get('starterCode')
            @set('isCodeModified', true)
          else
            @set('isCodeModified', false)
      onFocus: => @set('isFocused', true)
      onBlur: => @set('isFocused', false)

    editor = CodeMirror((element) =>
      @$().append(element)
    , codeMirrorOptions)
    @set('editor', editor)
    @changeEditorMode(@get('language'))

    if @get('height')?
      @setEditorHeight(@get('height'))
    else
      @fixEditorHeight()

    @runCode()

  # ---------------
  # Code Conversion
  # ---------------

  compileJavaScript: ->
    code = @code()
    return @get('compiledJavaScript') if @get('coffeeScriptCode') == code

    # Save the CoffeeScript so we can swith back to it later.
    @set('coffeeScriptCode', code)

    try
      compiledJavaScript = CoffeeScript.compile(code, bare: on)
      @clearError()
    catch error
      @clearError()
      @displayError(error.message)

    @set('compiledJavaScript', compiledJavaScript)

    compiledJavaScript

  # Internal: Clear the error message since we compiled successfully.
  #
  # Returns nothing.
  clearError: ->
    @set('lastError', null)

    if highlightedLine = @get('highlightedLine')
      @get('editor').setLineClass(highlightedLine, null, null)

  # Internal: Display a CoffeeScript compilation error message.
  #
  # Returns nothing.
  displayError: (message) ->
    editor = @get('editor')

    if matches = message.match(ERROR_REGEX)
      lineNumber = parseInt(matches[1])
      error = matches[2]
      highlightedLine = editor.setLineClass(lineNumber - 1, 'error', 'error')
      @set('highlightedLine', highlightedLine)

    @set('lastError', message)

  # Public: Switch the language of the code shown in the editor.
  #
  # Returns nothing.
  switchLanguage: ->
    if @get('isJavaScript')
      @setCode(@get('coffeeScriptCode'))
      @set('language', 'coffeescript')
    else if @get('isCoffeeScript')
      javaScriptCode = @compileJavaScript()
      if javaScriptCode? and !@get('hasError')
        @set('language', 'javascript')
        @setCode(javaScriptCode)

  # Public: Resets the code example back to what it was when the slide first
  # loaded.
  resetCode: ->
    @setCode(@get('starterCode'))

  # ---------------
  # Code Evaluation
  # ---------------

  runCode: (code) ->
    return unless @get('isCoffeeScript')
    @evalJavaScript(@compileJavaScript())

  # Eval the compiled js.
  evalJavaScript: (code) ->
    try

      if @get('exampleView')?
        exportedVariables = @get('exampleView.exportedVariables')
      else
        exportedVariables = []

      # Make an array of the values of the exported variables to later pass
      # as arguments to the anonymous function.
      variableValues = exportedVariables.map (variable) =>
        @get("exampleView.#{variable}")

      @get('exampleView')?.willRunCode()

      if App.get('config.safeMode')
        fn = (new Function(exportedVariables...,'window', "#{code}"))
      else
        fn = (new Function(exportedVariables...,"#{code}"))

      # We setup the arguments to the function above, now we pass the values
      # for those arguments in as arguments to make them live within the
      # anonymous function.
      fn(variableValues...)
    catch error
      @clearError()
      @displayError(error.message)
    finally
      @get('exampleView')?.didRunCode()

  observeLanguage: (->
    @changeEditorMode(@get('language'))
  ).observes('language')

  changeEditorMode: (language) ->
    editor = @get('editor')
    editor.setOption('mode', language)

    if language is 'javascript'
      editor.setOption('readOnly', true)
    else
      editor.setOption('readOnly', false)

  # -------
  # Helpers
  # -------

  code: -> @get('editor').getValue()
  setCode: (code) -> @get('editor').setValue($.trim code)

  # Internal: Set the height of the editor and its scroller element.
  #
  # Returns nothing.
  setEditorHeight: (height) ->
    editor = @get('editor')
    $scroller = $(editor.getScrollerElement())
    $scroller.height(height)
    $wrapper = $(editor.getWrapperElement())
    $wrapper.height(height)

  # Internal: Fixes the editor's height to its current value.
  #
  # Returns nothing.
  fixEditorHeight: ->
    @setEditorHeight $(@get('editor').getScrollerElement()).height()

  # -------------------
  # Computed Properties
  # -------------------

  exportedVariablesBinding: 'exampleView.exportedVariables'

  isJavaScript: (->
    @get('language') == 'javascript'
  ).property('language')

  isCoffeeScript: (->
    @get('language') == 'coffeescript'
  ).property('language')

  # Public: We are in the error state if we haven't cleared the last error.
  hasError: (->
    !!@get('lastError')
  ).property('lastError')
