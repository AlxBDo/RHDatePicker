"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _datePicker = _interopRequireDefault(require("../component/datePicker"));

var _style = require("../style");

require("../style/style.css");

var App = function App() {
  // contain event function param
  var eventFunction = {
    onBlur: function onBlur(value) {
      var weekdayCtnDisplay = "none";

      if (value) {
        weekdayCtnDisplay = "block";
        var date = false;
        var lang = navigator.language;

        if (value instanceof Date) {
          date = value;
        } else {
          var inputValue = Array.isArray(value) ? value : value.split(value.indexOf("-") > 0 ? "-" : ".");
          date = new Date(inputValue[lang === "en" ? 0 : 2], inputValue[1] - 1, inputValue[lang === "en" ? 2 : 0]);
        }

        document.getElementById("test-weekday").textContent = new Intl.DateTimeFormat('en-US', {
          weekday: 'long'
        }).format(date);
      }

      document.getElementById("weekday-ctn").style.display = weekdayCtnDisplay;
    },
    onClick: function onClick() {
      return document.getElementById("weekday-ctn").style.display = "none";
    }
  }; // contain event function param

  var onBlurFunction = {
    onBlur: function onBlur(value) {
      if (value) {
        document.getElementById("string-date").textContent = value;
      } else {
        document.getElementById("string-date").textContent = "";
      }
    }
  }; // contain event function param

  var evenFunctionPeriod = {
    periodValues: {
      start: false,
      end: false
    },
    getStringValue: function getStringValue(date) {
      return new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    },
    duration: function duration() {
      return Math.ceil(Math.abs(evenFunctionPeriod.periodValues.end - evenFunctionPeriod.periodValues.start) / (1000 * 60 * 60 * 24));
    },
    onBlur: function onBlur(e) {
      var periodMsgBox = document.getElementById("vacation-period");

      if (!evenFunctionPeriod.periodValues.start || evenFunctionPeriod.periodValues.end) {
        periodMsgBox.textContent = "";
        evenFunctionPeriod.periodValues.start = e;
        evenFunctionPeriod.periodValues.end = false;
      } else {
        evenFunctionPeriod.periodValues.end = e;
        periodMsgBox.textContent = "Your next vacation is scheduled from ".concat(evenFunctionPeriod.getStringValue(evenFunctionPeriod.periodValues.start), " \n                to ").concat(evenFunctionPeriod.getStringValue(evenFunctionPeriod.periodValues.end), ". Your leave will last ").concat(evenFunctionPeriod.duration(), " days");
      }
    }
  }; // contain html class param

  var BDHtmlClass = {
    container: "example-ctn",
    error: "example-err"
  };
  var deadlines = {
    min: "01-01-2022",
    max: "17-02-2022"
  };
  var colors = {
    dark: "#383F51",
    light: "#DDDBF1",
    advice: "#A6ECE0",
    error: "#F9627D"
  };

  _style.style.setColors(colors);

  return /*#__PURE__*/_react.default.createElement(_style.TimeSelectorPage, null, /*#__PURE__*/_react.default.createElement("h1", null, "Date Picker Component Example"), /*#__PURE__*/_react.default.createElement("div", {
    id: "example1",
    className: "example"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "What was the day of the week you were born ?"), /*#__PURE__*/_react.default.createElement(_datePicker.default, {
    inputId: "birthdate-ipt",
    label: "Please indicate your birthdate",
    deadlines: deadlines,
    eventFunction: eventFunction,
    htmlClass: BDHtmlClass,
    type: "date",
    valueFormat: "array",
    colors: colors
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "weekday-ctn"
  }, "You were born on a ", /*#__PURE__*/_react.default.createElement("span", {
    id: "test-weekday"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    id: "example2",
    className: "example"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Choose a date and time to get it to string format"), /*#__PURE__*/_react.default.createElement(_datePicker.default, {
    inputId: "string-date-ipt",
    label: "Choose date and time",
    eventFunction: onBlurFunction,
    htmlClass: BDHtmlClass,
    valueFormat: "string",
    colors: colors
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "string-date"
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "example3",
    className: "example"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Choose the dates of your next vacation"), /*#__PURE__*/_react.default.createElement(_datePicker.default, {
    inputId: "holidays-period-ipt",
    label: "Choose end and start date of your next vacation",
    htmlClass: BDHtmlClass,
    type: "dateTimePeriod",
    eventFunction: evenFunctionPeriod,
    valueFormat: "dateObject",
    colors: colors
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "vacation-period"
  })));
};

var _default = App;
exports.default = _default;