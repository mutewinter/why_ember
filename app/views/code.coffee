# Public: A view containing code that should be made editable with CodeMirror.
ERROR_REGEX = /.*?Parse error on line (\d+): (.+)/

App.CodeView = Ember.View.extend
  # Defaults
  language: 'coffeescript'
  classNames: 'code-view'
  classNameBindings: 'noToolbar isFocused:focused language'.w()

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

    codeMirrorOptions =
      lineNumbers: true
      mode: @get('language')
      value: code
      onKeyEvent: (editor, rawEvent) =>
        # Keep this event from triggering a slide change.
        jQuery.Event(rawEvent).stopPropagation()
      onChange: => @compileJavaScript() if @get('isCoffeeScript')
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

  # ---------------
  # Code Conversion
  # ---------------

  compileJavaScript: (code) ->
    code = @code() unless code?
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
      javaScriptCode = @compileJavaScript(@code())
      if javaScriptCode?
        @set('language', 'javascript')
        @setCode(javaScriptCode)

  # ---------------
  # Code Evaluation
  # ---------------

  runCode: -> @evalJavaScript(@get('editor').getValue())

  # Eval the compiled js.
  evalJavaScript: (javaScriptCode) ->
    try
      fake = {}
      fn = (new Function( "(this) { #{javaScriptCode} }"))
      fn.call(fake)
      console.log fake
    catch error
      # TODO Show the error on the page, rather than throwing it.
      throw error

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

  isJavaScript: (->
    @get('language') == 'javascript'
  ).property('language')

  isCoffeeScript: (->
    @get('language') == 'coffeescript'
  ).property('language')
