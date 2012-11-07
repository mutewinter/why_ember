(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"app": function(exports, require, module) {
  
module.exports = Ember.Application.create({
  firstSlide: (function() {
    return this.get('slides.firstObject');
  }).property('slides.@each'),
  nextSlide: (function() {
    var slideIndex, slides;
    slides = this.get('slides');
    slideIndex = slides.indexOf(this.get('currentSlide'));
    return slides.objectAt(slideIndex + 1);
  }).property('currentSlide'),
  previousSlide: (function() {
    var slideIndex, slides;
    slides = this.get('slides');
    slideIndex = slides.indexOf(this.get('currentSlide'));
    return slides.objectAt(slideIndex - 1);
  }).property('currentSlide'),
  currentSlidePosition: (function() {
    var currentSlide, slidePosition;
    currentSlide = this.get('currentSlide');
    if (!currentSlide) {
      return;
    }
    return slidePosition = this.get('slides').indexOf(currentSlide) + 1;
  }).property('currentSlide'),
  init: function() {
    this._super();
    jQuery.timeago.settings.refreshMillis = 1000;
    return jQuery.timeago.settings.strings.seconds = '%d seconds';
  },
  config: Ember.Object.create({
    safeMode: true,
    showNotes: true
  })
});

}});
window.moduleNames.push("app");


window.require.define({"controllers/application": function(exports, require, module) {
  
App.ApplicationController = Ember.Controller.extend();

}});
window.moduleNames.push("controllers/application");


window.require.define({"controllers/slide": function(exports, require, module) {
  
App.SlideController = Ember.Controller.extend();

}});
window.moduleNames.push("controllers/slide");


window.require.define({"controllers/slide_container": function(exports, require, module) {
  
App.SlideContainerController = Ember.Controller.extend();

}});
window.moduleNames.push("controllers/slide_container");


window.require.define({"controllers/slides": function(exports, require, module) {
  
App.SlidesController = Ember.ArrayController.extend();

}});
window.moduleNames.push("controllers/slides");


window.require.define({"data/slides": function(exports, require, module) {
  
App.Slide.reopenClass({
  slideOrder: [
    {
      templateName: 'what_is_ember',
      title: 'What is Ember?'
    }, {
      templateName: 'why_ember',
      title: 'Why Ember?'
    }, {
      templateName: 'code_samples',
      title: 'Code Samples'
    }, {
      templateName: 'follow_along',
      title: 'Follow Along'
    }, {
      templateName: 'built_in_goodies',
      title: 'Built in Goodies'
    }, {
      templateName: 'array_comprehensions',
      title: 'Array Comprehensions'
    }, {
      templateName: 'array_of_objects_methods',
      title: 'Array of Objects Methods'
    }, {
      templateName: 'data_binding',
      title: 'Data Binding'
    }, {
      templateName: 'computed_properties',
      title: 'Computed Properties'
    }, {
      templateName: 'sane_class_syntax',
      title: 'Sane Class Syntax'
    }, {
      templateName: 'class_binding',
      title: 'Class Binding'
    }, {
      templateName: 'attribute_binding',
      title: 'Attribute Binding'
    }, {
      templateName: 'super',
      title: 'Super'
    }, {
      templateName: 'third_party_javascript',
      title: 'Third Party JavaScript'
    }, {
      templateName: 'and_finally',
      title: 'And Finally'
    }, {
      templateName: 'acknowledgements',
      title: 'Acknowledgements'
    }
  ]
});

}});
window.moduleNames.push("data/slides");


window.require.define({"helpers/code": function(exports, require, module) {
  
Handlebars.registerHelper('code', function(options) {
  return Ember.Handlebars.helpers.view.call(this, 'App.CodeAndExampleView', options);
});

}});
window.moduleNames.push("helpers/code");


window.require.define({"helpers/documentation": function(exports, require, module) {
  
Handlebars.registerHelper('documentation', function(path) {
  return new Ember.Handlebars.SafeString("<a class=\"doc-link\" href=\"http://emberjs.com/api/classes/" + path + "\"    target=\"_blank\">DOCS</a>");
});

}});
window.moduleNames.push("helpers/documentation");


window.require.define({"initialize": function(exports, require, module) {
  var folderOrder;

window.App = require('app');

require('router');

folderOrder = 'models data helpers templates controllers views'.w();

folderOrder.forEach(function(folder) {
  return window.moduleNames.filter(function(moduleName) {
    return new RegExp("^" + folder).test(moduleName);
  }).forEach(function(matchingModule) {
    return require(matchingModule);
  });
});

App.set('slides', App.Slide.slideOrder.map(function(slideObject) {
  return App.Slide.create(slideObject);
}));

App.initialize();

}});
window.moduleNames.push("initialize");


window.require.define({"models/slide": function(exports, require, module) {
  
App.Slide = Ember.Object.extend({
  slug: (function() {
    return this.get('templateName').dasherize();
  }).property('templateName'),
  templatePath: (function() {
    if (this.get('templateName')) {
      return "templates/slides/" + (this.get('templateName'));
    }
  }).property('templateName'),
  isLastShownSlide: (function() {
    return this === App.get('lastShownSlide');
  }).property('App.lastShownSlide'),
  slideNumber: (function() {
    return App.get('slides').indexOf(this) + 1;
  }).property()
});

}});
window.moduleNames.push("models/slide");


window.require.define({"router": function(exports, require, module) {
  
App.Router = Ember.Router.extend({
  enableLogging: false,
  goToSlide: Ember.Route.transitionTo('slides.show'),
  goHome: Ember.Route.transitionTo('index'),
  root: Ember.Route.extend({
    loading: Ember.State.extend(),
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'slides.index'
    }),
    slides: Ember.Route.extend({
      route: '/slides',
      index: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router) {
          var controller;
          controller = router.get('applicationController');
          return controller.connectOutlet('slides', App.get('slides'));
        }
      }),
      show: Ember.Route.extend({
        route: '/:slug',
        serialize: function(router, slide) {
          if (slide) {
            return {
              slug: slide.get('slug')
            };
          } else {
            router.transitionTo('slides.index');
            return {
              slug: ''
            };
          }
        },
        deserialize: function(router, params) {
          return App.get('slides').findProperty('slug', params.slug);
        },
        exit: function(router) {
          router.get('applicationView').resetClasses();
          App.set('lastShownSlide', App.get('currentSlide'));
          return App.set('currentSlide', null);
        },
        connectOutlets: function(router, slide) {
          var controller;
          controller = router.get('applicationController');
          App.set('currentSlide', slide);
          return controller.connectOutlet('slideContainer', slide);
        }
      })
    })
  })
});

}});
window.moduleNames.push("router");


window.require.define({"templates/application": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3;
  data.buffer.push("\n          ");
  stack1 = depth0;
  stack2 = "App.currentSlidePosition";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " / ");
  stack1 = depth0;
  stack2 = "App.slides.length";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n        ");
  return buffer;}

