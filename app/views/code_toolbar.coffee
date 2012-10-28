App.CodeToolbarView = Ember.View.extend
  templateName: 'templates/code_toolbar'
  classNames: 'code-toolbar'
  classNameBindings: 'isFocused:focused'.w()

  # Public: Switch the language of the cooresponding code view.
  #
  # Returns nothing.
  switchLanguage: ->
    @get('codeView').switchLanguage()

  # -------------------
  # Computed Properties
  # -------------------

  isCoffeeScriptBinding: 'codeView.isCoffeeScript'
  isJavaScriptBinding: 'codeView.isJavaScript'
  isFocusedBinding: 'codeView.isFocused'

  errorMessage: (->
    if @get('hasError')
      @get('codeView.lastError')
    else
      '&nbsp;'
  ).property('codeView.lastError')

  # Public: Bound to the code view's last error string. If it exists, it has an
  # error.
  hasError: (->
    !!@get('codeView.lastError')
  ).property('codeView.lastError')

  switchText: (->
    if @get('hasError')
      'Fix Error'
    else if @get('codeView.isCoffeeScript')
      'View as JavaScript'
    else
      'Back to CoffeeScript'
  ).property('codeView.language', 'hasError')
