# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.Slide.reopenClass
  slideOrder: [
    'why_ember'
    'eliminates_dependancies'
    'sane_class_syntax'
    'super'
    'automatically_updating_templates'
    'computed_properties'
    'class_bindings'
    'attribute_bindings'
    'third_party_javascript'
  ]
