"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _tools = require("./tools");

var _style = require("./style");

/**
 * Check and display input type date
 * @param {object} param - object containing attributes: inputId, label, evenFunction (optional) and htmlClass (optional)
 * @example { inputId: "my-input-id", label: "My input id label", evenFunction: {}, htmlClass: {} }
 * @param {string} param.inputId - accepts alphanumeric characters and hyphen
 * @param {string} param.label - accepts alphanumeric characters, hyphen, space and apostrophe
 * @param {object} param.eventFunction - contains function to apply to events
 * @example { onBlur: onBlurFunction, onChange: onChangeFunction, onClick: onClickFunction }
 * @param {object} param.htmlClass - contains classes to apply to the container, to the input and to the error message
 * @example { container: "container-class", input: "input-class", error: "error-class" }
 * @returns {object}
 */
var DatePicker = function DatePicker(_ref) {
  var inputId = _ref.inputId,
      label = _ref.label,
      _ref$eventFunction = _ref.eventFunction,
      eventFunction = _ref$eventFunction === void 0 ? {} : _ref$eventFunction,
      _ref$htmlClass = _ref.htmlClass,
      htmlClass = _ref$htmlClass === void 0 ? {} : _ref$htmlClass;

  _tools.params.initComponentParams(inputId, label, eventFunction, htmlClass);

  (0, _react.useEffect)(function () {
    if (_tools.params.id.input === "param") {
      _tools.validation.displayError();
    } else {
      _tools.calendar.display(true);
    }
  }, [inputId]);
  return /*#__PURE__*/_react.default.createElement(_style.DatePickerContainer, {
    className: "hrnet-dp-ctn ".concat(_tools.params.htmlClass.container && _tools.params.htmlClass.container)
  }, _tools.params.label && /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: _tools.params.id.input
  }, _tools.params.label), _tools.params.id.input !== "param" && /*#__PURE__*/_react.default.createElement("input", {
    type: "date",
    id: _tools.params.id.input,
    name: _tools.params.id.input,
    pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
    className: _tools.params.htmlClass.input && "".concat(_tools.params.htmlClass.input),
    onChange: function onChange(e) {
      _tools.params.listen(e, "onChange");
    },
    onClick: function onClick(e) {
      _tools.params.listen(e, "onClick");
    },
    onBlur: function onBlur(e) {
      _tools.params.listen(e, "onBlur");
    },
    required: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "".concat(_tools.params.id.input, "-err-msg"),
    className: "hrnet-dp-error ".concat(_tools.params.htmlClass.error && _tools.params.htmlClass.error)
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarModal, {
    id: _tools.params.id.modal,
    className: "hrnet-dp-modal"
  }, /*#__PURE__*/_react.default.createElement(_style.CalendarBox, {
    $name: "option",
    onClick: _tools.calendar.onClickOptions
  }, /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    $name: "previous-month",
    $type: "icon",
    id: _tools.params.id.prevMonthBtn
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    $name: "home",
    $type: "icon",
    id: _tools.params.id.todayBtn
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    $name: "month",
    $type: "select",
    id: _tools.params.id.selectedMonth
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    $name: "year",
    $type: "select",
    id: _tools.params.id.selectedYear
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarOption, {
    $name: "next-month",
    $type: "icon",
    id: _tools.params.id.nextMonthBtn
  })), /*#__PURE__*/_react.default.createElement(_style.CalendarBox, {
    $name: "display",
    id: _tools.params.id.calendarDisplayBox
  }, /*#__PURE__*/_react.default.createElement(_style.DayTable, null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, _tools.calendar.days.map(function (day) {
    return /*#__PURE__*/_react.default.createElement("th", {
      key: day
    }, day);
  }))), /*#__PURE__*/_react.default.createElement("tbody", {
    onClick: _tools.calendar.onClickDays
  }, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d1")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d2")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d3")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d4")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d5")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d6")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d7")
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d8")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d9")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d10")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d11")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d12")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d13")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d14")
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d15")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d16")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d17")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d18")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d19")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d20")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d21")
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d22")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d23")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d24")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d25")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d26")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d27")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d28")
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d29")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d30")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d31")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d32")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d33")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d34")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d35")
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d36")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d37")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d38")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d39")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d40")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d41")
  }), /*#__PURE__*/_react.default.createElement("td", {
    id: "".concat(_tools.params.id.input, "-d42")
  })))), /*#__PURE__*/_react.default.createElement(_style.DateSelect, {
    $name: "month",
    id: _tools.params.id.monthSelect,
    onClick: _tools.calendar.onClickSelect
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "0")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "1")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "2")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "3")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "4")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "5")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "6")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "7")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "8")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "9")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "10")
  }), /*#__PURE__*/_react.default.createElement("span", {
    id: "".concat(_tools.params.id.monthSelectOpt, "11")
  })), /*#__PURE__*/_react.default.createElement(_style.DateSelect, {
    $name: "year",
    id: _tools.params.id.yearSelect,
    onClick: _tools.calendar.onClickSelect
  }))));
};

var _default = DatePicker;
exports.default = _default;