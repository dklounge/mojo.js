bindable = require "bindable"
State = require "./state"
flatstack = require "flatstack"

class StatesView extends require("../base")

  ###
  ###

  _init: () ->
    super()

    # the view states
    source = new bindable.Collection()
    source.enforceId false

    @set "source", source
    @bind("views", @_setViews).now()

  ###
  ###

  _setViews: (views) =>
    @source.reset views.map (stateOptions, i) => 
      new State @, stateOptions, i

    if @_states.rendered
      

  ###
  ###

  _onRender: () ->
    super()
    @bind("index", @_setIndex).now()
    @bind("currentName").to(@_setName).now()

  ###
   selects a state 
  ###

  select: (stateOrIndex) ->
    if typeof stateOrIndex is "number"
      @set "index", stateOrIndex
    else
      i = @source.indexOf stateOrIndex
      if ~i
        @select i

  ###
   Moves onto the next state
  ###

  next: () => @move()

  ###
   Moves to the previous state
  ###

  prev: () => @move -1 

  ###
  ###

  move: (position = 1) ->
    newIndex = @get("index") + position

    if newIndex < 0
      if @get("rotate")
        newIndex = @source.length - 1
      else
        newIndex = 0
        @emit "ended" 
        
    else if newIndex >= @source.length
      if @get("rotate")
        newIndex = 0
      else
        newIndex = @source.length - 1
        @emit "ended"

    @set "index", newIndex

  ###
  ###

  _setName: (name) =>
    for state, i in @source.source()
      if state.get("name") is name
        @set "index", i
        break

  ###
  ###

  _setIndex: (index) =>
    return if not @source.length


    @currentState?.set "selected", false
    oldState = @currentState

    self           = @
    state          = @currentState = @source.at index or 0
    isNew          = !state.hasView()
    newStateView   = state.getView()
    @linkChild newStateView


    if @get("inherit")
      newStateView.decorate { inherit: @get("inherit") }


    @currentState.set "selected", true

    @_displayListener?.dispose()

    if oldState and oldState isnt @currentState 
        oldState.hide()
    
    
    if isNew
      newStateView.render()
      @section.append newStateView.section
    else
      @currentState.show()



    @set "currentView", newStateView

  

module.exports = StatesView