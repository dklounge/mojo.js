comerr = require "comerr"
BaseViewDecorator = require "./base"
_ = require "underscore"
async = require "../../../utils/async"


class TransitionDecorator extends BaseViewDecorator

  ###
  ###

  init: () ->
    super()
    @transition = @options
    @view.once "render"   , @_onRender
    @view.once "rendered" , @_onRendered
    @view.once "remove"   , @_onRemove


  ###
  ###

  _onRender: () =>
    @view.$().css({opacity:0})

  ###
  ###

  _onRendered: () =>
    @_transitionAll "enter", callback

  ###
  ###

  _onRemove: () =>
    @view.$().css({opacity:1})
    # @view.callstack.push (next) ->
    #   @_transitionAll "exit", callback

  ###
  ###

  ###
  ###

  _transitionAll: (type, callback) ->
    async.forEach @_filterTransitions(type), ((transition, next) =>
      @_transition @_element(transition), transition[type], next
    ), callback

  ###
  ###

  _transition: (element, transition, callback) ->
    # if the element doesn't exist, then return an error
    return callback(new comerr.NotFound("element does not exist")) if not element.length

    if transition.from
      element.css transition.from

    element.transit transition.to or transition, callback

  ###
  ###

  _transitions: () ->
    transition = @transition
    if transition.enter or transition.exit
      return [transition]

    transitions = []

    for selector of transition
      trans = transition[selector]
      trans.selector = selector
      transitions.push trans


    transitions

  ###
  ###

  _filterTransitions: (type) ->
    return @_transitions().filter (trans) -> !!trans[type]

  ###
  ###

  _element: (transition) -> 
    selector = transition.selector or transition.el
    element = if selector then @view.$(selector) else @view.$()
    element.filter (index, element) ->
      element.nodeType is 1

  ###
  ###

  @getOptions : (view) -> view.transition
  @decorate   : (view, options) -> new TransitionDecorator view, options

 

module.exports = TransitionDecorator