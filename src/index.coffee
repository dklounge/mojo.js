View     = require "./views"
mediator = require "./mediator"
bindable = require "bindable"
models   = require "./models"

module.exports = 
  View      : View
  mediator  : mediator
  bindable  : bindable
  models    : models
  decorator : View.decorator
  use       : (plugin) -> plugin module.exports

if typeof window isnt "undefined"
  window.mojo = module.exports