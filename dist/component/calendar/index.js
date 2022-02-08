"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var paramsAction = _interopRequireWildcard(require("../../features/params"));

var selectedDateAction = _interopRequireWildcard(require("../../features/selectedDate"));

var _selectors = require("../../utils/selectors");

var _Dialog = _interopRequireDefault(require("../Dialog"));

var _CalendarSelect = _interopRequireDefault(require("./CalendarSelect"));

var _TimeSelect = _interopRequireDefault(require("./TimeSelect"));

var _style = require("../../style");

var _datePickerParams = require("../../utils/datePickerParams");

var _date = require("../../utils/date");

var _validation = require("../../utils/validation");

var deleteSelectedDay = function deleteSelectedDay() {
  return document.querySelectorAll(".selected-day").forEach(function (element) {
    element.classList.remove("selected-day");
  });
};

var getNumberDay = function getNumberDay(currentDay, monthLength, startDay) {
  return currentDay >= startDay + 1 && currentDay - startDay <= monthLength && parseInt(currentDay - startDay);
};

function Calendar(props) {
  var baseId = props.baseId,
      displayBox = props.displayBox;
  var dispatch = (0, _reactRedux.useDispatch)();
  var calendarDate = {
    changeIsEndDate: function changeIsEndDate() {
      return calendarDate.isEndDate = !calendarDate.isEndDate;
    },
    getHours: function getHours() {
      var typeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return typeDate === "start" ? selectedDate.start.hour ? parseInt(selectedDate.start.hour) : 12 : typeDate === "end" ? selectedDate.end.hour ? parseInt(selectedDate.end.hour) : 12 : calendarDate.hour;
    },
    getMinutes: function getMinutes() {
      var unitOrDecimal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var typeDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var minutes = typeDate === "end" ? selectedDate.end.minute ? selectedDate.end.minute : 0 : typeDate === "start" ? selectedDate.start.minute ? selectedDate.start.minute : calendarDate.minute : calendarDate.minute;
      return !unitOrDecimal ? parseInt(minutes) : unitOrDecimal === "unit" ? minutes > 9 ? parseInt(String(minutes).substring(1)) : parseInt(minutes) : minutes > 9 ? parseInt(String(minutes).substring(0, 1)) : 0;
    },
    initDate: function initDate(selectedDate) {
      if (_datePickerParams.datePickerParams.is[baseId].period) {
        _datePickerParams.datePickerParams.is[baseId].period = true;
        calendarDate.nameSuffix = "End";
        calendarDate.typeDate = !selectedDate.start.day || !calendarDate.isEndDate() ? "start" : "end";
      } else {
        calendarDate.typeDate = false;
      }

      if (_datePickerParams.datePickerParams.is[baseId].date) {
        calendarDate.setDate(selectedDate.calendar);
      }

      if (_datePickerParams.datePickerParams.is[baseId].time) {
        calendarDate.setTime(selectedDate.calendar);
      }
    },
    isEndDate: function isEndDate() {
      return selectedDate.status === "pending" ? true : false;
    },
    nameSuffix: "",
    setDate: function setDate(date) {
      calendarDate.day = date.day ? parseInt(date.day) : _date.currentDate.day;
      calendarDate.month = date.month ? parseInt(date.month) : _date.currentDate.month;
      calendarDate.year = date.year ? parseInt(date.year) : _date.currentDate.year;
    },
    setTime: function setTime(time) {
      calendarDate.hour = time.hour ? parseInt(time.hour) : 12;
      calendarDate.minute = time.minute ? parseInt(time.minute) : 0;
    }
  };
  var selectedDate = (0, _reactRedux.useSelector)((0, _selectors.selectSelectedDate)(baseId));

  if (!calendarDate.day) {
    calendarDate.initDate(selectedDate);
  }

  var calendarMonthSelected = calendarDate.month - 1;
  var date = new Date(calendarDate.year, calendarMonthSelected, 1);
  var startDay = date.getDay();

  var monthLength = _date.months.getLength(calendarMonthSelected, calendarDate.year);

  var monthDays = Array(42).fill(1);
  var startYear = (0, _date.getLimitYear)("min");
  var years = Array(100).fill(startYear);
  var calendarOptions = [{
    name: "previous-month",
    type: "icon"
  }, {
    name: "home",
    type: "icon"
  }, {
    name: "month",
    type: "select",
    value: _date.months.name[calendarMonthSelected]
  }, {
    name: "year",
    type: "select",
    value: calendarDate.year
  }, {
    name: "next-month",
    type: "icon"
  }];
  var click = {
    browseMonths: function browseMonths(month) {
      return month > 12 ? 1 : month < 1 ? 12 : month;
    },
    days: function days(e) {
      return click.fct(e, "Day");
    },
    fct: function fct(e, name) {
      var value = name === "Month" ? parseInt(_date.months.name.indexOf(e.target.textContent)) + 1 : name === "Minute" ? parseInt(e.target.getAttribute("id").indexOf("minutesuni") > 0 ? String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate), " .selected-option")).textContent) + String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate), " .selected-option")).textContent) : String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate), " .selected-option")).textContent) + String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate), " .selected-option")).textContent)) : name === "Hour" ? parseInt(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "hours", calendarDate.typeDate), " .selected-option")).textContent) : parseInt(e.target.textContent);

      if (Number.isInteger(value)) {
        dispatch(selectedDateAction["setCalendar".concat(name)](value, baseId));

        if (name === "Day") {
          dispatch(selectedDateAction.setDay(value, baseId, calendarDate.typeDate));
          dispatch(selectedDateAction.setMonth(calendarDate.month, baseId, calendarDate.typeDate));
          dispatch(selectedDateAction.setYear(calendarDate.year, baseId, calendarDate.typeDate));

          if (calendarDate.typeDate !== "start") {
            dispatch(paramsAction.updateDisplay(_datePickerParams.datePickerParams.id[baseId].modal, false));
          }

          var time = false;

          if (_datePickerParams.datePickerParams.is[baseId].time) {
            var hour = parseInt(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "hours", calendarDate.typeDate), " .selected-option")).textContent);

            if ((0, _date.transformToNumber)(hour) !== calendarDate.hour) {
              dispatch(selectedDateAction.setHour(hour, baseId, calendarDate.typeDate));
            }

            var minutes = String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesDec", calendarDate.typeDate), " .selected-option")).textContent) + String(document.querySelector("div#".concat(_datePickerParams.datePickerParams.getTimeSelectId(baseId, "minutesUni", calendarDate.typeDate), " .selected-option")).textContent);

            if ((0, _date.transformToNumber)(minutes) !== selectedDate.minute) {
              dispatch(selectedDateAction.setMinute(minutes, baseId, calendarDate.typeDate));
            }

            time = (0, _date.transformToNumber)(hour) + ":" + minutes;
          }

          var dateToVerify = click.getFormattedValue(value, time);
          document.getElementById(calendarDate.typeDate && calendarDate.typeDate === "end" ? baseId + "-end" : baseId).value = dateToVerify;

          _datePickerParams.datePickerParams.eventFunction.execute(baseId, dateToVerify, "onBlur");

          if (_datePickerParams.datePickerParams.is[baseId].period) {
            calendarDate.changeIsEndDate();
          }
        } else {
          click.show(_datePickerParams.datePickerParams.id[baseId].daySelect, baseId);
        }
      }
    },
    getFormattedValue: function getFormattedValue(day) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      day = parseInt(day);
      var month = parseInt(calendarDate.month);
      var year = calendarDate.year;
      var date = false;

      switch (_validation.validation.formats.lang) {
        case "de":
          date = day + "." + month + "." + year;
          break;

        case "es":
        case "it":
          date = day + "-" + month + "-" + year;
          break;

        case "fr":
          date = (0, _date.transformToNumber)(day) + "-" + (0, _date.transformToNumber)(month) + "-" + year;
          break;

        default:
          date = year + "-" + (0, _date.transformToNumber)(month) + "-" + (0, _date.transformToNumber)(day);
      }

      return time ? date + " " + time : date;
    },
    hour: function hour(e) {
      return click.fct(e, "Hour");
    },
    minute: function minute(e) {
      return click.fct(e, "Minute");
    },
    months: function months(e) {
      return click.fct(e, "Month");
    },
    optionSelect: function optionSelect(e) {
      var item = e.target;
      deleteSelectedDay();

      switch (item.getAttribute("id")) {
        case _datePickerParams.datePickerParams.id[baseId].nextMonthBtn:
          dispatch(selectedDateAction.setCalendarMonth(click.browseMonths(parseInt(calendarDate.month) + 1), baseId, calendarDate.typeDate));
          break;

        case _datePickerParams.datePickerParams.id[baseId].prevMonthBtn:
          dispatch(selectedDateAction.setCalendarMonth(click.browseMonths(parseInt(calendarDate.month) - 1), baseId, calendarDate.typeDate));
          break;

        case _datePickerParams.datePickerParams.id[baseId].selectedMonth:
          click.show(_datePickerParams.datePickerParams.id[baseId].monthSelect, baseId);
          break;

        case _datePickerParams.datePickerParams.id[baseId].selectedYear:
          click.show(_datePickerParams.datePickerParams.id[baseId].yearSelect, baseId);
          document.getElementById(_datePickerParams.datePickerParams.id[baseId].yearSelect).scroll(0, (calendarDate.year - (0, _date.getLimitYear)("min")) * 8);
          break;

        case _datePickerParams.datePickerParams.id[baseId].todayBtn:
          dispatch(selectedDateAction.initCalendar(baseId));
          break;

        default:
          return false;
      }
    },
    show: function show(elementId, baseId) {
      document.querySelector("#".concat(_datePickerParams.datePickerParams.id[baseId].modal, " .show")).classList.remove("show");
      document.getElementById(elementId).classList.add("show");
    },
    years: function years(e) {
      return click.fct(e, "Year");
    }
  };

  function displaySelectedDay() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var startMonth = parseInt(selectedDate.start.month);
    var startYear = parseInt(selectedDate.start.year);
    var selectedDayItem = e && e.target;

    if (startMonth !== calendarDate.month || startYear !== calendarDate.year || calendarDate.typeDate !== "start") {
      deleteSelectedDay();
    }

    if (!selectedDate.start.day || calendarDate.typeDate === "start") {
      return;
    }

    if (calendarDate.month < startMonth && calendarDate.year <= startYear) {
      return;
    }

    var end = parseInt(selectedDayItem ? selectedDayItem.textContent : selectedDate.end.day ? selectedDate.end.day : selectedDate.start.day);
    var start = startMonth === calendarDate.month ? parseInt(selectedDate.start.day) - 1 : 0;

    if (end > start) {
      var idSplitted = e.target.getAttribute("id").split("-");
      var numberId = idSplitted[idSplitted.length - 1];
      Array(end - start).fill(0).map(function (item, index) {
        var element = document.getElementById("dayLi-".concat(baseId, "-").concat(numberId - index));

        if (element) {
          element.classList.toggle("selected-day");
        }
      });
    }
  }

  function showCorrespondingWeekday(weekdayNumber) {
    var highlight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    document.getElementById("wd".concat(baseId, "-").concat(_date.weekdays[weekdayNumber])).style.opacity = highlight ? 1 : 0.5;
    document.getElementById("wd".concat(baseId, "-").concat(_date.weekdays[weekdayNumber])).style.borderBottom = highlight ? "1px solid" : "none";
  }

  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    dialogBoxId: _datePickerParams.datePickerParams.id[baseId].modal,
    name: "hrnet-dp-modal",
    displayBox: displayBox,
    isModal: true,
    color: _style.style.color(),
    backgroundColor: _style.style.backgroundColor(),
    longSize: _datePickerParams.datePickerParams.is[baseId].dateTime
  }, selectedDate.type !== "time" && selectedDate.type !== "timePeriod" && /*#__PURE__*/_react.default.createElement(_style.CalendarSection, null, /*#__PURE__*/_react.default.createElement(_CalendarSelect.default, {
    baseId: baseId,
    name: "option",
    list: calendarOptions,
    onClickFunction: click.optionSelect
  }), /*#__PURE__*/_react.default.createElement(_style.CalendarBox, {
    $name: "display",
    id: _datePickerParams.datePickerParams.id[baseId].calendarDisplayBox,
    className: "date-ctn"
  }, /*#__PURE__*/_react.default.createElement(_style.DateSelect, {
    $name: "days",
    className: "show",
    id: _datePickerParams.datePickerParams.id[baseId].daySelect
  }, /*#__PURE__*/_react.default.createElement(_style.CalendarList, {
    $name: "weekdays"
  }, _date.weekdays.map(function (day) {
    return /*#__PURE__*/_react.default.createElement(_style.CalendarListItem, {
      key: "wd-".concat(baseId, "-").concat(day),
      id: "wd".concat(baseId, "-").concat(day)
    }, day);
  })), /*#__PURE__*/_react.default.createElement(_style.CalendarList, {
    $name: "month-days",
    onClick: click.days
  }, monthDays.map(function (day, index) {
    return /*#__PURE__*/_react.default.createElement(_style.CalendarListItem, {
      key: "dayLi-".concat(baseId, "-").concat(index),
      id: "dayLi-".concat(baseId, "-").concat(index),
      $type: index < startDay || index > monthLength + startDay - 1 ? "empty-cell" : "clickable",
      onMouseOver: function onMouseOver(e) {
        showCorrespondingWeekday(index - parseInt(index / 7) * 7);
        _datePickerParams.datePickerParams.is[baseId].period && displaySelectedDay(e, calendarMonthSelected + 1);
      },
      onMouseOut: function onMouseOut(e) {
        showCorrespondingWeekday(index - parseInt(index / 7) * 7, false);
        _datePickerParams.datePickerParams.is[baseId].period && displaySelectedDay(e, calendarMonthSelected + 1);
      }
    }, getNumberDay(index + 1, monthLength, startDay));
  }))), /*#__PURE__*/_react.default.createElement(_CalendarSelect.default, {
    baseId: baseId,
    name: "month",
    list: _date.months.name,
    onClickFunction: click.months
  }), /*#__PURE__*/_react.default.createElement(_CalendarSelect.default, {
    baseId: baseId,
    name: "year",
    list: years,
    onClickFunction: click.years
  }))), selectedDate.type !== "date" && selectedDate.type !== "datePeriod" && /*#__PURE__*/_react.default.createElement(_style.CalendarSection, {
    $flexDirection: "row",
    $name: "timeSection",
    $flexWrap: _datePickerParams.datePickerParams.is[baseId].period && "wrap",
    className: _datePickerParams.datePickerParams.is[baseId].period ? "time-period" : null
  }, _datePickerParams.datePickerParams.is[baseId].period && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Start"), /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    maxValue: 23,
    name: "hoursStart",
    reduceSize: true,
    selectedValue: calendarDate.getHours("start"),
    onClickFunction: click.hour
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "time-separator"
  }, ":"), /*#__PURE__*/_react.default.createElement("div", {
    className: "minutes-ctn"
  }, /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    maxValue: 5,
    name: "minutesDecStart",
    reduceSize: true,
    selectedValue: calendarDate.getMinutes("deci", "start"),
    onClickFunction: click.minute
  }), /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    name: "minutesUniStart",
    reduceSize: true,
    selectedValue: calendarDate.getMinutes("unit", "start"),
    onClickFunction: click.minute
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: calendarDate.typeHour === "start" && "none"
    }
  }, _datePickerParams.datePickerParams.is[baseId].period && /*#__PURE__*/_react.default.createElement("p", null, "End"), /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    maxValue: 23,
    name: "hours".concat(calendarDate.nameSuffix),
    reduceSize: _datePickerParams.datePickerParams.is[baseId].period,
    selectedValue: calendarDate.getHours(_datePickerParams.datePickerParams.is[baseId].period && "end"),
    onClickFunction: click.hour
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "time-separator"
  }, ":"), /*#__PURE__*/_react.default.createElement("div", {
    className: "minutes-ctn"
  }, /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    maxValue: 5,
    name: "minutesDec".concat(calendarDate.nameSuffix),
    reduceSize: _datePickerParams.datePickerParams.is[baseId].period,
    selectedValue: calendarDate.getMinutes("deci", _datePickerParams.datePickerParams.is[baseId].period && "end"),
    onClickFunction: click.minute
  }), /*#__PURE__*/_react.default.createElement(_TimeSelect.default, {
    baseId: baseId,
    name: "minutesUni".concat(calendarDate.nameSuffix),
    reduceSize: _datePickerParams.datePickerParams.is[baseId].period,
    selectedValue: calendarDate.getMinutes("unit", _datePickerParams.datePickerParams.is[baseId].period && "end"),
    onClickFunction: click.minute
  })))));
}

var _default = Calendar;
exports.default = _default;