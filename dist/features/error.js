"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrors = exports.default = exports.clear = exports.add = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _toolkit = require("@reduxjs/toolkit");

var _validation = require("../utils/validation");

/**
 * Retrieves, in validation object, errors corresponding to id passed in parameter and adds them to error state 
 * @function 
 * @param {string} inputId - input id 
 * @see errorAction.add 
 * @see validation
 */
var getErrors = function getErrors(inputId) {
  return function (dispatch) {
    if (_validation.validation.error.length > 0) {
      _validation.validation.error.forEach(function (err) {
        return err.output === inputId && dispatch(actions.add(err));
      });

      _validation.validation.clearError();
    }
  };
};

exports.getErrors = getErrors;
var initialState = {
  status: "empty",
  error: {}
};
/**
 * @typedef {object} error 
 * @description Redux component in charge of react Error component state - state : { status: {string}, error: {object} } 
 * @component 
 * @property {function} add - Add an error 
 * @property {function} clear - Remove errors encountered by a component 
 */

var _createSlice = (0, _toolkit.createSlice)({
  name: "error",
  initialState: initialState,
  reducers: {
    /**
     * Add an error to error state 
     * @memberof error
     * @param {object} errorObject - contains output, what and why attributes 
     * @example `errorAction.add( errorObject = { what: "date", why: "tooShort", output: "inputId"} )` 
     */
    add: {
      /**
       * @param {object} errorObject 
       * @param {string} errorObject.output - output box id 
       * @param {string} errorObject.what - element concerned by the error 
       * @param {string} errorObject.why - why an error is thrown
       * @memberof error.add
       */
      prepare: function prepare(errorObject) {
        return {
          payload: {
            errorObject: errorObject
          }
        };
      },
      reducer: function reducer(draft, action) {
        if (!action.payload.errorObject || !action.payload.errorObject.what && !action.payload.errorObject.why && !action.payload.errorObject.output) {
          console.error("errorObject must be object contains what and why attributes");
          return;
        }

        var error = action.payload.errorObject;
        draft.error[error.output] = Array.isArray(draft.error[error.output]) ? [error].concat((0, _toConsumableArray2.default)(draft.error[error.output])) : [error];
        draft.status = draft.status === "empty" ? 1 : draft.status + 1;
        return;
      }
    },

    /**
     * Remove errors encountered by a component 
     * @memberof error 
     * @example `errorAction.clear("inputId")` 
     */
    clear: {
      /**
       * @param {string} id - component id concerned by error(s) 
       * @memberof param.clear
       */
      prepare: function prepare(id) {
        return {
          payload: {
            id: id
          }
        };
      },
      reducer: function reducer(draft, action) {
        var id = action.payload.id;

        if (draft.error[id]) {
          draft.status = draft.error[id].length === draft.status ? "empty" : parseInt(draft.status - draft.error[id].length);
          delete draft.error[id];
        }

        return;
      }
    }
  }
}),
    actions = _createSlice.actions,
    reducer = _createSlice.reducer;

var add = actions.add,
    clear = actions.clear;
exports.clear = clear;
exports.add = add;
var _default = reducer;
exports.default = _default;