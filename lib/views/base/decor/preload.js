// Generated by CoffeeScript 1.6.3
var BaseDecor, PreloadDecorator, async, toarray,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseDecor = require("./base");

async = require("async");

toarray = require("toarray");

/*
 preloads a model, or set of models before
*/


PreloadDecorator = (function(_super) {
  __extends(PreloadDecorator, _super);

  /*
  */


  function PreloadDecorator(view, preload) {
    var pl;
    this.view = view;
    this._onRender = __bind(this._onRender, this);
    if (preload === true) {
      pl = ["model"];
    } else {
      pl = preload;
    }
    this.preload = toarray(pl);
    this.view.once("render", this._onRender);
  }

  /*
  */


  PreloadDecorator.prototype._onRender = function() {
    return this.view.callstack.push(function(next) {
      var _this = this;
      return async.forEach(this.preload, (function(property, next) {
        return _this.view.bind(property).to(function(model) {
          if (!model || !(model != null ? model.fetch : void 0)) {
            return next();
          }
          return model.fetch(next);
        }).once().now();
      }), next);
    });
  };

  /*
  */


  PreloadDecorator.getOptions = function(view) {
    return view.preload;
  };

  return PreloadDecorator;

})(BaseDecor);

module.exports = PreloadDecorator;