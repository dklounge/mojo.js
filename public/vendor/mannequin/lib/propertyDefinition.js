define(["require", "/vendor/dref/lib/index.js", "/vendor/mannequin/lib/utils.js", "/vendor/verify/lib/index.js", "/vendor/async/lib/async.js", "/vendor/toarray/index.js"], function(require) {

    var __dirname = "/vendor/mannequin/lib",
    __filename    = "/vendor/mannequin/lib/propertyDefinition.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var PropertyDefinition, async, dref, toarray, utils, verify;

  dref = require("/vendor/dref/lib/index.js");

  utils = require("/vendor/mannequin/lib/utils.js");

  verify = require("/vendor/verify/lib/index.js")();

  async = require("/vendor/async/lib/async.js");

  toarray = require("/vendor/toarray/index.js");

  /*
  */


  PropertyDefinition = (function() {
    /*
    */

    function PropertyDefinition(schema, key, definition) {
      this.schema = schema;
      this.key = key;
      this.definition = this._fixDefnition(definition);
      this._validateDefinition();
      this._createValidators();
    }

    /*
    */


    PropertyDefinition.prototype.test = function(target, callback) {
      var v,
        _this = this;
      v = dref.get(target, this.key) || this._default();
      if (!v && this.definition.$required) {
        return callback(new Error("\"" + this.key + "\" must be present"));
      }
      return async.forEach(this._testers, (function(tester, next) {
        return tester(v, next);
      }), function(err) {
        if (err) {
          return callback(new Error(_this.definition.message || ("\"" + _this.key + "\" is invalid")));
        }
        dref.set(target, _this.key, v);
        return callback();
      });
    };

    /*
    */


    PropertyDefinition.prototype._fixDefnition = function(definition) {
      if (typeof definition === "string" || utils.firstKey(definition).substr(0, 1) !== "$") {
        return {
          $type: definition
        };
      } else if (definition instanceof Array) {
        return {
          $type: definition[0],
          $multi: true
        };
      } else {
        return definition;
      }
    };

    /*
    */


    PropertyDefinition.prototype._validateDefinition = function() {
      if (!this.definition.$type) {
        throw new Error("definition type must exist for " + this.key);
      }
    };

    /*
    */


    PropertyDefinition.prototype._createValidators = function() {
      var testers;
      testers = [];
      if (this.definition.$multi) {
        testers.push(verify.tester().is("array"));
      }
      if (utils.isSchema(this.definition.$type)) {
        testers.push(this._multi(this.definition.$type));
      } else {
        testers.push(this._multi(this._generateTypeTester()));
      }
      if (this.definition.$test) {
        testers.push(this._multi(this.definition.$test));
      }
      return this._testers = testers;
    };

    /*
    */


    PropertyDefinition.prototype._generateTypeTester = function() {
      var k, key, tester;
      tester = verify.tester().is(this.definition.$type);
      if (this.definition.$test) {
        return null;
      }
      for (key in this.definition) {
        k = key.substr(1);
        if (!!tester[k]) {
          tester[k].apply(tester, toarray(this.definition[key]));
        }
      }
      return tester;
    };

    /*
    */


    PropertyDefinition.prototype._multi = function(tester) {
      tester = this._tester(tester);
      return function(value, next) {
        return async.forEach(toarray(value), (function(value, next) {
          return tester(value, next);
        }), next);
      };
    };

    /*
    */


    PropertyDefinition.prototype._default = function() {
      if (!this.definition.$default) {
        return void 0;
      }
      if (typeof this.definition.$default === "function") {
        return this.definition.$default();
      }
      return this.definition.$default;
    };

    /*
    */


    PropertyDefinition.prototype._tester = function(target) {
      var context, test;
      context = this;
      test = null;
      if (typeof target === "function") {
        test = target;
      } else if (target.test) {
        test = target.test;
        context = target;
      }
      return function(value, next) {
        if (test.length === 1) {
          return next(!test.call(context, value));
        } else {
          return test.call(context, value, next);
        }
      };
    };

    return PropertyDefinition;

  })();

  /*
  */


  module.exports = PropertyDefinition;

}).call(this);


    return module.exports;
});