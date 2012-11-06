# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.Slide.reopenClass
  slideOrder: [
    { templateName: 'what_is_ember', title: 'What is Ember?' }
    { templateName: 'why_ember', title: 'Why Ember?' }
    { templateName: 'code_samples', title: 'Code Samples' }
    { templateName: 'built_in_goodies', title: 'Built in Goodies' }
    { templateName: 'data_binding', title: 'Data Binding' }
    { templateName: 'computed_properties', title: 'Computed Properties' }
    { templateName: 'class_binding', title: 'Class Binding' }
    { templateName: 'attribute_binding', title: 'Attribute Binding' }
    { templateName: 'sane_class_syntax', title: 'Sane Class Syntax' }
    { templateName: 'super', title: 'Super' }
    { templateName: 'array_comprehensions', title: 'Array Comprehensions' }
    { templateName: 'array_of_objects_methods', title: 'Array of Objects Methods' }
    { templateName: 'third_party_javascript', title: 'Third Party JavaScript' }
    { templateName: 'acknowledgements', title: 'Acknowledgements' }
  ]
