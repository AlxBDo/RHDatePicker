"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CalendarSelect = _interopRequireDefault(require("./CalendarSelect"));

/**
 * Display time select for calendar form
 * @component
 * @param {object} props 
 * @param {string} props.baseId - date picker input id
 * @param {number} props.maxValue - maximum value that the select can display
 * @param {number} props.minValue - minimum value that the select can display
 * @param {string} props.name
 * @param {object} props.onClickFunction - function apply to select 
 * @param {boolean} props.reduceSize - true for small format   
 * @param {number} props.selectedValue - value display as selected 
 * @returns {object} 
 */
function TimeSelect(props) {
  var baseId = props.baseId,
      maxValue = props.maxValue,
      minValue = props.minValue,
      name = props.name,
      onClickFunction = props.onClickFunction,
      reduceSize = props.reduceSize,
      selectedValue = props.selectedValue;
  var list = reduceSize ? Array(3).fill(selectedValue - 1) : Array(7).fill(selectedValue - 3);
  return /*#__PURE__*/_react.default.createElement(_CalendarSelect.default, {
    baseId: baseId,
    className: "time-select",
    list: list,
    name: name,
    onClickFunction: onClickFunction,
    selectedValue: selectedValue,
    maxValue: maxValue,
    minValue: minValue,
    spanOnClickFunction: true
  });
}

TimeSelect.defaultProps = {
  maxValue: 9,
  minValue: 0,
  reduceSize: false,
  selectedValue: 0
};
var _default = TimeSelect;
exports.default = _default;