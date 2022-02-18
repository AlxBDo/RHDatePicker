"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validation = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _date4 = require("./date");

var _datePickerParams = require("./datePickerParams");

/**
 * Provides input and param check methods
 */
var validation = {
  error: [],
  addError: function addError(what, why, output) {
    var errorObject = {
      what: what,
      why: why,
      output: output
    };

    if (!validation.error.includes(errorObject)) {
      validation.error.push(errorObject);
    }

    return false;
  },

  /**
   * provides allowed length 
   * contains dateInput, id, label attributes
   */
  allowedLength: {
    color: {
      max: 23,
      min: 3
    },
    date: {
      max: 10,
      min: 10
    },
    dateTime: {
      max: 16,
      min: 16
    },
    id: {
      max: 25,
      min: 2
    },
    label: {
      max: 60,
      min: 4
    },
    time: {
      max: 5,
      min: 5
    }
  },

  /**
   * provides allowed type (return of typeof) 
   * contains eventFuntion attributes
   */
  allowedType: {
    eventFunction: "function"
  },
  checkColor: function checkColor(color, output) {
    return validation.checkString(color, "color", output);
  },
  checkFormat: function checkFormat(format) {
    return validation.formats.pattern[format] && validation.formats.placeholder[format] ? true : false;
  },

  /**
   * @see validation.idRegExp
   * @param {string} datePickerId 
   * @returns {boolean}
   */
  checkId: function checkId(datePickerId, output) {
    return validation.checkString(datePickerId, "id", output);
  },

  /**
   * @see validation.dateInputRegExp
   * @param {string} value - date format : YYYY-MM-DD 
   * @returns {boolean}
   */
  checkInputValue: function checkInputValue(value, output, type) {
    var limits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var strictValidation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    return validation.checkString(value, type, output, limits, strictValidation);
  },

  /**
   * @see validation.labelRegExp
   * @param {string} datePickerLabel
   * @returns {boolean}
   */
  checkLabel: function checkLabel(datePickerLabel, output) {
    return validation.checkString(datePickerLabel, "label", output);
  },
  checkLimits: function checkLimits(date, limits) {
    var strictValidation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var dateSplit = date.split("-");
    date = parseInt(dateSplit[0].length === 4 ? "".concat(dateSplit[0]).concat(dateSplit[1]).concat(dateSplit[2]) : "".concat(dateSplit[2]).concat(dateSplit[1]).concat(dateSplit[0]));

    if (limits.max) {
      var maxSplit = limits.max.split("-");
      var max = parseInt(maxSplit[0].length === 4 ? "".concat(maxSplit[0]).concat(maxSplit[1]).concat(maxSplit[2]) : "".concat(maxSplit[2]).concat(maxSplit[1]).concat(maxSplit[0]));

      if (date > max) {
        return false;
      }
    }

    if (strictValidation && limits.min) {
      var minSplit = limits.min.split("-");
      var min = parseInt(minSplit[0].length === 4 ? "".concat(minSplit[0]).concat(minSplit[1]).concat(minSplit[2]) : "".concat(minSplit[2]).concat(minSplit[1]).concat(minSplit[0]));

      if (date < min) {
        return false;
      }
    }

    return true;
  },

  /**
   * controls the length and format of the string parameter
   * @param {string} string 
   * @param {string} stringName - accept dateInput, id or label
   * @returns {boolean}
   */
  checkString: function checkString(string, stringName, output, limits) {
    var strictValidation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var stringLength = string.length;
    var searchLetter = stringName === "date" || stringName === "dateTime" || stringName === "time" ? true : false;

    if (limits && stringName === "date" && !validation.checkLimits(string, limits, strictValidation)) {
      return validation.addError(stringName, "outOfBounds", output);
    }

    if (searchLetter && !strictValidation) {
      if (/[a-zA-Z?,;!§%*$£&+_()\/]/.test(string)) {
        return validation.addError(stringName, "wrongFormat", output);
      }

      if (stringLength < validation.allowedLength[stringName].min) {
        return false;
      }
    }

    if (stringLength > validation.allowedLength[stringName].max) {
      return validation.addError(stringName, "tooLong", output);
    }

    if (stringLength < validation.allowedLength[stringName].min) {
      return validation.addError(stringName, "tooShort", output);
    }

    if (!validation.regExpTest(string, stringName, output)) {
      return validation.addError(stringName, "wrongFormat", output);
    }

    return string;
  },
  checkType: function checkType(itemToCheck, itemName, output) {
    if (typeof itemToCheck !== validation.allowedType[itemName]) {
      return validation.addError(itemName, "wrongType", output);
    }

    return true;
  },

  /**
   * clear error attribute and error message displayed
   */
  clearError: function clearError() {
    validation.error = [];
  },
  formats: {
    get: function get(type) {
      var outputFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "number";
      var langOpt = 0;

      if (type !== "time") {
        switch (validation.formats.lang) {
          case "de":
            langOpt = 3;
            break;

          case "es":
          case "it":
            langOpt = 2;
            break;

          case "fr":
            langOpt = 1;
            break;

          default:
            break;
        }
      }

      return validation.formats.getObject(outputFormat === "number" ? validation.formats.output[outputFormat] : validation.formats.output[outputFormat][type], validation.formats.pattern[type][langOpt], validation.formats.placeholder[type][langOpt], validation.formats.regExp[type][langOpt]);
    },
    getObject: function getObject(output, pattern, placeholder, regExp, expectedLenght) {
      return {
        output: output,
        pattern: pattern,
        placeholder: placeholder,
        regExp: regExp,
        expectedLenght: expectedLenght
      };
    },
    getOptions: function getOptions() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return time ? (0, _objectSpread2.default)({
        hour: 'numeric',
        minute: 'numeric'
      }, options) : options;
    },
    lang: navigator.language.substring(0, 2),
    output: {
      array: {
        date: function date(_date) {
          return _date && _date.split(_date.indexOf("-") > 0 ? "-" : ".");
        },
        dateTime: function dateTime(_dateTime) {
          if (_dateTime) {
            var dateTimeArray = _dateTime.split(" ");

            return [].concat((0, _toConsumableArray2.default)(validation.formats.output.array.date(dateTimeArray[0])), (0, _toConsumableArray2.default)(validation.formats.output.array.time(dateTimeArray[1])));
          }
        },
        time: function time(_time) {
          return _time && _time.split(":");
        }
      },
      dateObject: {
        date: function date(_date2) {
          return _date2 && validation.formats.output.dateObject.fct(_date2, "date");
        },
        dateTime: function dateTime(_dateTime2) {
          return _dateTime2 && validation.formats.output.dateObject.fct(_dateTime2, "dateTime");
        },
        fct: function fct(date, type) {
          if (!date) {
            return false;
          }

          date = validation.formats.output.array[type](date);
          return type === "time" ? {
            hour: date[0],
            minute: date[1]
          } : type === "date" ? new Date(date[validation.formats.lang === "en" ? 0 : 2], parseInt(date[1]) - 1, date[validation.formats.lang === "en" ? 2 : 0]) : new Date(date[validation.formats.lang === "en" ? 0 : 2], parseInt(date[1]) - 1, date[validation.formats.lang === "en" ? 2 : 0], date[3] && date[3], date[4] && date[4]);
        },
        time: function time(_time2) {
          return _time2 && validation.formats.output.dateObject.fct(_time2, "time");
        }
      },
      number: "number",
      string: {
        date: function date(_date3) {
          return _date3 && validation.formats.output.string.fct(_date3, false);
        },
        dateTime: function dateTime(date) {
          return date && validation.formats.output.string.fct(date, true);
        },
        fct: function fct(date) {
          var isDateTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return new Intl.DateTimeFormat(undefined, validation.formats.getOptions(isDateTime)).format(validation.formats.output.dateObject[isDateTime ? "dateTime" : "date"](date));
        },
        time: function time(date) {
          return date && date.toLocalTimeString();
        }
      }
    },
    pattern: {
      date: _date4.datePattern,
      dateTime: [_date4.datePattern[0] + " " + _date4.timePattern, _date4.datePattern[1] + " " + _date4.timePattern, _date4.datePattern[2] + " " + _date4.timePattern, _date4.datePattern[3] + " " + _date4.timePattern],
      time: [_date4.timePattern]
    },
    placeholder: {
      date: _date4.datePlaceholder,
      dateTime: [_date4.datePlaceholder[0] + " " + _date4.timePlaceholder, _date4.datePlaceholder[1] + " " + _date4.timePlaceholder, _date4.datePlaceholder[2] + " " + _date4.timePlaceholder, _date4.datePlaceholder[3] + " " + _date4.timePlaceholder],
      time: [_date4.timePlaceholder]
    },
    regExp: {
      date: [/^\d{4}-\d{2}-\d{2}$/, /^\d{2}-\d{2}-\d{4}$/, /^\d{1}-\d{1}-\d{4}$/, /^\d{1}.\d{1}.\d{4}$/],
      dateTime: [/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/, /^\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}$/, /^\d{1}-\d{1}-\d{4}\s\d{2}:\d{2}$/, /^\d{1}.\d{1}.\d{4}\s\d{2}:\d{2}$/],
      time: /^\s\d{2}:\d{2}/
    }
  },
  regExpTest: function regExpTest(string, stringName, output) {
    var regVal = stringName === "id" ? ["^[a-zA-Z0-9-]+$", "g"] : stringName === "label" ? ["^[a-zA-Z0-9 -/']+$", "g"] : stringName === "color" ? ["^[rh#][a-zA-Z0-9]+$", "g"] : _datePickerParams.datePickerParams.format[output].regExp;
    var regEx = Array.isArray(regVal) ? new RegExp(regVal[0], regVal[1]) : new RegExp(regVal);
    return regEx.test(string);
  }
};
exports.validation = validation;