// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/base", "../core/templates"], function(View, templates) {
    var AddBehaviors;
    return AddBehaviors = (function(_super) {

      __extends(AddBehaviors, _super);

      function AddBehaviors() {
        return AddBehaviors.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      AddBehaviors.prototype.title = "Add Behaviors";

      /*
      */


      AddBehaviors.prototype.template = templates.addBehaviors;

      return AddBehaviors;

    })(View);
  });

}).call(this);