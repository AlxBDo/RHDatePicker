"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _datePickerParams = require("../../utils/datePickerParams");

var _validation = require("../../utils/validation");

var _style = require("../../style");

var _error = _interopRequireDefault(require("../error"));

var _calendar = _interopRequireDefault(require("../calendar"));

var errorAction = _interopRequireWildcard(require("../../features/error"));

var _selectors = require("../../utils/selectors");

var paramsAction = _interopRequireWildcard(require("../../features/params"));

var selectedDateAction = _interopRequireWildcard(require("../../features/selectedDate"));

/**
 * Check and display input type date
 * @param {object} props - object containing attributes: inputId, label, evenFunction (optional) and htmlClass (optional)
 * @example { inputId: "my-input-id", label: "My input id label", evenFunction: {}, htmlClass: {} }
 * @param {string} props.inputId - accepts alphanumeric characters and hyphen
 * @param {string} props.label - accepts alphanumeric characters, hyphen, space and apostrophe
 * @param {object} props.eventFunction - contains function to apply to events
 * @example { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }
 * @param {object} props.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example { container: "container-class", input: "input-class", error: "error-class" }
 * @param {string} props.valueFormat - output format of DatePicker input value - Accept : "array", "dateObject" = Date(), "number", "string"
 * @param {string} props.type - define input type to generate - Accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod"
 * @param {object} props.colors - define colors used by component
 * @example { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}  
 * @returns {object}
 */
var DatePicker = function DatePicker(props) {
  var inputId = props.inputId,
      label = props.label,
      deadlines = props.deadlines,
      _props$eventFunction = props.eventFunction,
      eventFunction = _props$eventFunction === void 0 ? {} : _props$eventFunction,
      _props$htmlClass = props.htmlClass,
      htmlClass = _props$htmlClass === void 0 ? {} : _props$htmlClass,
      valueFormat = props.valueFormat,
      colors = props.colors,
      type = props.type;
  var baseId = _validation.validation.checkId(inputId, "paramError") ? inputId : "paramError";

  _datePickerParams.datePickerParams.initComponentParams(baseId, label, deadlines, eventFunction, htmlClass, valueFormat, type, colors);

  var dispatch = (0, _reactRedux.useDispatch)();
  var params = (0, _reactRedux.useSelector)((0, _selectors.selectParams)());
  var selectedDate = (0, _reactRedux.useSelector)((0, _selectors.selectSelectedDate)(baseId));
  dispatch(errorAction.getErrors(baseId));

  if (baseId !== "paramError" && _datePickerParams.datePickerParams.label[baseId]) {
    if (!params.checked.includes(inputId)) {
      dispatch(paramsAction.init(inputId));
      dispatch(paramsAction.setDisplay(_datePickerParams.datePickerParams.id[baseId].modal, false));
    }

    if (selectedDate.status === "default" && !selectedDate.day) {
      dispatch(selectedDateAction.init(baseId, type));
    }
  }

  var eventFunctionHandler = {
    paramsFunction: function paramsFunction(e, eventName) {
      dispatch(errorAction.clear(baseId));

      _datePickerParams.datePickerParams.listen(e, eventName, baseId);

      dispatch(errorAction.getErrors(baseId));
    },
    blur: function blur(e) {
      return eventFunctionHandler.paramsFunction(e, "onBlur");
    },
    change: function change(e) {
      return eventFunctionHandler.paramsFunction(e, "onChange");
    },
    click: function click(e) {
      e.preventDefault();
      dispatch(paramsAction.updateDisplay(_datePickerParams.datePickerParams.id[baseId].modal, true));
      eventFunctionHandler.paramsFunction(e, "onClick");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_style.DatePickerContainer, null, baseId !== "paramError" && _datePickerParams.datePickerParams.label[baseId] && /*#__PURE__*/_react.default.createElement("div", {
    className: _datePickerParams.datePickerParams.htmlClass[baseId].container && _datePickerParams.datePickerParams.htmlClass[baseId].container
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: baseId
  }, _datePickerParams.datePickerParams.label[baseId]), /*#__PURE__*/_react.default.createElement("div", {
    className: "date-picker-input"
  }, /*#__PURE__*/_react.default.createElement(_style.DatePickerInput, {
    type: "text",
    id: baseId,
    name: baseId,
    pattern: _datePickerParams.datePickerParams.format[baseId].pattern,
    placeholder: _datePickerParams.datePickerParams.format[baseId].placeholder,
    className: _datePickerParams.datePickerParams.htmlClass[baseId].input && "".concat(_datePickerParams.datePickerParams.htmlClass[baseId].input),
    onChange: eventFunctionHandler.change,
    onClick: eventFunctionHandler.click,
    onBlur: eventFunctionHandler.blur,
    $long: _datePickerParams.datePickerParams.is[baseId].dateTime,
    required: true
  }), /*#__PURE__*/_react.default.createElement(_calendar.default, {
    baseId: baseId,
    displayBox: params.display[_datePickerParams.datePickerParams.id[baseId].modal],
    type: type
  }), _datePickerParams.datePickerParams.is[baseId].period && /*#__PURE__*/_react.default.createElement(_style.DatePickerInput, {
    type: "text",
    id: "".concat(baseId, "-end"),
    name: "".concat(baseId, "-end"),
    pattern: _datePickerParams.datePickerParams.format[baseId].pattern,
    placeholder: _datePickerParams.datePickerParams.format[baseId].placeholder,
    className: _datePickerParams.datePickerParams.htmlClass[baseId].input && "".concat(_datePickerParams.datePickerParams.htmlClass[baseId].input),
    onChange: eventFunctionHandler.change,
    onClick: eventFunctionHandler.click,
    onBlur: eventFunctionHandler.blur,
    $long: _datePickerParams.datePickerParams.is[baseId].dateTime,
    required: true
  }))), /*#__PURE__*/_react.default.createElement(_error.default, {
    dialogBoxId: baseId,
    htmlClass: _datePickerParams.datePickerParams.htmlClass[baseId].error && _datePickerParams.datePickerParams.htmlClass[baseId].error
  }));
};

DatePicker.defaultProps = {
  valueFormat: "number",
  colors: {
    dark: "#302f2f",
    light: "#f2f2ef"
  },
  type: "dateTime"
};
var _default = DatePicker;
exports.default = _default;