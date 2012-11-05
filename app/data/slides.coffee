# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.Slide.reopenClass
  slideOrder: [
    { templateName: 'why_ember', title: 'Why Ember?' }
    { templateName: 'code_samples', title: 'Code Samples' }
    { templateName: 'data_binding', title: 'Data Binding' }
    { templateName: 'computed_properties', title: 'Computed Properties' }
    { templateName: 'eliminates_dependancies', title: 'Eliminates Dependancies' }
    { templateName: 'sane_class_syntax', title: 'Sane Class Syntax' }
    { templateName: 'super', title: 'Super' }
    { templateName: 'class_bindings', title: 'Class Bindings' }
    { templateName: 'attribute_bindings', title: 'Attribute Bindings' }
    { templateName: 'third_party_javascript', title: 'Third Party JavaScript' }
    { templateName: 'acknowledgements', title: 'Acknowledgements' }
  ]
