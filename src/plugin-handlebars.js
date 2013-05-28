/**
 * The plugin to load handlebars template
 */
(function(seajs, global) {

  var plugins = {}
  var uriCache = {}

  function addPlugin(o) {
    plugins[o.name] = o
  }

  // normal text
  addPlugin({
    name: "handlebars",

    ext: [".handlebars"],

    exec: function(uri, content) {
      var code = [
        'define("' + uri + '#", ["gallery/handlebars/1.0.2/handlebars"], function(require, exports, module) {',
        '  var source = "' + jsEscape(content) + '"',
        '  var Handlebars = require("gallery/handlebars/1.0.2/handlebars")',
        '  module.exports = function(data, options) {',
        '    var helpers = (options || {}).helpers || {}',
        '    for (var key in helpers) {',
        '      Handlebars.registerHelper(key, helpers[key])',
        '    }',
        '    return Handlebars.compile(source)(data)',
        '  }',
        '})'
      ].join('\n')
      globalEval(code)
    }
  })

  seajs.on("resolve", function(data) {
    var id = data.id
    if (!id) return ""

    var pluginName
    var m

    var uri = seajs.resolve(id, data.refUri)
    var t = uri.replace(/\.(?:js|css)(\?|$)/, "$1")

    if (!pluginName && (m = t.match(/[^?]+(\.\w+)(?:\?|$)/))) {
      pluginName = getPluginName(m[1])
    }

    if (pluginName) {
      uri = uri.replace(/\.js(?=$|\?)/, "")
      uriCache[uri] = pluginName
    }

    data.uri = uri
  })

  seajs.on("request", function(data) {
    var name = uriCache[data.uri]

    if (name) {
      xhr(data.requestUri, function(content) {
        plugins[name].exec(data.uri, content)
        data.callback()
      })

      data.requested = true
    }
  })


  // Helpers

  function isPlugin(name) {
    return name && plugins.hasOwnProperty(name)
  }

  function getPluginName(ext) {
    for (var k in plugins) {
      if (isPlugin(k)) {
        var exts = "," + plugins[k].ext.join(",") + ","
        if (exts.indexOf("," + ext + ",") > -1) {
          return k
        }
      }
    }
  }

  function xhr(url, callback) {
    var r = global.ActiveXObject ?
        new global.ActiveXObject("Microsoft.XMLHTTP") :
        new global.XMLHttpRequest()

    r.open("GET", url, true)

    r.onreadystatechange = function() {
      if (r.readyState === 4) {
        // Support local file
        if (r.status > 399 && r.status < 600) {
          throw new Error("Could not load: " + url + ", status = " + r.status)
        }
        else {
          callback(r.responseText)
        }
      }
    }

    return r.send(null)
  }

  function globalEval(content) {
    if (content && /\S/.test(content)) {
      (global.execScript || function(content) {
        (global.eval || eval).call(global, content)
      })(content)
    }
  }

  function jsEscape(content) {
    return content.replace(/(["\\])/g, "\\$1")
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029")
  }

})(seajs, this);
