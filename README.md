# Why Ember?

Why should I use Ember.js? JavaScript MVC frameworks are plentiful. In this
presentation I will give you some compelling reasons to consider Ember.

**[View the Presentation](http://mutewinter.github.com/why_ember)**

## Running Locally

This presentation is built using Brunch.io, which compiles the CoffeeScript,
Handlebars templates, and Stylus stylesheets.


### Depdendancies

 * [Node](http://nodejs.org/) `brew install node`
 * [Brunch](http://brunch.io) `npm install -g brunch`

### Setup Brunch

You'll need to install the plugins required for this project.

```
  npm install
```

### Starting the Server

Run this command inside the `why_ember` folder.

```
  brunch watch --server
```

Now open http://localhost:3333. Whenever you make a change to a file the
browser will be automatically refreshed. Thanks
[auto-reload-brunch](https://github.com/brunch/auto-reload-brunch)!

## Libraries and Frameworks Used

  * [Ember.js](http://emberjs.com/) - Duh.
  * [jQuery](http://jquery.com/) - Required for Ember
  * [Brunch](http://brunch.io) - Asset Compilation
  * [Node](http://nodejs.org/) - For Brunch
  * [Stylus](http://learnboost.github.com/stylus/) - CSS Templating
