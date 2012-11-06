# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.Slide.reopenClass
  slideOrder: [
    { templateName: 'what_is_ember', title: 'What is Ember?' }
    { templateName: 'why_ember', title: 'Why Ember?' }
    { templateName: 'code_samples', title: 'Code Samples' }
    { templateName: 'built_in_goodies', title: 'Built in Goodies' }
    { templateName: 'data_binding', title: 'Data Binding' }
    { templateName: 'class_bindings', title: 'Class Bindings' }
    { templateName: 'computed_properties', title: 'Computed Properties' }
    { templateName: 'all_togther_now', title: 'All Together Now' }
    { templateName: 'sane_class_syntax', title: 'Sane Class Syntax' }
    { templateName: 'super', title: 'Super' }
    { templateName: 'array_comprehensions', title: 'Array Comprehensions' }
    { templateName: 'array_of_objects_methods', title: 'Array of Objects Methods' }
    { templateName: 'attribute_bindings', title: 'Attribute Bindings' }
    { templateName: 'third_party_javascript', title: 'Third Party JavaScript' }
    { templateName: 'acknowledgements', title: 'Acknowledgements' }
  ]
