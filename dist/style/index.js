"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = exports.style = exports.TimeSelectorPage = exports.ErrorBox = exports.DialogBox = exports.DateSelect = exports.DatePickerInput = exports.DatePickerContainer = exports.CalendarSection = exports.CalendarOption = exports.CalendarListItem = exports.CalendarList = exports.CalendarBox = exports.AdviceBox = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _homeDarkMode = _interopRequireDefault(require("../assets/home-darkMode.png"));

var _homeLightMode = _interopRequireDefault(require("../assets/home-lightMode.png"));

var _arrowDarkMode = _interopRequireDefault(require("../assets/arrow-darkMode.png"));

var _arrowLightMode = _interopRequireDefault(require("../assets/arrow-lightMode.png"));

var _moveDarkMode = _interopRequireDefault(require("../assets/move-darkMode.png"));

var _moveLightMode = _interopRequireDefault(require("../assets/move-lightMode.png"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;

/**
 * Contains navigator theme 
 * @example "return light"
 */
var theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
/**
 * @typedef {object} style 
 * @description Provides the color, the background-color and the calendar icons corresponding to the theme 
 * @property {function} adviceColor - Provides advice message font color 
 * @property {function} backgroundColor - Provides background color 
 * @property {function} color - Provides font color
 * @property {object} colors - Store advice, dark, error, light and defaults fonts colors 
 * @property {function} errorColor - Provides error message font color 
 * @property {object} icons - Store icons  
 * @property {object} page - Store page font and background colors 
 * @property {function} setColors - Set font colors : dark and light theme, advice and error message
 */

exports.theme = theme;
var style = {
  /**
   * Provides advice message font color 
   * @memberof style 
   * @function
   * @returns {string} adviceColor
   */
  adviceColor: function adviceColor() {
    var _style$colors$advice;

    return (_style$colors$advice = style.colors.advice) !== null && _style$colors$advice !== void 0 ? _style$colors$advice : style.colors.default.advice;
  },

  /**
   * Provides background color  
   * @memberof style 
   * @function 
   * @returns {string} backgroundColor
   */
  backgroundColor: function backgroundColor() {
    return style.colors[theme] ? style.colors[theme] : style.colors.default[theme];
  },

  /**
   * Provides font color  
   * @memberof style 
   * @function 
   * @returns {string} color 
   */
  color: function color() {
    return style.colors.light ? style.colors[theme === "light" ? "dark" : "light"] : style.colors.default[theme === "light" ? "dark" : "light"];
  },

  /**
   * Store advice, dark, error, light and defaults fonts colors 
   * @memberof style 
   * @property {string} advice - advice font color 
   * @property {string} dark - font color use for dark theme 
   * @property {string} error - error font color 
   * @property {string} light - font color use for ligth theme 
   * @property {object} default - contains colors to use if they have not been defined by the user. 
   */
  colors: {
    advice: undefined,
    dark: undefined,
    error: undefined,
    light: undefined,
    default: {
      dark: "#302f2f",
      light: "#f2f2ef",
      error: "#e55a44",
      advice: "#75B74E"
    }
  },

  /**
   * Provides error message font color  
   * @memberof style 
   * @function
   * @returns {string}
   */
  errorColor: function errorColor() {
    var _style$colors$error;

    return (_style$colors$error = style.colors.error) !== null && _style$colors$error !== void 0 ? _style$colors$error : style.colors.default.error;
  },

  /**
   * Store icons 
   * @memberof style 
   * @property {function} arrow - Provide arrow icon 
   * @property {function} home - Provide home icon  
   * @property {function} move - Provide move icon  
   */
  icons: {
    /**
     * Provides arrow icon
     * @returns {string}
     */
    arrow: function arrow() {
      return theme === "light" ? _arrowLightMode.default : _arrowDarkMode.default;
    },

    /**
     * Provides home icon
     * @returns {string}
     */
    home: function home() {
      return theme === "light" ? _homeLightMode.default : _homeDarkMode.default;
    },

    /**
     * Provides move icon
     * @returns {string}
     */
    move: function move() {
      return theme === "light" ? _moveLightMode.default : _moveDarkMode.default;
    }
  },

  /**
   * Store page font and background colors  
   * @memberof style 
   * @property {function} color - Provide font color
   * @property {function} bgColor - Provide background color 
   */
  page: {
    color: function color() {
      return style.color();
    },
    bgColor: function bgColor() {
      return style.backgroundColor();
    }
  },

  /**
   * Set font colors : dark and light theme, advice and error message  
   * @memberof style 
   * @param {string} dark 
   * @param {string} light 
   * @param {string | boolean} advice 
   * @param {string | boolean} error 
   */
  setColors: function setColors(_ref) {
    var dark = _ref.dark,
        light = _ref.light,
        _ref$advice = _ref.advice,
        advice = _ref$advice === void 0 ? false : _ref$advice,
        _ref$error = _ref.error,
        error = _ref$error === void 0 ? false : _ref$error;
    style.colors.dark = dark;
    style.colors.light = light;

    if (advice) {
      style.colors.advice = advice;
    }

    if (error) {
      style.colors.error = error;
    }
  }
};
exports.style = style;
var clickable = "cursor: pointer;\n                    &:hover {\n                        background-color: ".concat(style.color(), ";\n                        color: ").concat(style.backgroundColor(), ";\n                        border-radius: 22px;\n                        text-shadow: 0px -1px 1px ").concat(theme === "dark" ? "black" : "lightgrey", ";\n                        box-shadow: inset 0px 0px 3px ").concat(theme === "dark" ? "black" : "lightgrey", ";\n                    }");

var AdviceBox = _styledComponents.default.p(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    color: ", ";\n    font-size: smaller;\n"])), function (props) {
  return props.$color;
});

exports.AdviceBox = AdviceBox;

var CalendarBox = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    overflow: hidden;\n    display: flex;\n    &.date-ctn div:not(.show) {\n        padding: 0;\n        overflow: hidden;\n        opacity: 0;\n        transform: scaleX(0);\n        margin: 0 -130px;\n        transform-origin: left;\n    }\n    ", "\n"])), function (props) {
  return props.$name === "option" ? "\n        width: 100%;\n        justify-content: space-between;\n        align-items: center;\n        height: 45px; \n        padding-bottom: 10px;\n        " : "\n        height: 265px;\n        ";
});

