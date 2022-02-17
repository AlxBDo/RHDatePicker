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
  }; // contain html class param

  var BDHtmlClass = {
    container: "example-ctn",
    error: "example-err"
  };
  return /*#__PURE__*/_react.default.createElement(_style.TimeSelectorPage, null, /*#__PURE__*/_react.default.createElement("h1", null, "Date Picker Component Example"), /*#__PURE__*/_react.default.createElement("div", {
    id: "example1",
    className: "example"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "What was the day of the week you were born ?"), /*#__PURE__*/_react.default.createElement(_datePicker.default, {
    inputId: "birthdate-ipt",
    label: "Please indicate your birthdate",
    eventFunction: eventFunction,
    htmlClass: BDHtmlClass,
    type: "date",
    valueFormat: "dateObject"
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
    valueFormat: "string"
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "string-date"
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "example3",
    className: "example"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Choose the dates of your next vacation"), /*#__PURE__*/_react.default.createElement(_datePicker.default, {
    inputId: "holidays-period-ipt",
    label: "Choose end and start date of your next vacation",
    htmlClass: BDHtmlClass,
    type: "dateTimePeriod"
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "string-date"
  })));
};

var _default = App;
exports.default = _default;