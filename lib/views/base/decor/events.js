// Generated by CoffeeScript 1.6.3
var BaseDecorator, EventsDecorator, disposable, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

disposable = require("disposable");

BaseDecorator = require("./base");

EventsDecorator = (function(_super) {
  __extends(EventsDecorator, _super);

  function EventsDecorator() {
    this.remove = __bind(this.remove, this);
    this.render = __bind(this.render, this);
    _ref = EventsDecorator.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  EventsDecorator.prototype.init = function() {
    EventsDecorator.__super__.init.call(this);
    this.events = this.options;
    this.view.once("render", this.render);
    return this.view.once("remove", this.remove);
  };

  /*
  */


  EventsDecorator.prototype.render = function() {
    var e, selector, _results;
    e = this._events();
    this._disposeBindings();
    this._disposable = disposable.create();
    _results = [];
    for (selector in e) {
      _results.push(this._addBinding(selector, e[selector]));
    }
    return _results;
  };

  /*
  */


  EventsDecorator.prototype.remove = function() {
    return this._disposeBindings();
  };

  /*
  */


  EventsDecorator.prototype._addBinding = function(selector, viewMethod) {
    var action, actions, cb, elements, lowerActions, selectorParts, selectors, _fn, _i, _len, _ref1,
      _this = this;
    selectorParts = selector.split(" ");
    actions = selectorParts.shift().split(/\|/g).join(" ");
    selectors = selectorParts.join(",");
    cb = function() {
      var ref;
      if (typeof viewMethod === "function") {
        ref = viewMethod;
      } else {
        ref = _this.view[viewMethod] || _this.view.get(viewMethod);
      }
      return ref.apply(_this.view, arguments);
    };
    if (!selectors.length) {
      elements = this.view.$();
    } else {
      elements = this.view.$(selectors);
    }
    elements.bind(lowerActions = actions.toLowerCase(), cb);
    _ref1 = actions.split(" ");
    _fn = function(action) {
      return _this._disposable.add(_this.view.on(action, function() {
        return cb.apply(this, [$.Event(action)].concat(Array.prototype.slice.call(arguments)));
      }));
    };
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      action = _ref1[_i];
      _fn(action);
    }
    return this._disposable.add(function() {
      return elements.unbind(lowerActions, cb);
    });
  };

  /*
  */


  EventsDecorator.prototype._disposeBindings = function() {
    if (!this._disposable) {
      return;
    }
    this._disposable.dispose();
    return this._disposable = void 0;
  };

  /*
  */


  EventsDecorator.prototype._events = function() {
    return this.events;
  };

  EventsDecorator.getOptions = function(view) {
    return view.events;
  };

  EventsDecorator.decorate = function(view, options) {
    return new EventsDecorator(view, options);
  };

  return EventsDecorator;

})(BaseDecorator);

module.exports = EventsDecorator;
