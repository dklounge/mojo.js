// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../list", "../base", "../../templates/factory", "dref"], function(ListView, View, templates, dref) {
    var SelectInputView;
    return SelectInputView = (function(_super) {

      __extends(SelectInputView, _super);

      function SelectInputView() {
        this._onSelectedItemChange = __bind(this._onSelectedItemChange, this);

        this._transformSelectItem = __bind(this._transformSelectItem, this);

        this._onLoaded = __bind(this._onLoaded, this);

        this._onAttached = __bind(this._onAttached, this);
        return SelectInputView.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      SelectInputView.prototype.template = templates.fromSource("<select name='{{view.name}}'></select>", {
        engine: "handlebars"
      });

      /*
      */


      SelectInputView.prototype.childrenElement = "select";

      /*
      */


      SelectInputView.prototype.childTemplate = templates.fromSource("<option value='{{value}}'>{{label}}</option>", {
        engine: "handlebars"
      });

      /*
      */


      SelectInputView.prototype.selectLabel = "Select";

      /*
      */


      SelectInputView.prototype.itemLabel = "label";

      /*
      */


      SelectInputView.prototype.itemValue = "_id";

      /*
      */


      SelectInputView.prototype.childViewClass = View;

      /*
      */


      SelectInputView.prototype.init = function() {
        SelectInputView.__super__.init.call(this);
        return this.children.splice(0, 0, new View({
          label: this.get("selectLabel")
        }));
      };

      /*
      */


      SelectInputView.prototype.events = {
        "change select": function(event) {
          var selected, selectedVal;
          selected = this.$(":selected");
          selectedVal = selected.val();
          if (!selectedVal.length) {
            return this.deselect();
          }
          return this.select(selected.index() - 1);
        }
      };

      /*
           Selects an item based on the index
      */


      SelectInputView.prototype.select = function(index) {
        if (!~index) {
          return this.deselect();
        }
        this.set("selectedItem", this.source.at(index));
        return this.element.trigger("data", {
          name: this.get("name"),
          value: this.get("selectedItem").value
        });
      };

      /*
           deselects the item
      */


      SelectInputView.prototype.deselect = function() {
        return this.set("selectedItem", null);
      };

      /*
      */


      SelectInputView.prototype._onAttached = function() {
        return SelectInputView.__super__._onAttached.call(this);
      };

      /*
      */


      SelectInputView.prototype._onLoaded = function() {
        SelectInputView.__super__._onLoaded.call(this);
        return this.bind("selectedItem", this._onSelectedItemChange);
      };

      /*
           transforms the source to something the drop menu can use
      */


      SelectInputView.prototype._transformSelectItem = function(item) {
        return {
          value: dref.get(item, this.get("itemValue")) || dref.get(item, this.get("itemLabel")),
          label: dref.get(item, this.get("itemLabel")),
          data: item
        };
      };

      /*
      */


      SelectInputView.prototype._createSource = function() {
        var source;
        source = SelectInputView.__super__._createSource.call(this);
        source.transform().map(this._transformSelectItem);
        return source;
      };

      /*
      */


      SelectInputView.prototype._onSelectedItemChange = function(item) {
        var index;
        index = 0;
        if (!item) {
          index = 0;
        } else {
          index = this.source.indexOf(item) + 1;
        }
        return this.$("select").children().eq(index).attr("selected", "selected");
      };

      return SelectInputView;

    })(ListView);
  });

}).call(this);
