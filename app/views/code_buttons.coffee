App.CodeButtonsView = Ember.View.extend
  templateName: 'templates/code_buttons'
  classNames: 'code-buttons'

  switchLanguage: ->
    @get('codeView').switchLanguage()

  isCoffeeScriptBinding: 'codeView.isCoffeeScript'
  isJavaScriptBinding: 'codeView.isJavaScript'
