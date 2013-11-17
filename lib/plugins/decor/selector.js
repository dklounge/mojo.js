// Generated by CoffeeScript 1.6.3
var SelectorDecorator;

SelectorDecorator = (function() {
  function SelectorDecorator() {}

  /*
  */


  SelectorDecorator.getOptions = function(view) {
    return !!view.prototype;
  };

  SelectorDecorator.decorate = function(view) {
    return view.$ = function(search) {
      var el;
      el = $(this.section.getChildNodes());
      if (arguments.length) {
        return el.find(search);
      }
      return el;
    };
  };

  return SelectorDecorator;

})();

module.exports = SelectorDecorator;