define ["../../core/views/base", "../../core/views/container", "../../core/views/input/select", "../core/templates", "../core/modelLocator", "../../core/i18n/translate"], (View, ContainerView, SelectInputView, templates, modelLocator, t) ->
  
  class AddClassView extends View

    ###
    ###

    classyears: [{
      value: 2005
    }]


    ###
    ###

    title: t("Add Class")

    ###
    ###


    template: templates.addClass


    ###
    ###

    children: {
      "#select-class-year-container": SelectInputView
    },


    ###
    ###

    init: () ->
      super()


  


