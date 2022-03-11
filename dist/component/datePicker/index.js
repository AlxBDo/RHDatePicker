"use strict";

var _interopRequireWildcard3 = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/interopRequireWildcard"));

var _react = _interopRequireWildcard3(require("react"));

var _reactRedux = require("react-redux");

var _datePickerParams = require("../../utils/datePickerParams");

var _validation = require("../../utils/validation");

var _style = require("../../style");

var errorAction = _interopRequireWildcard3(require("../../features/error"));

var _selectors = require("../../utils/selectors");

var paramsAction = _interopRequireWildcard3(require("../../features/params"));

var selectedDateAction = _interopRequireWildcard3(require("../../features/selectedDate"));

var Error = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2.default)(require("../error"));
  });
});
var Calendar = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2.default)(require("../calendar"));
  });
});
/**
 * Display label, input and calendar. Controls input format and formats output value. 
 * @component 
 * @param {object} props - object containing attributes: inputId, label, evenFunction (optional) and htmlClass (optional)
 * @param {string} props.inputId - accepts alphanumeric characters and hyphen 
 * @param {object} props.deadlines - contains min and max attributes
 * @example `deadlines = { max: 2022-02-22, min: 1940-06-18 }`
 * @param {string} props.label - accepts alphanumeric characters, hyphen, space and apostrophe
 * @param {object} props.eventFunction - contains function to apply to events
 * @example `eventFunction = { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }`
 * @param {object} props.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example `htmlClass = { container: "container-class", input: "input-class", error: "error-class" }`
 * @param {string} props.valueFormat - output format of DatePicker input value - Accept : "array", "dateObject" = Date(), "number", "string"
 * @param {string} props.type - define input type to generate - Accept : "date", "datePeriod", "dateTime", "dateTimePeriod", "time", "timePeriod"
 * @param {object} props.colors - define colors used by component
 * @example `colors = { dark: "#302f2f", light: "#f2f2ef", error: "#e55a44", advice: "#75B74E"}`  
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
  var error = (0, _reactRedux.useSelector)((0, _selectors.selectError)());

  if (baseId !== "paramError" && _datePickerParams.datePickerParams.label[baseId]) {
    if (!params.checked.includes(inputId)) {
      dispatch(paramsAction.init(inputId));
      dispatch(paramsAction.setDisplay(_datePickerParams.datePickerParams.id[baseId].modal, false));
    }

    if (selectedDate.status === "empty" && !selectedDate.day) {
      dispatch(selectedDateAction.init(baseId, type));
    }
  }
  /**
   * contains the functions to be executed following the events
   */


  var eventFunctionHandler = {
    /**
     * Executes the functions provided by the eventFunction parameter of the DatePicker component 
     * as well as those for controlling the format of the input value
     * @method 
     * @memberof eventFunctionHandler
     * @param {object} e - event 
     * @param {string} eventName - accept onBlur, onChange or onClick 
     */
    paramsFunction: function paramsFunction(e, eventName) {
      if (eventName === "onChange") {
        dispatch(errorAction.clear(baseId));
      }

      if (!error.error[baseId]) {
        _datePickerParams.datePickerParams.listen(e, eventName, baseId);

        dispatch(errorAction.getErrors(baseId));
      }
    },

    /**
     * Provide the function to execute at the onBlur event
     * @method 
     * @memberof eventFunctionHandler
     * @param {object} e - event
     */
    blur: function blur(e) {
      return eventFunctionHandler.paramsFunction(e, "onBlur");
    },

    /**
     * Provide the function to execute at the onChange event
     * @method 
     * @memberof eventFunctionHandler
     * @param {object} e - event
     */
    change: function change(e) {
      return eventFunctionHandler.paramsFunction(e, "onChange");
    },

    /**
     * Provide the function to execute at the onClick event
     * @method 
     * @memberof eventFunctionHandler
     * @param {object} e - event
     */
    click: function click(e) {
      e.preventDefault();
      dispatch(paramsAction.updateDisplay(_datePickerParams.datePickerParams.id[baseId].modal, true));
      eventFunctionHandler.paramsFunction(e, "onClick");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_style.DatePickerContainer, null, baseId !== "paramError" && _datePickerParams.datePickerParams.label[baseId] && /*#__PURE__*/_react.default.createElement("div", {
    className: _datePickerParams.datePickerParams.htmlClass[baseId].container && _datePickerParams.datePickerParams.htmlClass[baseId].container
  }, /*#__PURE__*/_react.default.createElement("label", {
    "data-testid": "date-picker-label",
    htmlFor: baseId
  }, _datePickerParams.datePickerParams.label[baseId]), /*#__PURE__*/_react.default.createElement("div", {
    className: "date-picker-input"
  }, /*#__PURE__*/_react.default.createElement(_style.DatePickerInput, {
    type: "text",
    "data-testid": "date-picker-input",
    id: baseId,
    name: baseId,
    pattern: _datePickerParams.datePickerParams.format[baseId].pattern,
    placeholder: _datePickerParams.datePickerParams.format[baseId].placeholder,
    className: _datePickerParams.datePickerParams.htmlClass[baseId].input && "".concat(_datePickerParams.datePickerParams.htmlClass[baseId].input),
    onChange: eventFunctionHandler.change,
    onClick: eventFunctionHandler.click,
    onBlur: eventFunctionHandler.blur,
    $long: _datePickerParams.datePickerParams.is[baseId].dateTime,
    $color: _style.style.color(),
    $backgroundColor: _style.style.backgroundColor(),
    required: true
  }), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react.default.createElement("div", null, "Loading Calendar...")
  }, /*#__PURE__*/_react.default.createElement(Calendar, {
    baseId: baseId,
    displayBox: params.display[_datePickerParams.datePickerParams.id[baseId].modal],
    type: type
  })), _datePickerParams.datePickerParams.is[baseId].period && /*#__PURE__*/_react.default.createElement(_style.DatePickerInput, {
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
    $color: _style.style.color(),
    $backgroundColor: _style.style.backgroundColor(),
    required: true
  }))), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react.default.createElement("div", null, "Loading Error...")
  }, /*#__PURE__*/_react.default.createElement(Error, {
    dialogBoxId: baseId,
    htmlClass: _datePickerParams.datePickerParams.htmlClass[baseId].error && _datePickerParams.datePickerParams.htmlClass[baseId].error
  })));
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