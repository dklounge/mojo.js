// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./base", "handlebars"], function(Base, Handlebars) {
    var HandlebarsEngine;
    return HandlebarsEngine = (function(_super) {

      __extends(HandlebarsEngine, _super);

      function HandlebarsEngine() {
        return HandlebarsEngine.__super__.constructor.apply(this, arguments);
      }

      HandlebarsEngine.prototype.extension = "hb";

      /*
      */


      HandlebarsEngine.prototype.init = function() {
        var _this = this;
        return this.factory.plugins.forEach(function(plugin) {
          var helper;
          if (!plugin.templateHelper) {
            return;
          }
          helper = plugin.templateHelper();
          return Handlebars.registerHelper(helper.name, function(getText) {
            return helper.render(getText());
          });
        });
      };

      /*
      */


      HandlebarsEngine.prototype.compile = function(source) {
        var template;
        template = Handlebars.compile(source);
        return {
          render: function(options, callback) {
            return callback(null, template(options));
          }
        };
      };

      return HandlebarsEngine;

    })(Base);
  });

}).call(this);
