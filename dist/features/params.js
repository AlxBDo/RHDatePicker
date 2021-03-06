"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDisplay = exports.setDisplay = exports.init = exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  status: "void",
  display: {},
  checked: []
};
/**
 * @typedef {object} params 
 * @component 
 * @description Redux component in charge of params state - state : { status: {string}, display: {object}, checked: {array} }
 * @property {function} init - Initializes state params of element corresponding to id passed as parameter 
 * @property {function} setDisplay - Manages display state of element corresponding to id passed in 1st parameters 
 * @property {function} updateDisplay - Update display state of element corresponding to id passed in 1st parameters 
 */

var _createSlice = (0, _toolkit.createSlice)({
  name: "params",
  initialState: initialState,
  reducers: {
    /**
     * Initializes state params of element corresponding to id passed as parameter 
     * @memberof params 
     * @param {string} id 
     * @example `paramsAction.init( {string} id )`
     */
    init: {
      prepare: function prepare(id) {
        return {
          payload: {
            id: id
          }
        };
      },
      reducer: function reducer(draft, action) {
        var id = action.payload.id;

        if (id !== "paramError") {
          draft.checked = [id].concat((0, _toConsumableArray2.default)(draft.checked));
          draft.status = "defined";
        }

        return;
      }
    },

    /**
     * Manages display state of element corresponding to id passed in 1st parameters
     * @memberof params 
     * @param {string} id 
     * @param {boolean} value - true : element is displayed 
     * @example `paramsAction.setDisplay( {string} id, {boolean} value )`
     */
    setDisplay: {
      prepare: function prepare(id) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return {
          payload: {
            id: id,
            value: value
          }
        };
      },
      reducer: function reducer(draft, action) {
        var id = action.payload.id;
        draft.display[id] = action.payload.value;
        return;
      }
    },

    /**
     * Update display state of element corresponding to id passed in 1st parameters
     * @memberof params 
     * @param {string} id 
     * @param {boolean} value - true : element is displayed 
     * @example `paramsAction.updatetDisplay( {string} id, {boolean} value )`
     */
    updateDisplay: {
      prepare: function prepare(id, value) {
        return {
          payload: {
            id: id,
            value: value
          }
        };
      },
      reducer: function reducer(draft, action) {
        draft.display[action.payload.id] = action.payload.value;
        return;
      }
    }
  }
}),
    actions = _createSlice.actions,
    reducer = _createSlice.reducer;

var init = actions.init,
    setDisplay = actions.setDisplay,
    updateDisplay = actions.updateDisplay;
exports.updateDisplay = updateDisplay;
exports.setDisplay = setDisplay;
exports.init = init;
var _default = reducer;
exports.default = _default;