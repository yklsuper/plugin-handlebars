define(function(require) {
  var expect = require('gallery/expect/0.2.0/expect')

  describe('Plugin Handlebars', function() {
    it('can parse template', function() {
      var template = require('./spec.handlebars')
      var value = template({foo: 'bar'}, {
        helpers: {
          _: function(v) {
            return v + 's'
          }
        }
      });
      expect(value).to.equal('<h1>bars</h1>\n')
    })
  })
})
