"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _style = require("../../style");

var _datePickerParams = require("../../utils/datePickerParams");

/**
 * Provides span option for CalendarBox list
 * @param {object} item 
 * @param {string} baseId - date picker input id
 * @returns {object} span html element
 */
function getCalendarOption(item, baseId) {
  return /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    key: "".concat(baseId, "-opt-").concat(item.name),
    id: _datePickerParams.datePickerParams.id[baseId][getSelectItemId(item.name)],
    $name: item.name,
    $type: item.type
  }, item.value && item.value);
}
/**
 * Provides span option for Calendar Select list
 * @param {string | number} textContent 
 * @param {string} id 
 * @param {boolean} isSelected 
 * @param {function} spanOnClickFunction 
 * @returns {object} span html element
 */


var getSpan = function getSpan(textContent, id) {
  var isSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var spanOnClickFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return /*#__PURE__*/_react.default.createElement("span", {
    key: "opt-".concat(id, "-").concat(textContent),
    id: id,
    className: isSelected ? "selected-option" : null,
    onClick: spanOnClickFunction ? spanOnClickFunction : null
  }, textContent);
};
/**
 * Corrects the value passed in parameter if it does not respect the minimum and maximum values
 * @param {number} value 
 * @param {number} maxValue 
 * @param {number} minValue 
 * @returns {number}
 */


function getSpanValue(value, maxValue, minValue) {
  return value > maxValue ? value - (maxValue + 1) : value < minValue ? value + maxValue + 1 : value;
}
/**
 * Provide the id of the html select tag
 * @param {string} name 
 * @returns {string}
 */


function getSelectItemId(name) {
  switch (name) {
    case "home":
      return "todayBtn";

    case "month":
      return "selectedMonth";

    case "next-month":
      return "nextMonthBtn";

    case "previous-month":
      return "prevMonthBtn";

    case "year":
      return "selectedYear";

    default:
      return false;
  }
}
/**
 * Scrolls through list values - onClick
 * @param {string} moreOrLess - if receive "more" increment the value of the list else do a decrement
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 */


function moveDateSelectList(moreOrLess, id, list, maxValue) {
  var minValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  updateDateSelectList(id, list, maxValue, minValue, moreOrLess === "more" ? parseInt(document.querySelector("div#".concat(id, " .selected-option")).textContent) - (parseInt(list.length / 2) - 1) : parseInt(document.querySelector("div#".concat(id, " .selected-option")).textContent) - (parseInt(list.length / 2) + 1));
}
/**
 * Scrolls through list values - onWheel
 * @param {object} e - event
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 */


function onWheelFunction(e, id, list, maxValue) {
  var minValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var selectedValue = parseInt(document.querySelector("div#".concat(id, " .selected-option")).textContent);
  var startValue = getSpanValue(e.deltaY > 0 ? selectedValue + 1 - parseInt(list.length / 2) : selectedValue - 1 - parseInt(list.length / 2), maxValue, minValue);
  updateDateSelectList(id, list, maxValue, minValue, startValue);
}
/**
 * modify span value of CalendarSelect
 * @param {string} id 
 * @param {array} list 
 * @param {number} maxValue 
 * @param {number} minValue 
 * @param {number} startValue 
 */


function updateDateSelectList(id, list, maxValue, minValue, startValue) {
  list.map(function (item, index) {
    document.getElementById("".concat(id, "-option-").concat(index)).textContent = getSpanValue(startValue + index, maxValue, minValue);
  });
}
/**
 * Display Calendar select
 * @component
 * @param {object} props 
 * @param {string} props.baseId - date picker input id
 * @param {string} props.className 
 * @param {array} props.list - list of values ​​or objects used to create the select
 * @param {number} props.maxValue - maximum value that the select can display
 * @param {number} props.minValue - minimum value that the select can display
 * @param {string} props.name
 * @param {object} props.onClickFunction - function apply to select 
 * @param {number} props.selectedValue - value display as selected
 * @param {function} props.spanOnClickFunction - function apply to option select    
 * @returns {object} 
 */


function CalendarSelect(props) {
  var baseId = props.baseId,
      className = props.className,
      list = props.list,
      maxValue = props.maxValue,
      minValue = props.minValue,
      name = props.name,
      onClickFunction = props.onClickFunction,
      selectedValue = props.selectedValue,
      spanOnClickFunction = props.spanOnClickFunction;

  var elementId = _datePickerParams.datePickerParams.id[baseId]["".concat(name, "Select")];
  /**
   * change selected value of select
   * @param {object} e - event
   */


  var updateDateSelectOnClickSpan = function updateDateSelectOnClickSpan(e) {
    e.stopPropagation();
    updateDateSelectList(elementId, list, maxValue, minValue, parseInt(e.target.textContent) - parseInt(list.length / 2));
  };

  return typeof list[0] === "object" ? /*#__PURE__*/_react.default.createElement(_style.CalendarBox, {
    $name: "option",
    onClick: onClickFunction
  }, list.map(function (item) {
    return getCalendarOption(item, baseId);
  })) : /*#__PURE__*/_react.default.createElement(_style.DateSelect, {
    $name: name,
    id: elementId,
    onClick: onClickFunction,
    onWheel: function onWheel(e) {
      return maxValue && onWheelFunction(e, elementId, list, maxValue, minValue);
    },
    className: className
  }, spanOnClickFunction && /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    id: "".concat(elementId, "-less-btn"),
    $name: "less",
    $type: "move-icon",
    onClick: function onClick() {
      return moveDateSelectList("less", elementId, list, maxValue, minValue);
    }
  }), list.map(function (item, index) {
    return getSpan(getSpanValue(Number.isInteger(item) ? item + index : item, maxValue, minValue), "".concat(elementId, "-option-").concat(index), selectedValue === item + index && true, spanOnClickFunction && updateDateSelectOnClickSpan);
  }), spanOnClickFunction && /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    id: "".concat(elementId, "-more-btn"),
    $name: "more",
    $type: "move-icon",
    onClick: function onClick() {
      return moveDateSelectList("more", elementId, list, maxValue, minValue);
    }
  }));
}

CalendarSelect.defaultProp = {
  className: null,
  maxValue: false,
  minValue: 0,
  selectedValue: false,
  spanOnClickFunction: false
};
var _default = CalendarSelect;
exports.default = _default;