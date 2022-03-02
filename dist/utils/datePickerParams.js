"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePickerParams = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _validation = require("./validation");

var _style = require("../style");

/**
 * Provides object to define "is" attribute
 * @param {boolean} isDate 
 * @param {boolean} isDateTime 
 * @param {boolean} isPeriod 
 * @param {boolean} isTime 
 * @returns {object} 
 */
var getIsDefaultObject = function getIsDefaultObject(isDate, isDateTime, isPeriod, isTime) {
  return {
    date: isDate,
    dateTime: isDateTime,
    period: isPeriod,
    time: isTime
  };
};
/**
 * @typedef {object} datePickerParams
 * @description Store necessary informations and functions to execute DatePicker component
 * @property {object} id - Store id 
 * @property {object} is - Store "is" object. Contains date, dateTime, period and time attributes. 
 * @example `datePickerParams.is = { date: true, dateTime: false, period: true, time: false }`
 * @property {object} deadlines - Store deadlines applied to the DatePicker component 
 * @example `datePickerParams.deadlines = { max: 2022-02-24, min: 2022-01-01 }` 
 * @property {function} addId - Add ids to "id" attribute 
 * @property {object} eventFunction - Stores functions to be executed when events are triggered 
 * @property {object} format - Store format of input and output values 
 * @property {function} getTimeSelectId - Provide time select id 
 * @property {object} htmlClass - Stores html class provided as a parameter of DatePicker component. Use to define className 
 * @property {object} label - Store input label provided as a parameter of DatePicker component. Use to define label text 
 * @property {function} initComponentParams - Initializes the attributes containing the component parameters 
 * @property {function} initIdHtml - Initializes the html ids necessary to component operations 
 * @property {function} listen - Execute the functions corresponding to the eventName parameter 
 * @property {function} setEventFunction - Check and store the event functions passed as a parameter of the DatePicker component 
 * @property {function} setHtmlClass - Check and store html class passed as a parameter of the DatePicker component 
 * @property {function} setInputId - Check and store the input id passed as a parameter of the DatePicker component
 * @property {function} setLabel - Check and store the input label passed as a parameter of the DatePicker component
*/


