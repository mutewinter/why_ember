# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.Slide.reopenClass
  slideOrder: [
    { templateName: 'what_is_ember', title: 'What is Ember?' }
    { templateName: 'why_ember', title: 'Why Ember?' }
    { templateName: 'code_samples', title: 'Code Samples' }
    { templateName: 'follow_along', title: 'Follow Along' }
    { templateName: 'built_in_goodies', title: 'Built in Goodies' }
    { templateName: 'array_comprehensions', title: 'Array Comprehensions' }
    { templateName: 'array_of_objects_methods', title: 'Array of Objects Methods' }
    { templateName: 'data_binding', title: 'Data Binding' }
    { templateName: 'computed_properties', title: 'Computed Properties' }
    { templateName: 'sane_class_syntax', title: 'Sane Class Syntax' }
    { templateName: 'class_binding', title: 'Class Binding' }
    { templateName: 'attribute_binding', title: 'Attribute Binding' }
    { templateName: 'super', title: 'Super' }
    { templateName: 'third_party_javascript', title: 'Third Party JavaScript' }
    { templateName: 'and_finally', title: 'And Finally' }
    { templateName: 'acknowledgements', title: 'Acknowledgements' }
  ]
