# Public: The slide objects are loaded on the App object so they can be queried
# globally.
App.set 'slides', [
  App.Slide.create slideName: 'why_ember'
  App.Slide.create slideName: 'automatically_updating_templates'
  App.Slide.create slideName: 'computed_properties'
  App.Slide.create slideName: 'class_bindings'
  App.Slide.create slideName: 'attribute_bindings'
  App.Slide.create slideName: 'third_party_javascript'
]
