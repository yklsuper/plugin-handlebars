# Plugin Handlebars

> A seajs plugin for handlebars template engine.

[![Build Status](https://travis-ci.org/seajs/plugin-handlebars.png?branch=master)](https://travis-ci.org/seajs/plugin-handlebars)
[![Coverage Status](https://coveralls.io/repos/seajs/plugin-handlebars/badge.png?branch=master)](https://coveralls.io/r/seajs/plugin-handlebars)


Install
-------

Install with spm:

    $ spm install seajs/plugin-handlebars

Usage
-----

**DON'T USE THIS PLUGIN ONLINE, IT IS FOR DEVELOPMENT ENVIRONMENT**

```html
<script src="sea-modules/seajs/seajs/2.0.0/sea.js"></script>
<script src="sea-modules/seajs/plugin-handlebars/{version}/plugin-handlebars.js"></script>
<script type="text/javascript">
seajs.use('./template.handlebars', function(fn) {
    var text = fn(data, options)
})
</script>
```