function program3(depth0,data) {
  
  
  data.buffer.push("\n          &nbsp;\n        ");}

  data.buffer.push("<div class=\"container\">\n  ");
  stack1 = depth0;
  stack2 = "outlet";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n  <footer class=\"app-footer\">\n    <ul>\n      <li>\n        <label>\n          ");
  stack1 = depth0;
  stack2 = "Ember.Checkbox";
  stack3 = {};
  stack4 = "App.config.showNotes";
  stack3['checkedBinding'] = stack4;
  stack4 = helpers.view;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n          Show Notes\n        </label>\n      </li>\n      <li>\n        Created by <a href=\"http://twitter.com/mutewinter\">Jeremy Mack</a>\n      </li>\n      <li>\n        ");
  stack1 = depth0;
  stack2 = "App.currentSlide";
  stack3 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n    </ul>\n  </footer>\n</div>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/application");


window.require.define({"templates/code_toolbar": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3;
  data.buffer.push("\n    ");
  stack1 = depth0;
  stack2 = "view.errorMessage";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n  ");
  return buffer;}

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3;
  data.buffer.push("\n    ");
  stack1 = depth0;
  stack2 = "view.message";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n  ");
  return buffer;}

function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4;
  data.buffer.push("\n  <a ");
  stack1 = depth0;
  stack2 = "resetCode";
  stack3 = {};
  stack4 = "view";
  stack3['target'] = stack4;
  stack4 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " href=\"#\">\n    Reset Sample\n  </a>\n  ");
  return buffer;}

function program7(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4;
  data.buffer.push("\n  <a ");
  stack1 = depth0;
  stack2 = "switchLanguage";
  stack3 = {};
  stack4 = "view";
  stack3['target'] = stack4;
  stack4 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " href=\"#\">\n    ");
  stack1 = depth0;
  stack2 = "view.switchText";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n  </a>\n  ");
  return buffer;}

  data.buffer.push("<div ");
  stack1 = {};
  stack2 = ":messages view.hasError:error";
  stack1['class'] = stack2;
  stack2 = helpers.bindAttr;
  tmp1 = {};
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.data = data;
  stack1 = stack2.call(depth0, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n  ");
  stack1 = depth0;
  stack2 = "view.hasError";
  stack3 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n<div class=\"buttons\">\n  ");
  stack1 = depth0;
  stack2 = "view.canResetCode";
  stack3 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = depth0;
  stack2 = "view.hasError";
  stack3 = helpers.unless;
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/code_toolbar");


window.require.define({"templates/examples/log": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\n      shrink\n    ");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n      expand\n    ");}

  data.buffer.push("<header>\n  <h4>Log Messages</h4>\n  <a ");
  stack1 = depth0;
  stack2 = "expand";
  stack3 = {};
  stack4 = "view";
  stack3['target'] = stack4;
  stack4 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " href=\"#\" class=\"pull-right\">\n    ");
  stack1 = depth0;
  stack2 = "view.isExpanded";
  stack3 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </a>\n</header>\n<pre class=\"log-area\">\n");
  stack1 = depth0;
  stack2 = "view.logMessagesText";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n</pre>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/examples/log");


window.require.define({"templates/examples/squid": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;


  data.buffer.push("<img class=\"derpy-squid\" src=\"img/squid.svg\"></img>\n<table class=\"caption\">\n  <tbody>\n    <tr>\n      <td class=\"label\">Name</td>\n      <td>");
  stack1 = depth0;
  stack2 = "view.name";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "</td>\n    </tr>\n    <tr>\n      <td class=\"label\">Phlyum</td>\n      <td>");
  stack1 = depth0;
  stack2 = "view.phylum";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "</td>\n    </tr>\n  </tbody>\n</table>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/examples/squid");


window.require.define({"templates/fake_code": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  Code Sample and Example\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  Code Sample\n");}

  stack1 = depth0;
  stack2 = "view.hasCodeExample";
  stack3 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/fake_code");


window.require.define({"templates/slide": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;


  data.buffer.push("<h1>");
  stack1 = depth0;
  stack2 = "content.title";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "</h1>\n");
  stack1 = depth0;
  stack2 = "App.SlideContentView";
  stack3 = {};
  stack4 = "content";
  stack3['contentBinding'] = stack4;
  stack4 = helpers.view;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slide");


window.require.define({"templates/slide_container": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, stack5, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4, stack5, stack6;
  data.buffer.push("\n    <a ");
  stack1 = depth0;
  stack2 = "App.previousSlide";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = {};
  stack6 = true;
  stack5['href'] = stack6;
  stack6 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack5;
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack6.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n      &lt; ");
  stack1 = depth0;
  stack2 = "App.previousSlide.title";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n    </a>\n    ");
  return buffer;}

function program3(depth0,data) {
  
  
  data.buffer.push("\n      &nbsp;\n    ");}

function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4, stack5, stack6;
  data.buffer.push("\n    <a ");
  stack1 = depth0;
  stack2 = "App.nextSlide";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = {};
  stack6 = true;
  stack5['href'] = stack6;
  stack6 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack5;
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack6.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n      ");
  stack1 = depth0;
  stack2 = "App.nextSlide.title";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " &gt;\n    </a>\n    ");
  return buffer;}

function program7(depth0,data) {
  
  
  data.buffer.push("\n      &nbsp;\n    ");}

  data.buffer.push("<ul class=\"slide-controls\">\n  <li ");
  stack1 = depth0;
  stack2 = "App.previousSlide";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = helpers.action;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack5.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n    ");
  stack1 = depth0;
  stack2 = "App.previousSlide";
  stack3 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(3, program3, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </li>\n  <li ");
  stack1 = depth0;
  stack2 = "goHome";
  stack3 = helpers.action;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " class=\"slide-controls-home\">\n    <a ");
  stack1 = depth0;
  stack2 = "goHome";
  stack3 = {};
  stack4 = true;
  stack3['href'] = stack4;
  stack4 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " >Home</a>\n  </li>\n  <li ");
  stack1 = depth0;
  stack2 = "App.nextSlide";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = helpers.action;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack5.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n    ");
  stack1 = depth0;
  stack2 = "App.nextSlide";
  stack3 = helpers['if'];
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.program(7, program7, data);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </li>\n</ul>\n<div class=\"slide-background\">\n  <div class=\"slide-container\">\n    ");
  stack1 = depth0;
  stack2 = "App.SlideView";
  stack3 = {};
  stack4 = "content";
  stack3['contentBinding'] = stack4;
  stack4 = helpers.view;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n  </div>\n</div>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slide_container");