var datePickerParams = {
  id: {},
  is: {},
  deadlines: {},

  /**
   * Add ids to "id" attribute
   * @param {string} baseId - DatePicker input id 
   * @param {object} idObject 
   * @example { hoursStartSelect: {string}, ... }
   */
  addId: function addId(baseId, idObject) {
    return datePickerParams.id[baseId] = idObject;
  },
  eventFunction: {
    /**
     * Checks the value received and executes the function, provided as a DatePicker parameter, corresponding to the triggered event
     * @param {string} baseId - DatePicker input id
     * @param {string | number} value 
     * @param {string} eventFunctionName 
     */
    execute: function execute(baseId, value, eventFunctionName) {
      _validation.validation.clearError();

      var valueLength = value.length;
      var type = datePickerParams.format[baseId].type.indexOf("date") >= 0 ? datePickerParams.format[baseId].type.indexOf("ime") >= 0 ? "dateTime" : "date" : "time";
      var expectedLenght = _validation.validation.allowedLength[type].min;

      if (eventFunctionName === "onChange" && valueLength < expectedLenght) {
        value && _validation.validation.checkInputValue(value, baseId, type, datePickerParams.deadlines[baseId]);
        value = false;
      } else if (valueLength >= expectedLenght || eventFunctionName === "onBlur" && valueLength > 0) {
        value = datePickerParams.format[baseId].output !== "number" ? datePickerParams.format[baseId].output(_validation.validation.checkInputValue(value, baseId, type, datePickerParams.deadlines[baseId], true)) : _validation.validation.checkInputValue(value, baseId, type, datePickerParams.deadlines[baseId], true);
      } else {
        value = false;
      }

      datePickerParams.eventFunction[baseId][eventFunctionName] && datePickerParams.eventFunction[baseId][eventFunctionName](value);
    }
  },
  format: {},

  /**
   * Provides time select id 
   * @memberof datePickerParams 
   * @param {string} baseId - DatePicker input id
   * @param {string} selectName - time select name (is equivalent to id) 
   * @param {string | boolean} startOrEnd - defines if it is an end time, a start time or neither 
   * @returns {string} timeSelectId
   */
  getTimeSelectId: function getTimeSelectId(baseId, selectName) {
    var startOrEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return datePickerParams.id[baseId]["".concat(selectName).concat(startOrEnd ? startOrEnd.substring(0, 1).toUpperCase() + startOrEnd.substring(1) : "", "Select")];
  },
  htmlClass: {},
  label: {},

  /**
   * Initializes the attributes containing the component parameters
   * @memberof datePickerParams 
   * @param {string} inputId 
   * @param {string} label 
   * @param {object} deadlines 
   * @param {object} eventFunction 
   * @param {object} htmlClass 
   * @param {string} dateFormat 
   * @param {string} type 
   * @param {object} colors 
   */
  initComponentParams: function initComponentParams(inputId, label, deadlines, eventFunction, htmlClass, dateFormat, type) {
    var colors = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    if (!datePickerParams.is[inputId]) {
      var indexTime = type.indexOf("ime");
      var isTime = indexTime > 0;
      var isDateTime = isTime && indexTime !== 1 ? true : false;
      datePickerParams.is[inputId] = getIsDefaultObject(type.indexOf("date") === 0, isDateTime, type.indexOf("Period") > 3, isTime);
    }

    datePickerParams.initIdHtml(inputId, datePickerParams.is[inputId].period);
    datePickerParams.setLabel(inputId, label);
    datePickerParams.deadlines[inputId] = deadlines;
    datePickerParams.setEventFunction(inputId, eventFunction);
    datePickerParams.setHtmlClass(inputId, htmlClass);
    datePickerParams.format[inputId] = (0, _objectSpread2.default)({
      type: type
    }, _validation.validation.formats.get(datePickerParams.is[inputId].dateTime ? "dateTime" : datePickerParams.is[inputId].date ? "date" : "time", dateFormat));

    if (!_style.style.colors.dark) {
      _style.style.setColors(_validation.validation.checkColor(colors.dark, inputId), _validation.validation.checkColor(colors.light, inputId), colors.advice && _validation.validation.checkColor(colors.advice, inputId), colors.error && _validation.validation.checkColor(colors.error, inputId));
    }
  },

  /**
   * Initializes the html ids necessary for the operation of the component
   * @memberof datePickerParams 
   * @param {string} baseId - DatePicker input id
   * @param {boolean} isPeriod 
   */
  initIdHtml: function initIdHtml(baseId, isPeriod) {
    var timeId = isPeriod ? {
      hoursStartSelect: baseId + "-start-hours-select",
      minutesDecStartSelect: baseId + "-start-minutesdec-select",
      minutesUniStartSelect: baseId + "-start-minutesuni-select",
      hoursEndSelect: baseId + "-end-hours-select",
      minutesDecEndSelect: baseId + "-end-minutesdec-select",
      minutesUniEndSelect: baseId + "-end-minutesuni-select"
    } : {
      hoursSelect: baseId + "-hours-select",
      minutesDecSelect: baseId + "-minutesdec-select",
      minutesUniSelect: baseId + "-minutesuni-select"
    };
    datePickerParams.addId(baseId, (0, _objectSpread2.default)({
      calendarDisplayBox: baseId + "-display-box",
      daySelect: baseId + "-day-select",
      modal: baseId + "-calendar-modal",
      monthSelect: baseId + "-month-select",
      monthSelectOpt: baseId + "-month-opt-",
      nextMonthBtn: baseId + "-next-month",
      prevMonthBtn: baseId + "-prev-month",
      selectedMonth: baseId + "-selected-month",
      selectedYear: baseId + "-selected-year",
      yearSelect: baseId + "-year-select",
      todayBtn: baseId + "-today"
    }, timeId));
  },

  /**
   * Execute the functions corresponding to the eventName parameter
   * @memberof datePickerParams 
   * @param {object} e - event
   * @param {string} eventName 
   * @param {string} baseId - DatePicker input id
   */
  listen: function listen(e, eventName, baseId) {
    return datePickerParams.eventFunction.execute(baseId, e.target.value, eventName);
  },

  /**
   * Check and store the event functions passed as a parameter of the DatePicker component
   * @memberof datePickerParams 
   * @param {string} baseId - DatePicker input id
   * @param {object} eventFunction 
   */
  setEventFunction: function setEventFunction(baseId, eventFunction) {
    if (typeof eventFunction === "object") {
      if (eventFunction.onBlur && !_validation.validation.checkType(eventFunction.onBlur, "eventFunction", baseId)) {
        return false;
      }

      if (eventFunction.onChange && !_validation.validation.checkType(eventFunction.onChange, "eventFunction", baseId)) {
        return false;
      }

      if (eventFunction.onClick && !_validation.validation.checkType(eventFunction.onClick, "eventFunction", baseId)) {
        return false;
      }

      datePickerParams.eventFunction[baseId] = eventFunction;
    }
  },

  /**
   * Check and store html class passed as a parameter of the DatePicker component
   * @memberof datePickerParams 
   * @param {string} baseId - DatePicker input id
   * @param {object} htmlClass 
   */
  setHtmlClass: function setHtmlClass(baseId, htmlClass) {
    if (typeof htmlClass === "object") {
      datePickerParams.htmlClass[baseId] = htmlClass;
    }
  },

  /**
   * Check and store the input id passed as a parameter of the DatePicker component
   * @memberof datePickerParams 
   * @param {string} id 
   */
  setInputId: function setInputId(id) {
    this.id.input = _validation.validation.checkId(id, "paramError") ? id : "paramError";
  },

  /**
   * Check and store the input label passed as a parameter of the DatePicker component
   * @memberof datePickerParams 
   * @param {string} baseId - DatePicker input id
   * @param {string} label 
   */
  setLabel: function setLabel(baseId, label) {
    if (_validation.validation.checkLabel(label, baseId)) {
      datePickerParams.label[baseId] = label;
    }
  }
};
exports.datePickerParams = datePickerParams;