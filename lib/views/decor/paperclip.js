// Generated by CoffeeScript 1.6.3
var PaperclipViewDecorator, paperclip, type;

paperclip = require("paperclip");

type = require("type-component");

PaperclipViewDecorator = (function() {
  /*
  */

  function PaperclipViewDecorator(view, template) {
    this.view = view;
    this.template = template;
    if (type(template) !== "function") {
      throw new Error("paper template must be a function for view \"" + this.view.constructor.name + "\"");
    }
    this.paper = paperclip.paper(this.template);
  }

  /*
  */


  PaperclipViewDecorator.prototype.load = function() {
    this.paper.load(this.view);
    return this.view.section.html(this.view.buffer.join(""));
  };

  /*
  */


  PaperclipViewDecorator.prototype.render = function() {
    var e;
    try {
      return this.paper.node.bind();
    } catch (_error) {
      e = _error;
      console.error("unable to bind paperclip template to " + (this._traceViewPath()));
      return console.error(e);
    }
  };

  /*
  */


  PaperclipViewDecorator.prototype._traceViewPath = function() {
    var cv, path;
    path = [];
    cv = this.view;
    while (cv) {
      path.unshift(cv.constructor.name);
      cv = cv._parent;
    }
    return path.join(".");
  };

  /*
  */


  PaperclipViewDecorator.getOptions = function(view) {
    return view.paper;
  };

  return PaperclipViewDecorator;

})();

module.exports = PaperclipViewDecorator;