window.require.define({"templates/slides": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, stack5, stack6, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4, stack5, stack6, stack7;
  data.buffer.push("\n  ");
  stack1 = depth0;
  stack2 = "content";
  stack3 = depth0;
  stack4 = "as";
  stack5 = depth0;
  stack6 = "view.content";
  stack7 = helpers['with'];
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack5);
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack7.call(depth0, stack6, stack4, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;}
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, stack3, stack4, stack5;
  data.buffer.push("\n    <div ");
  stack1 = depth0;
  stack2 = "content";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = helpers.action;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack5.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n      ");
  stack1 = {};
  stack2 = ":slide-container :preview content.isLastShownSlide:flash";
  stack1['class'] = stack2;
  stack2 = helpers.bindAttr;
  tmp1 = {};
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.data = data;
  stack1 = stack2.call(depth0, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n      ");
  stack1 = depth0;
  stack2 = "App.SlideView";
  stack3 = {};
  stack4 = "content";
  stack3['contentBinding'] = stack4;
  stack4 = true;
  stack3['preview'] = stack4;
  stack4 = helpers.view;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n    </div>\n    <span class=\"slide-number\">\n      ");
  stack1 = depth0;
  stack2 = "content.slideNumber";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + " / ");
  stack1 = depth0;
  stack2 = "App.slides.length";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + "\n    </span>\n  ");
  return buffer;}

  data.buffer.push("<div class=\"banner\">\n  <h1>Why Ember?</h1>\n  <div class=\"subtitle\">\n    Why should I use Ember.js? JavaScript MVC frameworks are plentiful. In this\n    presentation I will give you some compelling reasons to consider Ember.\n  </div>\n</div>\n<div class=\"instructions\">\n  <a ");
  stack1 = depth0;
  stack2 = "App.firstSlide";
  stack3 = depth0;
  stack4 = "goToSlide";
  stack5 = {};
  stack6 = true;
  stack5['href'] = stack6;
  stack6 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack5;
  tmp1.contexts = [];
  tmp1.contexts.push(stack3);
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack6.call(depth0, stack4, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">Start Here</a> or Click a Slide Below\n</div>\n");
  stack1 = {};
  stack2 = "slide-list";
  stack1['class'] = stack2;
  stack2 = "content";
  stack1['contentBinding'] = stack2;
  stack2 = "ul";
  stack1['tagName'] = stack2;
  stack2 = "li";
  stack1['itemTagName'] = stack2;
  foundHelper = helpers.collection;
  stack2 = foundHelper || depth0.collection;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides");


