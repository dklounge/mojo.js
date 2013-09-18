// Generated by CoffeeScript 1.6.3
var IsolatedDecorator, toarray, _;

toarray = require("toarray");

_ = require("underscore");

IsolatedDecorator = (function() {
  /*
  */

  function IsolatedDecorator(view, isolate) {
    this.view = view;
    console.log("ISO");
    this.view._isolate(isolate);
  }

  /*
  */


  IsolatedDecorator.getOptions = function(view) {
    return !!view.isolate;
  };

  IsolatedDecorator.decorate = function(view, isolate) {
    return new IsolatedDecorator(view, toarray(isolate));
  };

  return IsolatedDecorator;

})();

module.exports = IsolatedDecorator;