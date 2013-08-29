// Generated by CoffeeScript 1.6.3
var BaseEngine;

BaseEngine = (function() {
  /*
  */

  function BaseEngine(factory) {
    this.factory = factory;
    this.init();
  }

  /*
  */


  BaseEngine.prototype.init = function() {};

  /*
   renders a template - must always be asynchronous
  */


  BaseEngine.prototype.compile = function(source) {
    throw new Error("must be overridden");
  };

  return BaseEngine;

})();

module.exports = BaseEngine;