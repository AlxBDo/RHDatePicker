"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

require("./style.css");

var App = function App() {
  // contain event function param
  var eventFunction = {
    onChange: function onChange(value) {
      var weekdayCtnDisplay = "none";

      if (value) {
        weekdayCtnDisplay = "block";
        var inputValue = value.split("-");
        document.getElementById("test-weekday").textContent = new Intl.DateTimeFormat('en-US', {
          weekday: 'long'
        }).format(new Date(inputValue[0], inputValue[1] - 1, inputValue[2]));
      }

      document.getElementById("weekday-ctn").style.display = weekdayCtnDisplay;
    },
    onClick: function onClick() {
      return document.getElementById("weekday-ctn").style.display = "none";
    }
  }; // contain html class param

  var BDHtmlClass = {
    container: "birthdate-ctn",
    error: "birthdate-err"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "examples-ctn"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Date Picker Component Example"), /*#__PURE__*/_react.default.createElement("div", {
    id: "example1"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "What was the day of the week you were born ?"), /*#__PURE__*/_react.default.createElement(_.DatePicker, {
    inputId: "birthdate-ipt",
    label: "Please indicate your birthdate",
    eventFunction: eventFunction,
    htmlClass: BDHtmlClass
  }), /*#__PURE__*/_react.default.createElement("p", {
    id: "weekday-ctn"
  }, "You were born on a ", /*#__PURE__*/_react.default.createElement("span", {
    id: "test-weekday"
  }))));
};

var _default = App;
exports.default = _default;