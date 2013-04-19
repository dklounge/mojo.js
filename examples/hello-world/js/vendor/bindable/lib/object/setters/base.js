define(["require", "bindable/lib/core/utils"], function(require) {

    var __dirname = "bindable/lib/object/setters",
    __filename    = "bindable/lib/object/setters/base.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.6.2
(function() {
  var utils;

  utils = require("bindable/lib/core/utils");

  module.exports = (function() {
    /*
    */
    function _Class(binding) {
      this.binding = binding;
      this._transformer = this.binding.transform();
      this.init();
    }

    /*
    */


    _Class.prototype.init = function() {
      return this.change(this.binding._from.get(this.binding._property));
    };

    /*
    */


    _Class.prototype.change = function(value) {
      var _this = this;

      if (this.currentValue === value) {
        return false;
      }
      this.__transform("to", value, function(err, transformedValue) {
        if (err) {
          throw err;
        }
        return _this._change(_this.currentValue = transformedValue);
      });
      return true;
    };

    /*
    */


    _Class.prototype.bothWays = function() {};

    /*
    */


    _Class.prototype._change = function(value) {};

    /*
    */


    _Class.prototype.__transform = function(method, value, next) {
      return utils.tryTransform(this._transformer, method, value, next);
    };

    return _Class;

  })();

}).call(this);


    return module.exports;
});