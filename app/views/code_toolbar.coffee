App.CodeToolbarView = Ember.View.extend
  templateName: 'templates/code_toolbar'
  classNames: 'code-toolbar'

  switchLanguage: ->
    @get('codeView').switchLanguage()

  isCoffeeScriptBinding: 'codeView.isCoffeeScript'
  isJavaScriptBinding: 'codeView.isJavaScript'