exports.CalendarBox = CalendarBox;

var CalendarList = _styledComponents.default.ul(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    ", "\n"])), function (props) {
  return props.$name === "month-days" ? "height: 225px;" : props.$name === "weekdays" && "\n        background-color: ".concat(theme === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)", ";\n        border-radius: 5px;\n        & ").concat(CalendarListItem, " { \n            opacity: 0.5; \n            &:hover { opacity: 1 }\n        };\n        &:hover {\n            background-color: ").concat(theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)", ";\n        };\n        ");
});

exports.CalendarList = CalendarList;

var CalendarListItem = _styledComponents.default.li(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    list-style: none;\n    width: 14%;\n    line-height: 35px;\n    &.selected-day {\n        color: black;\n        background-color: gray;\n        font-weight: bold;\n    }\n    ", "\n"])), function (props) {
  return props.$type === "clickable" && clickable;
});

exports.CalendarListItem = CalendarListItem;

var CalendarOption = _styledComponents.default.span(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n    cursor: pointer;\n    ", "\n"])), function (props) {
  return props.$type === "icon" ? "\n            content: url(".concat(props.$name === "home" ? style.icons.home() : style.icons.arrow(), "); \n            width: 24px; \n            height: 24px;\n            ").concat(props.$name === "previous-month" && "transform: rotate(180deg);", "\n        ") : props.$type === "move-icon" ? "\n            content: url(".concat(style.icons.move(), "); \n            width: 25px; \n            height: 25px;\n            ").concat(props.$name === "more" && "transform: rotate(180deg);", "\n        ") : "\n            padding: 5px 10px;\n            ".concat(clickable, "\n            ").concat(props.$name === "month" && "width: 85px;", "\n        ");
});

exports.CalendarOption = CalendarOption;

var CalendarSection = _styledComponents.default.section(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    text-align: center;\n    display: flex;\n    flex-direction: ", ";\n    flex-wrap: ", ";\n    overflow: hidden;\n    max-height: 320px;\n    &:first-of-type {\n        width: 270px;\n    }\n    div.time-separator {\n        align-self: center;\n        font-size: xxx-large;\n    }\n    div:not(.time-select) {\n        display: flex;\n        flex-direction: row;\n    };\n    &.time-period{\n        overflow: hidden;\n        div:not(.time-select, .minutes-ctn) {\n            height: 50%;\n            overflow: hidden;\n            flex-wrap: wrap;\n            justify-content: center;\n            align-items: baseline;\n            align-content: baseline;\n        };\n        div.time-separator {\n            margin-left: 5px;\n            @media(max-width : 499px){ \n                margin-top: -15px;\n            }\n            @media(min-width : 500px){ \n                margin-top: 7px;\n            }\n        }\n        p {\n            width: 100%;\n            margin: 0px auto;\n            padding: 0;\n            height: 15px;\n            font-size: small;\n            border-radius: 5px;\n            ", "\n        };\n    };\n    ", "\n}\n"])), function (props) {
  return props.$flexDirection || "column";
}, function (props) {
  return props.$flexWrap || "nowrap";
}, theme === "dark" ? "\n            color: gray;\n            background-color: rgba(0, 0, 0, 0.1);\n            " : "\n            color: lightgray;\n            background-color: rgba(255, 255, 255, 0.1);\n            ", function (props) {
  return props.$name === "timeSection" && "\n        @media (max-width : 499px){\n            justify-content: center;\n        };\n        @media (min-width : 500px){\n            justify-content: flex-start;\n            flex-direction: column;\n            max-width: 115px;\n            height: 320px;\n            margin-left: 30px\n        };\n        &:not(.time-period) {\n            div.time-separator{\n                margin-top: -7px;\n                align-items: center;\n            }\n            div:not(.time-select) { height : 100%; }\n        };\n    ";
});

