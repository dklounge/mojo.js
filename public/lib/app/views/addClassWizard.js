// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/state", "../core/templates", "./addClass", "./addStudents", "./addBehaviors"], function(StateView, templates, AddClassView, AddStudentsView, AddBehaviorsView) {
    var AddClassWizardView;
    return AddClassWizardView = (function(_super) {

      __extends(AddClassWizardView, _super);

      /*
      */


      AddClassWizardView.prototype.template = templates.addClassWizard;

      /*
      */


      AddClassWizardView.prototype.childrenElement = ".modal-body";

      /*
      */


      AddClassWizardView.prototype.transition = {
        ".confirmation-dailog": {
          enter: {
            from: {
              opacity: 0,
              scale: 0.5
            },
            to: {
              opacity: 1,
              scale: 1
            }
          },
          exit: {
            to: {
              opacity: 0,
              scale: 1.5
            }
          }
        },
        ".modal-backdrop": {
          enter: {
            from: {
              opacity: 0
            },
            to: {
              opacity: 0.75
            }
          },
          exit: {
            to: {
              opacity: 0
            }
          }
        }
      };

      /*
      */


      AddClassWizardView.prototype.events = {
        "noMoreStates": "remove",
        "click .close .cancel-btn": "remove",
        "click .confirm-positive": "nextState"
      };

      /*
      */


      function AddClassWizardView() {
        AddClassWizardView.__super__.constructor.call(this, {
          states: [new AddClassView(), new AddStudentsView(), new AddBehaviorsView()]
        });
      }

      /*
      */


      AddClassWizardView.prototype.init = function() {
        AddClassWizardView.__super__.init.call(this);
        return this.glue("currentView.title", "title");
      };

      /*
      */


      AddClassWizardView.prototype._endOfStates = function() {
        return this.remove();
      };

      return AddClassWizardView;

    })(StateView);
  });

}).call(this);
