define ["./base", "rivets", "dref"], (BaseViewDecorator, rivets, dref) ->



  rivets.configure({
    adapter: {
      subscribe: (obj, keypath, callback) ->
        if obj.on
          obj.on "change:" + keypath.replace(/,/g, "."), callback

      unsubscribe: (obj, keypath, callback) ->
        if obj.on
          obj.off "change:" + keypath.replace(/,/g, "."), callback

      read: (obj, keypath) ->
        console.log keypath, obj
        obj.get keypath.replace(/,/g, ".")

      publish: (obj, keypath, value) ->
        obj.set keypath.replace(/,/g, "."), value
    }
  });

  rivets.formatters.negate = (value) -> not value

  
  class BindingsDecorator extends BaseViewDecorator

    ###
    ###

    render: (callback) ->
      rivets.bind @view.el, { data: @view }
      callback()




  BindingsDecorator.test = (view) -> true

  BindingsDecorator