exports.CalendarSection = CalendarSection;

var DatePickerContainer = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)([""])));

exports.DatePickerContainer = DatePickerContainer;

var DatePickerInput = _styledComponents.default.input(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n    text-align: center;\n    border: 1px solid;\n    padding: 5px;\n    margin: 1%;\n    border-radius: 3px;\n    background-color: ", ";\n    color: ", ";\n    width: ", "\n"])), function (props) {
  return props.$backgroundColor;
}, function (props) {
  return props.$color;
}, function (props) {
  return props.$long ? "130px" : "95px";
});

exports.DatePickerInput = DatePickerInput;

var DateSelect = _styledComponents.default.div(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["   \n    display: flex;\n    margin: 0; \n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    transition: all 250ms ease-in-out;\n    transform-origin: right;\n    &:not(.time-select) { \n        width: 270px;\n        span {\n            margin: auto;\n            padding: 10px;\n            ", "\n        }\n    };\n    &.time-select {\n        span.selected-option {\n            font-size: xx-large;\n            border-top: 1px solid;\n            border-bottom: 1px solid;\n            font-weight: bold;\n            margin: 10px auto;\n            &:hover { cursor: s-resize;}\n        }\n        span:not(.selected-option) {\n            opacity: 0.25;\n            &:hover{\n                text-shadow: 2px 2px 2px black;\n                font-size: larger;\n                cursor: pointer;\n                opacity: 1;\n            }\n        }\n        span:not(:first-of-type, :nth-of-type(4), :nth-of-type(6), :last-of-type, .selected-option) { \n            font-size: x-small; \n            &:hover { margin: -6.5px auto; }\n        }\n        span:nth-of-type(4):hover, span:nth-of-type(6):hover {\n            margin: -2.5px auto;\n        }\n    }\n    ", "\n"])), clickable, function (props) {
  switch (props.$name) {
    case "hours":
      return "\n                    flex-direction: column;\n                    width: 60px;";

    case "minutesUni":
    case "minutesUniEnd":
    case "minutesDec":
    case "minutesDecEnd":
      return "\n                flex-direction: column;\n                width: 30px";

    case "month":
      return null;

    case "time-select":
      return "\n                    flex-direction: column;\n                    span:not(:nth-of-type(4), :nth-of-type(6), .selected-option) {\n                    font-size: x-small;\n                }\n                ";

    case "year":
      return "overflow: auto;\n                    scrollbar-width: thin;\n                    scrollbar-color: #383F51 #DDDBF1;";

    default:
      return "\n                    flex-direction: column;";
  }
});

exports.DateSelect = DateSelect;

var DialogBox = _styledComponents.default.div(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n    left: 0px;\n    right: 0px;\n    display: ", ";\n    position: ", ";\n    background-color: ", ";\n    color: ", ";\n    ", ";\n    ", ";\n"])), function (props) {
  return props.$isDisplay ? "flex" : "none";
}, function (props) {
  return props.$isModal ? "absolute" : "relative";
}, function (props) {
  return props.$backgroundColor;
}, function (props) {
  return props.$color;
}, function (props) {
  return props.$name === "hrnet-dp-modal" && "\n        text-align: center;\n        border-radius: 5px;\n        box-shadow: 2px 2px 3px gray;\n        padding: 25px;\n        overflow: hidden;\n        z-index: 9;\n        width: max-content;\n        height: max-content;\n        margin: -100px auto 0;\n    ";
}, function (props) {
  return props.$longSize ? "\n        @media (max-width : 499px){\n            flex-direction: column;\n        }\n    " : "\n        &:not(.hrnet-dp-error){ max-width: 270px; }\n    ";
});

exports.DialogBox = DialogBox;

var ErrorBox = _styledComponents.default.div(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n    color: ", ";\n    margin: 1% auto;\n    width: 50%;\n    min-width: 250px;\n    max-width: 350px;\n"])), function (props) {
  return props.$color;
});

exports.ErrorBox = ErrorBox;

var TimeSelectorPage = _styledComponents.default.div(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n    background-color: ", ";\n    color: ", ";\n    padding: 2%;\n"])), style.page.bgColor, style.page.color);

exports.TimeSelectorPage = TimeSelectorPage;