"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePickerParams = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _validation = require("./validation");

var _style = require("../style");

var getIsDefaultObject = function getIsDefaultObject(isDate, isDateTime, isPeriod, isTime) {
  return {
    date: isDate,
    dateTime: isDateTime,
    period: isPeriod,
    time: isTime
  };
};

var datePickerParams = {
  /**
   * store id
   */
  id: {},
  is: {},

  /**
   * store a new id
   * @param {string} name 
   * @param {string} value 
   */
  addId: function addId(baseId, idObject) {
    return datePickerParams.id[baseId] = idObject;
  },
  eventFunction: {
    execute: function execute(baseId, value, eventFunctionName) {
      _validation.validation.clearError();

      var valueLength = value.length;
      var type = datePickerParams.format[baseId].type.indexOf("date") >= 0 ? datePickerParams.format[baseId].type.indexOf("ime") >= 0 ? "dateTime" : "date" : "time";
      var expectedLenght = _validation.validation.allowedLength[type].min;

      if (eventFunctionName === "onChange" && valueLength < expectedLenght) {
        value && _validation.validation.checkInputValue(value, baseId, type);
        value = false;
      } else if (valueLength >= expectedLenght || eventFunctionName === "onBlur" && valueLength > 0) {
        value = datePickerParams.format[baseId].output !== "number" ? datePickerParams.format[baseId].output(_validation.validation.checkInputValue(value, baseId, type, true)) : _validation.validation.checkInputValue(value, baseId, type, true);
      } else {
        value = false;
      }

      datePickerParams.eventFunction[baseId][eventFunctionName] && datePickerParams.eventFunction[baseId][eventFunctionName](value);
    }
  },
  format: {},
  getTimeSelectId: function getTimeSelectId(baseId, selectName) {
    var startOrEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return datePickerParams.id[baseId]["".concat(selectName).concat(startOrEnd ? startOrEnd.substring(0, 1).toUpperCase() + startOrEnd.substring(1) : "", "Select")];
  },
  htmlClass: {},
  label: {},

  /**
   * initializes the attributes containing the component parameters
   * @param {string} inputId 
   * @param {string} label 
   * @param {object} eventFunction 
   * @param {object} htmlClass 
   */
  initComponentParams: function initComponentParams(inputId, label, eventFunction, htmlClass, dateFormat, type) {
    var calendarColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    if (!datePickerParams.is[inputId]) {
      var indexTime = type.indexOf("ime");
      var isTime = indexTime > 0;
      var isDateTime = isTime && indexTime !== 1 ? true : false;
      datePickerParams.is[inputId] = getIsDefaultObject(type.indexOf("date") === 0, isDateTime, type.indexOf("Period") > 3, isTime);
    }

    datePickerParams.initIdHtml(inputId, datePickerParams.is[inputId].period);
    datePickerParams.setLabel(inputId, label);
    datePickerParams.setEventFunction(inputId, eventFunction);
    datePickerParams.setHtmlClass(inputId, htmlClass);
    datePickerParams.format[inputId] = (0, _objectSpread2.default)({
      type: type
    }, _validation.validation.formats.get(datePickerParams.is[inputId].dateTime ? "dateTime" : datePickerParams.is[inputId].date ? "date" : "time", dateFormat));

    if (!_style.style.colors.dark) {
      _style.style.setColors(_validation.validation.checkColor(calendarColor.dark, inputId), _validation.validation.checkColor(calendarColor.light, inputId), calendarColor.advice && _validation.validation.checkColor(calendarColor.advice, inputId), calendarColor.error && _validation.validation.checkColor(calendarColor.error, inputId));
    }
  },

  /**
   * initializes the html ids necessary for the operation of the component
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
   * execute the functions corresponding to the eventName parameter
   * @param {event} e 
   * @param {string} eventName 
   */
  listen: function listen(e, eventName, baseId) {
    return datePickerParams.eventFunction.execute(baseId, e.target.value, eventName);
  },

  /**
   * check and store the event functions passed as a parameter of the DatePicker component
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
   * check and store html class passed as a parameter of the DatePicker component
   * @param {object} htmlClass 
   */
  setHtmlClass: function setHtmlClass(baseId, htmlClass) {
    if (typeof htmlClass === "object") {
      datePickerParams.htmlClass[baseId] = htmlClass;
    }
  },

  /**
   * check and store the input id passed as a parameter of the DatePicker component
   * @param {string} id 
   */
  setInputId: function setInputId(id) {
    this.id.input = _validation.validation.checkId(id, "paramError") ? id : "paramError";
  },

  /**
   * check and store the input label passed as a parameter of the DatePicker component
   * @param {string} label 
   */
  setLabel: function setLabel(baseId, label) {
    if (_validation.validation.checkLabel(label, baseId)) {
      datePickerParams.label[baseId] = label;
    }
  }
};
exports.datePickerParams = datePickerParams;