define ["./base", "rivets", "dref"], (BaseViewDecorator, rivets, dref) ->



  rivets.configure({
    adapter: {
      subscribe: (obj, keypath, callback) ->
        obj.bind keypath.replace(/,/g, "."), callback

      unsubscribe: (obj, keypath, callback) ->
        #if obj.on
        #  obj.off "change:" + keypath.replace(/,/g, "."), callback

      read: (obj, keypath) ->
        obj.get keypath.replace(/,/g, ".")

      publish: (obj, keypath, value) ->
        obj.set keypath.replace(/,/g, "."), value
    }
  });

  rivets.formatters.negate = (value) -> not value

  
  class BindingsDecorator extends BaseViewDecorator

    ###
    ###

    load: (callback) ->
      @_setupExplicitBindings() if @view.bindings
      callback()

    ###
    ###

    render: (callback) ->
      rivets.bind @view.el, { data: @view }
      callback()

    ###
    ###

    _setupExplicitBindings: () ->
      bindings = @view.bindings

      @_setupBinding key, bindings[key] for key of bindings

    ###
    ###

    _setupBinding: (property, to) ->
      keyParts = property.split " "

      if typeof to is "function" 
        oldTo = to
        to = () =>
          oldTo.apply @view, arguments


      for keyPart in keyParts
        @view.bind(keyPart).to to





  BindingsDecorator.test = (view) -> true

  BindingsDecorator