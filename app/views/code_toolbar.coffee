App.CodeToolbarView = Ember.View.extend
  templateName: 'templates/code_toolbar'
  classNames: 'code-toolbar'
  classNameBindings: 'isFocused:focused language'.w()

  # ------------
  # User Actions
  # ------------

  # Public: Switch the language of the cooresponding code view.
  #
  # Returns nothing.
  switchLanguage: ->
    @get('codeView').switchLanguage()

  resetCode: ->
    @get('codeView').resetCode()

  # -------------------
  # Computed Properties
  # -------------------

  languageBinding: 'codeView.language'
  isCoffeeScriptBinding: 'codeView.isCoffeeScript'
  isJavaScriptBinding: 'codeView.isJavaScript'
  isFocusedBinding: 'codeView.isFocused'
  isCodeModifiedBinding: 'codeView.isCodeModified'
  hasErrorBinding: 'codeView.hasError'
  exportedVariablesBinding: 'codeView.exportedVariables'

  message: (->
    if @get('exportedVariables')? and @get('exportedVariables.length')
      "Variables: #{@get('exportedVariables').join(',')}"
    else
      ''
  ).property('exportedVariables')

  errorMessage: (->
    if @get('hasError')
      @get('codeView.lastError')
    else
      '&nbsp;'
  ).property('codeView.lastError')

  switchText: (->
    if @get('hasError')
      'Fix Error'
    else if @get('codeView.isCoffeeScript')
      'View JavaScript'
    else
      'Edit CoffeeScript'
  ).property('codeView.language', 'hasError')

  # Public: Can only reset code in coffeescript mode when the code is changed.
  canResetCode: (->
    @get('isCodeModified') and @get('isCoffeeScript')
  ).property('isCodeModified', 'language')
