# Public: A view containing code that should be made editable with CodeMirror.
App.CodeView = Ember.View.extend
  tagName: 'textarea'
  classNames: 'block'

  # Defaults
  language: 'coffeescript'

  # ------------
  # Ember Events
  # ------------

  didInsertElement: ->
    # Trim the trailing and leading whitespace from the code before we draw it.
    @$().val($.trim @$().val())

    editor = CodeMirror.fromTextArea(@get('element'),
      lineNumbers: true
      mode: @get('language')
      onKeyEvent: (editor, rawEvent) =>
        event = jQuery.Event(rawEvent)
        # We want to keep this event from triggering a slide change.
        event.stopPropagation()
    )
    @set('editor', editor)

    if @get('height')?
      @setEditorHeight(@get('height'))
    else
      @fixEditorHeight()

  willDestroyElement: ->
    console.log 'killing the element'

  # ---------------
  # Code Conversion
  # ---------------
  compileJavaScript: (code) ->
    try
      compiledJavaScript = CoffeeScript.compile code, bare: on
    catch error
      console.error error.message

    if compiledJavaScript
      @set('compiledJavaScript', compiledJavaScript)

    compiledJavaScript

  # Public: Switch the language of the compiled code.
  switchLanguage: ->
    if @get('isJavaScript')
      @setCode(@get('coffeeScriptCode'))
      @set('language', 'coffeescript')
    else if @get('isCoffeeScript')
      currentCode = @code()
      @set('coffeeScriptCode', currentCode)
      javaScriptCode = @compileJavaScript(currentCode)
      @setCode(javaScriptCode)
      @set('language', 'javascript')

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

  changeEditorMode: (->
    language = @get('language')
    editor = @get('editor')
    editor.setOption('mode', language)

    if language == 'javascript'
      editor.setOption('readOnly', true)
    else
      editor.setOption('readOnly', false)
  ).observes('language')

  # -------
  # Helpers
  # -------

  code: -> @get('editor').getValue()
  setCode: (code) -> @get('editor').setValue(code)

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
