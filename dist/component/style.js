"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayTable = exports.DateSelect = exports.DatePickerContainer = exports.CalendarOption = exports.CalendarModal = exports.CalendarBox = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _homeDarkMode = _interopRequireDefault(require("./assets/home-darkMode.png"));

var _homeLightMode = _interopRequireDefault(require("./assets/home-lightMode.png"));

var _arrowDarkMode = _interopRequireDefault(require("./assets/arrow-darkMode.png"));

var _arrowLightMode = _interopRequireDefault(require("./assets/arrow-lightMode.png"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

/**
 * Provides the color, the background-color and the calendar icons corresponding to the theme
 */
var calendarStyle = {
  backgroundColor: function backgroundColor() {
    return calendarStyle.colors[calendarStyle.colors.theme];
  },
  color: function color() {
    return calendarStyle.colors[calendarStyle.colors.theme === "light" ? "dark" : "light"];
  },
  colors: {
    dark: "#302f2f",
    light: "#f2f2ef",
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
  },
  icons: {
    arrow: function arrow() {
      return calendarStyle.colors.theme === "light" ? _arrowLightMode.default : _arrowDarkMode.default;
    },
    home: function home() {
      return calendarStyle.colors.theme === "light" ? _homeLightMode.default : _homeDarkMode.default;
    }
  }
};

var CalendarBox = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    overflow: hidden;\n    ", "\n"])), function (props) {
  return props.$name === "option" ? "\n        width: 100%;\n        justify-content: space-between;\n        height: 45px; \n        " : "\n        height: 265px;\n        width: 1110px;\n        ";
});

exports.CalendarBox = CalendarBox;

var CalendarModal = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    display: none;\n    text-align: center;\n    position: absolute;\n    background-color: ", ";\n    color: ", ";\n    border-radius: 5px;\n    box-shadow: 2px 2px 3px gray;\n    margin-top: 10px;\n    flex-direction: column;\n    padding: 25px;\n    width: 270px;\n    overflow: hidden;\n"])), calendarStyle.backgroundColor(), calendarStyle.color());

exports.CalendarModal = CalendarModal;

var CalendarOption = _styledComponents.default.span(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    cursor: pointer;\n    ", "\n"])), function (props) {
  return props.$type === "icon" ? "\n            content: url(".concat(props.$name === "home" ? calendarStyle.icons.home() : calendarStyle.icons.arrow(), "); \n            width: 24px; \n            height: 24px;\n            ").concat(props.$name === "previous-month" && "transform: rotate(180deg);", "\n        ") : "\n            ".concat(props.$name === "month" && "width: 85px;", "\n        ");
});

exports.CalendarOption = CalendarOption;

var DatePickerContainer = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    position: relative;\n"])));

exports.DatePickerContainer = DatePickerContainer;

var DateSelect = _styledComponents.default.p(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    margin: 0 0 0 45px;\n    width: 270px; \n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    ", "\n    span { \n        cursor: pointer; \n        margin: auto;\n        padding: 10px;\n        &:hover { \n            background-color: ", ";\n            border-radius: 10px;\n            color: ", ";\n        }\n    }\n"])), function (props) {
  return "".concat(props.$name === "year" && "overflow: auto", ";");
}, calendarStyle.color(), calendarStyle.backgroundColor());

exports.DateSelect = DateSelect;

var DayTable = _styledComponents.default.table(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    td:not(.empty-cell){\n        line-height: 35px;\n        width: 35px;\n        cursor: pointer;\n        &:hover{\n            background-color: ", ";\n            color: ", ";\n            border-radius: 50px;\n        }\n    }\n"])), calendarStyle.color(), calendarStyle.backgroundColor());

exports.DayTable = DayTable;