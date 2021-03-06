// Generated by CoffeeScript 1.6.3
/*
 Resource manager

 janitor = new Janitor()

 janitor.addTimeout(setTimeout(fn, 10))
 janitor.add({
  dispose: () ->
 })

 janitor.dispose() # dispose everything
*/

var Janitor, type;

type = require("type-component");

Janitor = (function() {
  /*
  */

  function Janitor() {
    this._garbage = [];
  }

  /*
  */


  Janitor.prototype.add = function(disposable) {
    if (disposable.dispose) {
      return this._garbage.push(disposable);
    } else if (type(disposable) === "function") {
      return this._garbage.push({
        dispose: disposeable
      });
    }
  };

  /*
  */


  Janitor.prototype.addTimeout = function(timeout) {
    return this.add({
      dispose: function() {
        return clearTimeout(timeout);
      }
    });
  };

  /*
  */


  Janitor.prototype.addInterval = function(interval) {
    return this.add({
      dispose: function() {
        return clearInterval(interval);
      }
    });
  };

  /*
  */


  Janitor.prototype.dispose = function() {
    var disposable, _i, _len, _ref;
    _ref = this._garbage;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      disposable = _ref[_i];
      disposable.dispose();
    }
    return this._garbage = [];
  };

  return Janitor;

})();

module.exports = Janitor;