window.require.define({"templates/slides/acknowledgements": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var foundHelper, self=this;


  data.buffer.push("<ul>\n  <li>The <a href=\"http://emberjs.com/\">Ember.js</a> team for making building\n    this presentation effortless\n  </li>\n  <li><img class=\"derpy-squid-small\" src=\"img/squid.svg\"/>\n      by <a href=\"http://twitter.com/amyshropshire\" target=\"_blank\">\n        Amy Shropshire</a>\n  </li>\n  <li><a href=\"http://en.wikipedia.org/wiki/Jeremy_Ashkenas\">Jeremy Ashkenas\n    </a> for making CoffeeScript</li>\n  <li><a href=\"http://codemirror.net/\">CodeMirror</a> for making the code editing\n    and possible\n  </li>\n</ul>\n");
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/acknowledgements");


window.require.define({"templates/slides/and_finally": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Here's some cool things you should look for in the code:\n  </p>\n  <ul>\n    <li>SlideContentView automatically substitutes its template for the one\n    declared in the Slide model.\n    </li>\n    <li>The &#123;{code}} Handlebars helper and how arguments can be passed to\n    it to customize it.\n    </li>\n    <li>The CodeView and CodeToolbarView use CodeMirror to display code and\n    dynamic error messages you type.\n    </li>\n    <li>The Slide templates are rendered on the homepage using a custom bit of\n    CSS to shrink and mask them. Also check out how the preview property is\n    used to keep the code from being executed on the homepage.\n    </li>\n  </ul>\n");}

  data.buffer.push("<ul>\n  <li>Want more Ember?</li>\n  <li>This presentation was created with Ember!</li>\n  <li>Go  <a href=\"https://github.com/mutewinter/why_ember\">check it out on\n    GitHub</a></li>\n</ul>\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/and_finally");


window.require.define({"templates/slides/array_comprehensions": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\ndata = [0..10]\n\nlog 'Starting Data', data\nlog 'Multiplied by two', data.map((i) -> i * 2)\nlog data.reduce(\n  (sum, i) -> sum += i\n, 0)\nlog 'Even Values', data.filter((i) -> i % 2 == 0)\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Yep, you've seen these before. Heck your browser probably supports them\n    natively. The nice thing about them is that they work in older browsers\n    transparently. No setup required. Being able to depend on simple things\n    like this allows you to spend more time writing beautiful code and less\n    time worrying.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Automatically polyfilled to older browsers</li>\n  <li>Available on the Native Array Object</li>\n  <li>\n  map ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_map";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  reduce ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_reduce";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  filter ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_filter";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  </li>\n</ul>\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  stack2 = true;
  stack1['isExpanded'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/array_comprehensions");


window.require.define({"templates/slides/array_of_objects_methods": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\ndata = [\n  {title: 'Derping with the Wind', releaseYear: 1939}\n  {title: 'Death of a Derpman', releaseYear: 1951}\n  {title: 'Forrest Derp', releaseYear: 1994}\n  {title: 'The Derpshank Redemption', releaseYear: 1994}\n]\n\nlog data.findProperty('releaseYear', 1994)\nlog data.mapProperty('title')\nlog data.everyProperty('releaseYear', 1994)\nlog data.someProperty('releaseYear', 1994)\nlog data.filterProperty('releaseYear', 1994)\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Here's some methods you probably wish you had. These are just syntactic\n    sugar on top of the regular array comprehension methods. The golden part is\n    that they work with Ember Objects and native JavaScript object.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Methods for finding objects in an array of objects</li>\n  <li class=\"smallest\">\n  findProperty ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_findProperty";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  mapProperty ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_mapProperty";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  everyProperty ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_everyProperty";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  someProperty ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_someProperty";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  filterProperty ");
  stack1 = depth0;
  stack2 = "Ember.NativeArray.html#method_filterProperty";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  </li>\n</ul>\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  stack2 = true;
  stack1['isExpanded'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/array_of_objects_methods");


window.require.define({"templates/slides/attribute_binding": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\nchildView = Ember.View.create(\n  template: Ember.Handlebars.compile(\n    '&lt;img &#123;{bindAttr src=\"view.src\"}}/>')\n  src: 'img/squid.svg'\n)\n\ncontainerView.get('childViews').pushObject childView\n\n# Uncomment the line below to see the Squid change.\n# childView.set('src', 'img/less_derpy_squid.svg')\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    An attribute is a property that appears inside of the &lt; &gt; symbols.\n    Anchor tag hrefs, data- attributes, and anything else you can think of are\n    fair game.\n  </p>\n  <p>\n    You can bind any attribute an HTML element can have. Ember uses a data\n    attribute behind the scenes to modify the attribute value transparently for\n    you.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Bind Any Attribute to a Variable</li>\n  <li>Simple Syntax</li>\n</ul>\n\n");
  stack1 = {};
  stack2 = "App.ExampleContainerView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/attribute_binding");


window.require.define({"templates/slides/built_in_goodies": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\nlog 'item_one item2 third_item'.w()\nlog 'Hello Mr. %@ the %@'.fmt('Derpy', 'Squid')\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Ember has a couple built-in String manipulation methods. If you browse the\n    source code for this presentation you'll find me using them sometimes.\n  </p>\n");}

function program5(depth0,data) {
  
  
  data.buffer.push("\nlog Ember.typeOf('s'), Ember.typeOf([1,2]), Ember.typeOf(x: 1)\nlog Ember.makeArray(1), Ember.makeArray([1,2])\nlog Ember.keys(x: 1, y: 2)\n");}

function program7(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    These functions allow you to keep from adding a dependacy on another\n    library like <a href=\"http://underscorejs.org/\">Underscore</a>.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>String Manipulation ");
  stack1 = depth0;
  stack2 = "Ember.String.html";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "</li>\n</ul>\n<span>\nString.w ");
  stack1 = depth0;
  stack2 = "Ember.String.html#method_w";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\nString.fmt ");
  stack1 = depth0;
  stack2 = "Ember.String.html#method_fmt";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n</span>\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  stack2 = true;
  stack1['noToolbar'] = stack2;
  stack2 = true;
  stack1['isExpanded'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<ul>\n  <li>Utility Functions</li>\n</ul>\n<span>\n  Ember.typeOf ");
  stack1 = depth0;
  stack2 = "Ember.html#method_typeOf";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  Ember.makeArray ");
  stack1 = depth0;
  stack2 = "Ember.html#method_makeArray";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n  Ember.keys ");
  stack1 = depth0;
  stack2 = "Ember.html#method_keys";
  foundHelper = helpers.documentation;
  stack3 = foundHelper || depth0.documentation;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  if(typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, tmp1); }
  else if(stack3=== undef) { stack1 = helperMissing.call(depth0, "documentation", stack2, tmp1); }
  else { stack1 = stack3; }
  data.buffer.push(escapeExpression(stack1) + "\n</span>\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  stack2 = true;
  stack1['noToolbar'] = stack2;
  stack2 = true;
  stack1['isExpanded'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/built_in_goodies");


window.require.define({"templates/slides/class_binding": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Which is really important since tweaking class values is something you do\n    frequently in a web application.\n  </p>\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\nChildView = Ember.View.extend(\n  classNames: 'example-child-view'\n  classNameBindings: 'isHidden:hidden colorClass'.w()\n  template: Handlebars.compile('Child View')\n\n  # Defaults\n  isHidden: false\n  color: 'red'\n\n  colorClass: (->\n    \"color-#{@get('color')}\"\n  ).property('color')\n)\n\nfirstChildView = ChildView.create()\nsecondChildView = ChildView.create()\n\ncontainerView.get('childViews').pushObject firstChildView\ncontainerView.get('childViews').pushObject secondChildView\n\n# Uncomment the lines below to see the changes to the view\n# firstChildView.set('isHidden', true)\n# secondChildView.set('color', 'green')\n");}

function program5(depth0,data) {
  
  
  data.buffer.push("\n.example-child-view.color-red {\n  color: red;\n}\n.example-child-view.color-green {\n  color: green;\n}\n.example-child-view.color-blue {\n  color: blue;\n}\n.example-child-view.hidden {\n  display: none;\n}\n");}

function program7(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    The syntactic sugar for declaring classNameBindings is confusing at first,\n    but is immediately understandable. By using an array of strings and the\n    String.w() method, class bindings end up resembling regular class\n    definitions.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Almost No Code</li>\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <li>Works Great with Computed Properties</li>\n  <li>See <a href=\"http://emberjs.com/api/classes/Ember.View.html\">Ember.View's\n    API Documentation </a> for more</li>\n</ul>\n\n");
  stack1 = {};
  stack2 = "App.ExampleContainerView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<p>\n  Here's the CSS that governs the example above.\n</p>\n");
  stack1 = {};
  stack2 = true;
  stack1['noToolbar'] = stack2;
  stack2 = "css";
  stack1['language'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/class_binding");


window.require.define({"templates/slides/code_samples": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n# Change Slide Background Color to Blue\n$('.slide-container').css('background-color': 'rgba(0,50,100,0.25)')\n# Change Heading Color to Dark Blue\n$('.slide h1').css(color: 'darkBlue')\n# Change Link Style\n$('.slide li a').css\n    'border-bottom-style': 'double'\n    'border-bottom-width': '4px'\n    'border-bottom-color': '#1975E9'\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    There are code samples, you should play with them liberally. It's also a\n    great way to learn CoffeeScript. You can reset all of the samples with a\n    handy reset button that appears once you edit them. If you _really_ break\n    something, just refresh the browser.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>The code samples in this presentation are interactive</li>\n  <li>The code is written in <a href=\"http://coffeescript.org/\">CoffeeScript</a></li>\n  <li>And can be viewed in JavaScript</li>\n  <li>Try editing the code below and see how it affects the page.</li>\n</ul>\n\n");
  stack1 = {};
  stack2 = false;
  stack1['hasExampleView'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/code_samples");


window.require.define({"templates/slides/computed_properties": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <p>\n      A simple concept that proves incredibly powerful in execution. Being able\n      to treat the complex output of your Ember Objects as simple variables\n      means you don't think about the complexity in your templates.\n    </p>\n  ");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <p>\n      Computed properties are cached when they are generated. I haven't found a\n      situation yet that I needed to disable the caching.\n    </p>\n  ");}

function program5(depth0,data) {
  
  
  data.buffer.push("\n    <p>\n      Chaining computed properties makes your code cleaner. Need re factor the\n      way one of your properties in the chain is generated? No worry,\n      everything will propagate automatically to its children.\n    </p>\n  ");}

function program7(depth0,data) {
  
  
  data.buffer.push("\ncomputedSquid = Ember.Object.create\n  name: 'Derpy Squid'\n  tentacleCount: 1\n\n  tentacleText: (->\n    if @get('tentacleCount') == 1 then 'tentacle' else 'tentacles'\n  ).property('tentacleCount')\n\n  description: (->\n    name = @get('name')\n    tentacleCount = @get('tentacleCount')\n    \"#{name} with #{tentacleCount} #{@get('tentacleText')}\"\n  ).property('name', 'tentacleCount')\n\nlog computedSquid.get('description')\ncomputedSquid.set('tentacleCount', 8)\nlog computedSquid.get('description')\n");}

function program9(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Computed properties sound fancy. The thing is, there are a lot of\n    situations in UI code where you don't want to be recalculating values every\n    time a function is called. Another bonus of computed properties is that\n    they can be put directly into a Ember Handlebars template.\n  <p>\n  </p>\n    I've found that on my Ember projects I end up using about 80% computed\n    properties and 20% functions.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Transform One Variable to Another</li>\n  ");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <li>Cached Automatically</li>\n  ");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <li>Chainable</li>\n  ");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(7, program7, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/computed_properties");


window.require.define({"templates/slides/data_binding": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\nsquidView.set('name', 'Dynamic Squid')\nsquidView.set('phylum', 'Magicalitus')\nsquidView.set('x', 10)\nsquidView.set('backgroundColor', 'salmon')\nsquidView.imageSize(80)\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Data binding is another thing you don't want to have to do manually. Doing\n    your data binding by hand using jQuery means you need extra class\n    declaration that don't match your CSS. It also means that you need to worry\n    about whether the .text() method or the .html() method are safe for\n    user-generated output.\n    </p>\n  <p>\n    SquidView is the view that backs this example. It's located here\n    app/views/examples/squid.coffee. I encourage you to go browse the code and\n    see how simple setting up these binds was.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Fancy-speak for Automatically Updating Templates</li>\n  <li>Try it Out, Change the Squid</li>\n</ul>\n\n");
  stack1 = {};
  stack2 = "App.SquidView";
  stack1['exampleViewClassName'] = stack2;
  stack2 = 150;
  stack1['height'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/data_binding");


window.require.define({"templates/slides/follow_along": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    How meta. This only really applies when I'm presenting this presentation\n    to you in person. Otherwise you're already on this page. Reading this text.\n    In your web browser. Hello.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>I'm going too slow?</li>\n  <li>Didn't catch that?</li>\n  <li>Want to play with the code?</li>\n  <li>Open <a\n    href=\"http://mutewinter.github.com/why_ember\">http://mutewinter.github.com/why_ember</a>\n  and follow along</li>\n  <li><a href=\"http://git.io/iYTHAg\">http://git.io/iYTHAg</a> for short</li>\n</ul>\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/follow_along");


window.require.define({"templates/slides/sane_class_syntax": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n# Define the Class with Instance Methods\nSquid = Ember.Object.extend()\n\n# Now we make a class method.\nSquid.reopenClass\n  squidBuilder: (color, wants) ->\n    @create(color: color, wants: wants)\n\nblackSquid = Squid.squidBuilder('green', 'to derp less')\nlog blackSquid.get('color')\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n# Skip Straight to an Object Instance\nblackSquid = Ember.Object.create(\n  color: 'black'\n  wants: 'to be a potato'\n)\n\nlog blackSquid.get('color')\n");}

function program5(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    The sane class syntax of Ember allows you to not think twice about using\n    classes and instance objects. The added benefits of being able to use\n    computed properties and getters and setters is just icing on the cake.\n  </p>\n");}

  data.buffer.push("<h2>Ember.Object.extend</h2>\n\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<h2>Ember.Object.create</h2>\n\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<footer class=\"sane subtle text-center\">\n  <a href=\"http://www.youtube.com/watch?v=AkjcxlAuyLI&t=12m22s\">\n    What do you mean \"sane\"?\n  </a>\n</footer>\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/sane_class_syntax");


window.require.define({"templates/slides/super": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n//class parent\nfunction parent(param_1){\n    console.log(\"parent \" + param_1);\n    this.param = param_1;\n}\n\nparent.prototype.getObjWithParam = function(val) {\n    console.log(\"value in parent class \"+val);\n    console.log(\"Constructor parameter : \"+this.param);\n};\n\n//class child\nfunction child(param_1){\n    console.log(\"child \" + param_1);\n    this.constructor(param_1);\n}\nchild.prototype = new parent();\nchild.prototype.getObjWithParam = function(val) {\n    console.log(\"value in child class \"+val);\n    val = Number(val)+1;\n    parent.prototype.getObjWithParam.call(this, [val]);\n}\n\n//class grandChild\nfunction grandChild(param_1){\n    console.log(\"grandChild \" + param_1);\n    this.constructor(param_1);\n}\ngrandChild.prototype = new child();\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\nOceanAnimals = Ember.Object.extend\n  phylums: [\n    {animal: 'squid', scientificName: 'Cephalopoda'}\n    {animal: 'shark', scientificName: 'Chondrichthyes'}\n    {animal: 'clam', scientificName: 'Bivalvia'}\n  ]\n\n  phylum: ->\n    phylum = @phylums.findProperty('animal', @get('animal'))\n    \"Phylum is #{phylum.scientificName} \"\n\nSquid = OceanAnimals.extend\n  animal: 'squid'\n  name: 'Bob'\n  phylum: ->\n    \"#{@get('name')} the #{@get('animal')}'s #{@_super()}\"\n\nlog Squid.create().phylum()\n");}

function program5(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    The availability of the super method shows the power of Ember's class\n    modeling. Ember also has <a\n    href=\"http://emberjs.com/api/classes/Ember.Mixin.html\">Mixins</a>, which\n    allow you to extra complexity from your application into logical pieces.\n  </p>\n");}

  data.buffer.push("<h2>Vanilla JavaScript</h2>\n<p>Let's flex our Google.</p>\n");
  stack1 = {};
  stack2 = "javascript";
  stack1['language'] = stack2;
  stack2 = 154;
  stack1['height'] = stack2;
  stack2 = true;
  stack1['noToolbar'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<p>\n  Sweet mother, that <a href=\"http://stackoverflow.com/q/8701114\">looks</a>\n  <a href=\"http://cl.ly/KUaB\">compilcated</a>.\n</p>\n\n<h2>Ember</h2>\n\n");
  stack1 = {};
  stack2 = "App.LogView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/super");


window.require.define({"templates/slides/third_party_javascript": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\nchildView = Ember.View.create\n  template: Ember.Handlebars.compile(\n    '&lt;time &#123;{bindAttr datetime=\"view.timeString\"}}&gt;\n      Right Now\n    &lt;/time&gt;')\n\n  didInsertElement: -> @$('time')?.timeago()\n\n  timeString: new Date().toUTCString()\n\n\ncontainerView.get('childViews').pushObject childView\n");}

function program3(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Ember enables you to use any third party JavaScript you might desire by\n    giving you callbacks into the view's life cycle. All you need to do is\n    listen to those callbacks and setup and tear down any extra JavaScript\n    functionality of which Ember isn't aware.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Integrates with Ember Views Seamlessly</li>\n  <li>UI Widgets Work Better in Ember</li>\n  <li>Simple Callback System</li>\n  <li>Wrapper Libraries Already\n    <a href=\"https://github.com/emberjs-addons/ember-bootstrap\">Being</a>\n    <a href=\"https://github.com/lukemelia/jquery-ui-ember\">Made</a>\n  </li>\n</ul>\n\n<p>\n  Here's a Sample Integration with <a\n  href=\"http://timeago.yarp.com/\">timeago</a>, a jQuery plugin\n</p>\n");
  stack1 = {};
  stack2 = "App.ExampleContainerView";
  stack1['exampleViewClassName'] = stack2;
  foundHelper = helpers.code;
  stack2 = foundHelper || depth0.code;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = stack1;
  tmp1.contexts = [];
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, tmp1); }
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/third_party_javascript");


window.require.define({"templates/slides/what_is_ember": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    Ember is a serious framework. External code dependencies beyond jQuery are\n    unnecessary. It's written by a team, that is currently being paid to write\n    Ember. It's still in Pre-release, but let the stability of this\n    presentation be a testament to the quality of the code.\n  </p>\n");}

  data.buffer.push("<h2 class=\"text-center\">\n  “A Framework for Creating Ambitious Web Applications”\n</h2>\n\n<ul>\n  <li>An All-Inclusive JavaScript MVC Framework</li>\n  <li>9,000 Lines of Code</li>\n  <li>9,200 Lines of Inline Documentation</li>\n  <li>2,133 Unit Tests</li>\n  <li>Currently Release 1.0.0-PRE.2</li>\n</ul>\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/what_is_ember");


window.require.define({"templates/slides/why_ember": function(exports, require, module) {
  
Ember.TEMPLATES[module.id] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p>\n    To make ambitious web applications, you have to use abstractions that hide\n    complexity, encourage structure, and remove boilerplate code.\n  </p>\n\n  <p>\n    The hours you spend getting fifteen jQuery plugins to work together are\n    hours you should spend building your application. You need a framework that\n    handles view drawing manages event life cycles. You should only have to\n    worry about the high-level problems.\n  </p>\n\n  <p>\n    Binding your data manually to your views isn't time well spent. It's a\n    solved problem. Still messing with classes using jQuery? Your views should\n    automatically reflect the data that backs them.\n  </p>\n");}

  data.buffer.push("<ul>\n  <li>Small choices are made for you, just like Rails</li>\n  <li>Lets you solve more interesting problems</li>\n  <li>Manages the complexity of a large application</li>\n  <li>Stuff you didn't know you needed is already there</li>\n  <li>Built <a href=\"http://www.tilde.io/\">by people</a> scratching their own\n    itch</li>\n</ul>\n\n");
  stack1 = depth0;
  stack2 = "App.NotesView";
  stack3 = helpers.view;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
});
 module.exports = module.id;
}});
window.moduleNames.push("templates/slides/why_ember");


window.require.define({"views/application": function(exports, require, module) {
  
App.ApplicationView = Ember.View.extend({
  templateName: 'templates/application',
  classNames: 'application',
  classNameBindings: 'wiggleLeft wiggleRight'.w(),
  init: function() {
    this._super();
    return $(document).on('keyup', this.documentKeyUp.bind(this));
  },
  resetClasses: function() {
    this.set('wiggleLeft', false);
    return this.set('wiggleRight', false);
  },
  documentKeyUp: function(e) {
    var router;
    if (!App.get('currentSlide')) {
      return;
    }
    router = App.get('router');
    switch (e.which) {
      case 37:
      case 38:
        if (App.get('previousSlide')) {
          return router.goToSlide(router, App.get('previousSlide'));
        } else {
          return this.set('wiggleLeft', true);
        }
        break;
      case 32:
      case 39:
      case 40:
        if (App.get('nextSlide')) {
          return router.goToSlide(router, App.get('nextSlide'));
        } else {
          return this.set('wiggleRight', true);
        }
    }
  }
});

}});
window.moduleNames.push("views/application");


window.require.define({"views/code": function(exports, require, module) {
  var ERROR_REGEX,
  __slice = [].slice;

ERROR_REGEX = /.*?Parse error on line (\d+): (.+)/;

App.CodeView = Ember.View.extend({
  classNames: 'code-view',
  language: 'coffeescript',
  isCodeModified: false,
  didInsertElement: function() {
    var code, codeMirrorOptions, editor,
      _this = this;
    code = $.trim(this.$().text());
    this.$().text('');
    this.set('starterCode', code);
    codeMirrorOptions = {
      lineNumbers: true,
      mode: this.get('language'),
      value: code,
      onKeyEvent: function(editor, rawEvent) {
        return jQuery.Event(rawEvent).stopPropagation();
      },
      onChange: function() {
        if (_this.get('isCoffeeScript')) {
          _this.runCode();
          if (_this.code() !== _this.get('starterCode')) {
            return _this.set('isCodeModified', true);
          } else {
            return _this.set('isCodeModified', false);
          }
        }
      },
      onFocus: function() {
        return _this.set('isFocused', true);
      },
      onBlur: function() {
        return _this.set('isFocused', false);
      },
      extraKeys: {
        Tab: function(cm) {
          return cm.replaceSelection("  ", "end");
        }
      }
    };
    editor = CodeMirror(function(element) {
      return _this.$().append(element);
    }, codeMirrorOptions);
    this.set('editor', editor);
    this.changeEditorMode(this.get('language'));
    if (this.get('height') != null) {
      this.setEditorHeight(this.get('height'));
    } else {
      this.fixEditorHeight();
    }
    return this.runCode();
  },
  compileJavaScript: function() {
    var code, compiledJavaScript;
    code = this.code();
    if (this.get('coffeeScriptCode') === code) {
      return this.get('compiledJavaScript');
    }
    this.set('coffeeScriptCode', code);
    try {
      compiledJavaScript = CoffeeScript.compile(code, {
        bare: true
      });
      this.clearError();
    } catch (error) {
      this.clearError();
      this.displayError(error.message);
    }
    this.set('compiledJavaScript', compiledJavaScript);
    return compiledJavaScript;
  },
  clearError: function() {
    var highlightedLine;
    this.set('lastError', null);
    if (highlightedLine = this.get('highlightedLine')) {
      return this.get('editor').setLineClass(highlightedLine, null, null);
    }
  },
  displayError: function(message) {
    var editor, error, highlightedLine, lineNumber, matches;
    editor = this.get('editor');
    if (matches = message.match(ERROR_REGEX)) {
      lineNumber = parseInt(matches[1]);
      error = matches[2];
      highlightedLine = editor.setLineClass(lineNumber - 1, 'error', 'error');
      this.set('highlightedLine', highlightedLine);
    }
    return this.set('lastError', message);
  },
  switchLanguage: function() {
    var javaScriptCode;
    if (this.get('isJavaScript')) {
      this.setCode(this.get('coffeeScriptCode'));
      return this.set('language', 'coffeescript');
    } else if (this.get('isCoffeeScript')) {
      javaScriptCode = this.compileJavaScript();
      if ((javaScriptCode != null) && !this.get('hasError')) {
        this.set('language', 'javascript');
        return this.setCode(javaScriptCode);
      }
    }
  },
  resetCode: function() {
    return this.setCode(this.get('starterCode'));
  },
  runCode: function(code) {
    if (!this.get('isCoffeeScript')) {
      return;
    }
    return this.evalJavaScript(this.compileJavaScript());
  },
  evalJavaScript: function(code) {
    var argumentNames, boundFunctions, exampleView, exportedFunctions, exportedVariables, fn, valuesAndFunctions, variableValues,
      _this = this;
    try {
      exampleView = this.get('exampleView');
      if (exampleView != null) {
        exportedVariables = exampleView.get('exportedVariables');
        exportedFunctions = exampleView.get('exportedFunctions');
      } else {
        exportedVariables = [];
        exportedFunctions = [];
      }
      variableValues = exportedVariables.map(function(variable) {
        return exampleView.get(variable);
      });
      boundFunctions = exportedFunctions.map(function(functionName) {
        var unboundFunction;
        unboundFunction = exampleView.get(functionName);
        return unboundFunction.bind(exampleView);
      });
      argumentNames = exportedVariables.concat(exportedFunctions);
      valuesAndFunctions = variableValues.concat(boundFunctions);
      if (exampleView != null) {
        exampleView.willRunCode();
      }
      if (App.get('config.safeMode')) {
        fn = (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(Function, __slice.call(argumentNames).concat(['window'], ["" + code]), function(){});
      } else {
        fn = (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(Function, __slice.call(argumentNames).concat(["" + code]), function(){});
      }
      return fn.apply(null, valuesAndFunctions);
    } catch (error) {
      this.clearError();
      return this.displayError(error.message);
    } finally {
      if (exampleView != null) {
        exampleView.didRunCode();
      }
    }
  },
  observeLanguage: (function() {
    return this.changeEditorMode(this.get('language'));
  }).observes('language'),
  changeEditorMode: function(language) {
    var editor;
    editor = this.get('editor');
    editor.setOption('mode', language);
    if (language === 'coffeescript') {
      return editor.setOption('readOnly', false);
    } else {
      return editor.setOption('readOnly', true);
    }
  },
  code: function() {
    return this.get('editor').getValue();
  },
  setCode: function(code) {
    return this.get('editor').setValue($.trim(code));
  },
  setEditorHeight: function(height) {
    var $scroller, $wrapper, editor;
    editor = this.get('editor');
    $scroller = $(editor.getScrollerElement());
    $scroller.height(height);
    $wrapper = $(editor.getWrapperElement());
    return $wrapper.height(height);
  },
  fixEditorHeight: function() {
    return this.setEditorHeight($(this.get('editor').getScrollerElement()).height());
  },
  exportedVariablesBinding: 'exampleView.exportedVariables',
  exportedFunctionsBinding: 'exampleView.exportedFunctions',
  isJavaScript: (function() {
    return this.get('language') === 'javascript';
  }).property('language'),
  isCoffeeScript: (function() {
    return this.get('language') === 'coffeescript';
  }).property('language'),
  hasError: (function() {
    return !!this.get('lastError');
  }).property('lastError')
});

}});
window.moduleNames.push("views/code");


window.require.define({"views/code_and_example": function(exports, require, module) {
  
App.CodeAndExampleView = Ember.ContainerView.extend({
  classNames: 'code-and-example',
  init: function() {
    var exampleViewClass;
    this._super();
    if (this.get('parentView.preview')) {
      return this.addAndSaveView(App.FakeCodeView.create({
        hasCodeExample: !!this.get('exampleViewClassName')
      }), 'fakeCodeView');
    } else {
      this.addAndSaveView(App.CodeEditorAndStatusBarView.create({
        template: this.get('template'),
        language: this.get('language'),
        height: this.get('height'),
        noToolbar: this.get('noToolbar')
      }), 'codeEditorView');
      if (!this.get('exampleViewClassName')) {
        return;
      }
      exampleViewClass = Ember.get(this.get('exampleViewClassName'));
      this.addAndSaveView(exampleViewClass.create({
        isExpanded: this.get('isExpanded')
      }), 'exampleView');
      return this.set('codeEditorView.codeView.exampleView', this.get('exampleView'));
    }
  },
  addAndSaveView: function(view, name) {
    this.set(name, view);
    this.get('childViews').pushObject(view);
    return view;
  }
});

}});
window.moduleNames.push("views/code_and_example");


window.require.define({"views/code_editor": function(exports, require, module) {
  
App.CodeEditorAndStatusBarView = Ember.ContainerView.extend({
  classNames: 'code-and-status-bar',
  classNameBindings: 'codeView.isFocused:focused codeView.language\
    noToolbar'.w(),
  init: function() {
    this._super();
    this.addAndSaveView(App.CodeView.create({
      template: this.get('template'),
      language: this.get('language'),
      height: this.get('height')
    }), 'codeView');
    if (this.get('noToolbar')) {
      return;
    }
    return this.addAndSaveView(App.CodeToolbarView.create({
      codeView: this.get('codeView')
    }), 'toolbarView');
  },
  addAndSaveView: function(view, name) {
    this.set(name, view);
    this.get('childViews').pushObject(view);
    return view;
  }
});

}});
window.moduleNames.push("views/code_editor");


window.require.define({"views/code_toolbar": function(exports, require, module) {
  
App.CodeToolbarView = Ember.View.extend({
  templateName: 'templates/code_toolbar',
  classNames: 'code-toolbar',
  classNameBindings: 'isFocused:focused language'.w(),
  switchLanguage: function() {
    return this.get('codeView').switchLanguage();
  },
  resetCode: function() {
    return this.get('codeView').resetCode();
  },
  languageBinding: 'codeView.language',
  isCoffeeScriptBinding: 'codeView.isCoffeeScript',
  isJavaScriptBinding: 'codeView.isJavaScript',
  isFocusedBinding: 'codeView.isFocused',
  isCodeModifiedBinding: 'codeView.isCodeModified',
  hasErrorBinding: 'codeView.hasError',
  exportedVariablesBinding: 'codeView.exportedVariables',
  exportedFunctionsBinding: 'codeView.exportedFunctions',
  message: (function() {
    var string;
    string = '';
    if ((this.get('exportedVariables') != null) && this.get('exportedVariables.length')) {
      string += "Variables: " + (this.get('exportedVariables').join(','));
    }
    if ((this.get('exportedFunctions') != null) && this.get('exportedFunctions.length')) {
      string += "Functions: " + (this.get('exportedFunctions').join(','));
    }
    return string;
  }).property('exportedVariables'),
  errorMessage: (function() {
    if (this.get('hasError')) {
      return this.get('codeView.lastError');
    } else {
      return '&nbsp;';
    }
  }).property('codeView.lastError'),
  switchText: (function() {
    if (this.get('hasError')) {
      return 'Fix Error';
    } else if (this.get('codeView.isCoffeeScript')) {
      return 'View JavaScript';
    } else {
      return 'Edit CoffeeScript';
    }
  }).property('codeView.language', 'hasError'),
  canResetCode: (function() {
    return this.get('isCodeModified') && this.get('isCoffeeScript');
  }).property('isCodeModified', 'language')
});

}});
window.moduleNames.push("views/code_toolbar");


window.require.define({"views/examples/container": function(exports, require, module) {
  
App.ExampleContainerView = Ember.ContainerView.extend({
  classNames: 'example-container-view',
  exportedVariables: 'containerView'.w(),
  exportedFunctions: [],
  didRunCode: Ember.K,
  willRunCode: function() {
    return this.get('childViews').clear();
  },
  containerView: (function() {
    return this;
  }).property()
});

}});
window.moduleNames.push("views/examples/container");


window.require.define({"views/examples/example": function(exports, require, module) {
  
App.ExampleView = Ember.View.extend({
  exportedVariables: [],
  exportedFunctions: [],
  willRunCode: Ember.K,
  didRunCode: Ember.K
});

}});
window.moduleNames.push("views/examples/example");


window.require.define({"views/examples/log": function(exports, require, module) {
  var __slice = [].slice;

require('views/examples/example');

App.LogView = App.ExampleView.extend({
  classNames: 'log',
  classNameBindings: 'isExpanded:expanded',
  exportedFunctions: 'log'.w(),
  templateName: 'templates/examples/log',
  isExpanded: false,
  init: function() {
    this._super();
    return this.set('logMessages', []);
  },
  log: function() {
    var objects, objectsString,
      _this = this;
    objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    objectsString = objects.map(function(object) {
      return _this.variableToString(object);
    }).join(', ');
    this.get('logMessages').pushObject(objectsString);
    return null;
  },
  variableToString: function(variable) {
    var count, emberType, maxPairs, string;
    emberType = Ember.typeOf(variable);
    if ((variable != null) && typeof variable === 'object' && (emberType === 'object' || emberType === 'instance')) {
      maxPairs = 4;
      count = 0;
      string = Ember.keys(variable).map(function(key) {
        count++;
        if (count > maxPairs) {
          return;
        }
        if (variable instanceof Ember.Object) {
          return "" + key + ": " + (variable.get(key));
        } else {
          return "" + key + ": " + variable[key];
        }
      }).join(', ');
      if (count > maxPairs) {
        string += '...';
      }
      string = "{" + string + "}";
    } else if (emberType === 'array') {
      string = variable.map(this.variableToString).join(', ');
      string = "[" + string + "]";
    } else if (emberType === 'string') {
      string = "\"" + variable + "\"";
    } else if (variable != null) {
      string = variable.toString();
    } else {
      string = variable;
    }
    return string;
  },
  willRunCode: function() {
    return this.clearLog();
  },
  clearLog: function() {
    return this.get('logMessages').clear();
  },
  logMessagesText: (function() {
    var lineNumber;
    lineNumber = 0;
    return this.get('logMessages').map(function(message) {
      lineNumber++;
      return "" + lineNumber + "> " + message;
    }).join('\n');
  }).property('logMessages.@each'),
  expand: function() {
    return this.toggleProperty('isExpanded');
  }
});

}});
window.moduleNames.push("views/examples/log");


window.require.define({"views/examples/squid": function(exports, require, module) {
  
require('views/examples/example');

App.SquidView = App.ExampleView.extend({
  templateName: 'templates/examples/squid',
  classNames: 'squid',
  exportedVariables: 'squidView'.w(),
  squidView: (function() {
    return this;
  }).property(),
  name: 'Derpy Squid',
  phylum: 'Cephaderp',
  x: 0,
  y: 0,
  imageWidth: 100,
  imageHeight: 100,
  backgroundColor: 'transparent',
  cssPropertiesChanged: (function() {
    this.$().css({
      left: this.get('x') < 1000 ? this.get('x') : 1000,
      top: this.get('y') < 1000 ? this.get('y') : 1000,
      'background-color': this.get('backgroundColor')
    });
    if (this.get('imageWidth') > 200 || this.get('imageHeight') > 200) {
      this.$().css({
        float: 'none'
      });
    } else {
      this.$().css({
        float: 'right'
      });
    }
    return this.$('img').css({
      width: this.get('imageWidth') < 1000 ? this.get('imageWidth') : 1000,
      height: this.get('imageHeight') < 1000 ? this.get('imageHeight') : 1000
    });
  }).observes('x', 'y', 'imageWidth', 'imageHeight', 'backgroundColor', 'float'),
  imageSize: function(size) {
    this.set('imageWidth', size);
    return this.set('imageHeight', size);
  }
});

}});
window.moduleNames.push("views/examples/squid");


window.require.define({"views/fake_code": function(exports, require, module) {
  
App.FakeCodeView = Ember.View.extend({
  classNames: 'fake-code',
  templateName: 'templates/fake_code'
});

}});
window.moduleNames.push("views/fake_code");


window.require.define({"views/notes": function(exports, require, module) {
  
App.NotesView = Ember.View.extend({
  tagName: 'section',
  classNames: 'slide-notes',
  classNameBindings: 'shown'.w(),
  shownBinding: 'App.config.showNotes'
});

}});
window.moduleNames.push("views/notes");


window.require.define({"views/slide": function(exports, require, module) {
  
App.SlideView = Ember.View.extend({
  classNames: 'slide',
  templateName: 'templates/slide',
  didInsertElement: function() {
    var _this = this;
    if (this.get('preview')) {
      return this.$().parent().on('touchend', function() {
        return App.router.send('goToSlide', _this.get('content'));
      });
    }
  },
  willDestroyElement: function() {
    return this.$().parent().off('touchend');
  }
});

}});
window.moduleNames.push("views/slide");


window.require.define({"views/slide_container": function(exports, require, module) {
  
App.SlideContainerView = Ember.View.extend({
  templateName: 'templates/slide_container'
});

}});
window.moduleNames.push("views/slide_container");


window.require.define({"views/slide_content": function(exports, require, module) {
  
App.SlideContentView = Ember.View.extend({
  tagName: 'section',
  classNames: 'slide-content',
  templateNameBinding: 'content.templatePath',
  previewBinding: 'parentView.preview'
});

}});
window.moduleNames.push("views/slide_content");


window.require.define({"views/slides": function(exports, require, module) {
  
App.SlidesView = Ember.View.extend({
  templateName: 'templates/slides',
  tagName: 'section',
  classNames: 'slides'
});

}});
window.moduleNames.push("views/slides");


