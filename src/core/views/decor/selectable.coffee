define ["../collection", "underscore", "type-component"], (ViewCollection, _, type) ->
  
  class SelectableDecorator extends ViewCollection

    ###
    ###
    
    constructor: (@view) ->
      super()
      @reset @_setupControllers()
      for controller in @source()
        @view.emit @name, controller

    ###
    ###

    _setupControllers: () ->
      ops = @_options()
      return [@_newController(_.extend(ops, { _name: @name, section: "html" }))] if @_isSingle ops
      _controllers = []
      for property of ops
        options  = ops[property]
        options._name = property
        options.section = "section.#{property}"
        
        _controllers.push @[property] = controller = @_newController options

      _controllers

    ###
    ###

    _options: () -> @view[@name]

    ###
    ###

    _newController: (options) ->
      clazz = @controllerClass
      controller = new clazz @, options
      @view.set(options._name, controller) 
      @view[options._name] = controller
      controller

    ###
    ###

    _isSingle: (options) ->
      return true if type(options) is "array"
      for key of options
        v = options[key]
        if type(v) isnt "object"
          return true

      return false


  SelectableDecorator