"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setYear = exports.setMonth = exports.setMinute = exports.setHour = exports.setDay = exports.setCalendarYear = exports.setCalendarMonth = exports.setCalendarMinute = exports.setCalendarHour = exports.setCalendarDay = exports.set = exports.initCalendar = exports.init = exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _toolkit = require("@reduxjs/toolkit");

var _date = require("../utils/date");

var _validation = require("../utils/validation");

var dateObject = {
  day: false,
  month: false,
  year: false
};
var timeObject = {
  hour: false,
  minute: false
};

function setInitialDateState(draft, id, type) {
  var timeAttributes = type.indexOf("date") >= 0 ? type.indexOf("ime") >= 0 ? (0, _objectSpread2.default)((0, _objectSpread2.default)({}, dateObject), timeObject) : dateObject : timeObject;

  if (type.indexOf("Period") > 0) {
    timeAttributes = {
      start: timeAttributes,
      end: timeAttributes,
      calendar: timeAttributes
    };
  } else {
    timeAttributes = (0, _objectSpread2.default)({
      calendar: timeAttributes
    }, timeAttributes);
  }

  draft.dates[id] = (0, _objectSpread2.default)({
    status: "default",
    type: type
  }, timeAttributes);
}

var initialState = {
  status: "empty",
  dates: {}
};

var _createSlice = (0, _toolkit.createSlice)({
  name: "selectedDate",
  initialState: initialState,
  reducers: {
    init: {
      prepare: function prepare(id, type) {
        return {
          payload: {
            id: id,
            type: type
          }
        };
      },
      reducer: function reducer(draft, action) {
        if (draft.dates[action.payload.id] && draft.dates[action.payload.id].status === "default") {
          return;
        }

        setInitialDateState(draft, action.payload.id, action.payload.type);
        draft.status = draft.status === "empty" ? 1 : draft.status + 1;
        return;
      }
    },
    initCalendar: {
      prepare: function prepare(id) {
        return {
          payload: {
            id: id
          }
        };
      },
      reducer: function reducer(draft, action) {
        var id = action.payload.id;
        draft.dates[id].status = "default";

        if (draft.dates[id].type.indexOf("date") === 0) {
          draft.dates[id].calendar.day = false;
          draft.dates[id].calendar.month = false;
          draft.dates[id].calendar.year = false;
        }

        return;
      }
    },
    set: {
      prepare: function prepare(date, inputId) {
        return {
          payload: {
            date: date,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var dateTemp = action.payload.date;

        if (!_validation.validation.checkInputValue(dateTemp)) {
          return;
        }

        var inputId = action.payload.inputId;
        var dateSplited = dateTemp.split("-");
        draft.dates[inputId] = {
          status: "selected",
          day: dateSplited[2],
          month: dateSplited[1],
          year: dateSplited[0]
        };
        return;
      }
    },
    setCalendarDay: {
      prepare: function prepare(day, inputId) {
        return {
          payload: {
            day: day,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var day = parseInt(action.payload.day);

        if (day < 1 && day > 31) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.day = day;
        return;
      }
    },
    setCalendarHour: {
      prepare: function prepare(hour, inputId) {
        return {
          payload: {
            hour: hour,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var hour = parseInt(action.payload.hour);

        if (hour < 0 && hour >= 24) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.hour = hour;
        return;
      }
    },
    setCalendarMinute: {
      prepare: function prepare(minute, inputId) {
        return {
          payload: {
            minute: minute,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var minute = parseInt(action.payload.minute);

        if (minute < 0 && minute > 59) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.minute = minute;
        return;
      }
    },
    setCalendarMonth: {
      prepare: function prepare(month, inputId) {
        return {
          payload: {
            month: month,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var month = parseInt(action.payload.month);

        if (month < 1 && month > 12) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.month = month;
        return;
      }
    },
    setCalendarYear: {
      prepare: function prepare(year, inputId) {
        return {
          payload: {
            year: year,
            inputId: inputId
          }
        };
      },
      reducer: function reducer(draft, action) {
        var year = parseInt(action.payload.year);

        if (year < (0, _date.getLimitYear)("min") && year > (0, _date.getLimitYear)("max")) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.year = year;
        return;
      }
    },
    setDay: {
      prepare: function prepare(day, inputId, typeDate) {
        return {
          payload: {
            day: day,
            inputId: inputId,
            typeDate: typeDate
          }
        };
      },
      reducer: function reducer(draft, action) {
        var day = parseInt(action.payload.day);

        if (day < 1 && day > 31) {
          return;
        }

        var inputId = action.payload.inputId;
        var typeDate = action.payload.typeDate;

        if (typeDate) {
          draft.dates[inputId][typeDate].day = (0, _date.transformToNumber)(day);

          if (typeDate === "start") {
            draft.dates[inputId].calendar.day = day;
          }
        } else {
          draft.dates[inputId].day = (0, _date.transformToNumber)(day);
          draft.dates[inputId].calendar.day = day;
        }

        if (draft.dates[inputId].status !== "selected" && (draft.dates[inputId].type.indexOf("Period") < 0 || typeDate === "end" && draft.dates[inputId].start.day !== draft.dates[inputId].end.day)) {
          draft.dates[inputId].status = "selected";
        } else if (typeDate === "start") {
          draft.dates[inputId].status = "pending";
        }

        return;
      }
    },
    setHour: {
      prepare: function prepare(hour, inputId, typeDate) {
        return {
          payload: {
            hour: hour,
            inputId: inputId,
            typeDate: typeDate
          }
        };
      },
      reducer: function reducer(draft, action) {
        var hour = parseInt(action.payload.hour);

        if (hour < 0 && hour >= 24) {
          return;
        }

        var inputId = action.payload.inputId;
        var typeDate = action.payload.typeDate;

        if (typeDate) {
          draft.dates[inputId][typeDate].hour = (0, _date.transformToNumber)(hour);

          if (typeDate === "start") {
            draft.dates[inputId].calendar.hour = hour;
          }
        } else {
          draft.dates[inputId].hour = (0, _date.transformToNumber)(hour);
          draft.dates[inputId].calendar.hour = hour;
        }

        if (draft.dates[inputId].status !== "selected" && (draft.dates[inputId].type.indexOf("Period") < 0 || typeDate === "end" && draft.dates[inputId].start.hour !== draft.dates[inputId].end.hour)) {
          draft.dates[inputId].status = "selected";
        }

        return;
      }
    },
    setMinute: {
      prepare: function prepare(minute, inputId, typeDate) {
        return {
          payload: {
            minute: minute,
            inputId: inputId,
            typeDate: typeDate
          }
        };
      },
      reducer: function reducer(draft, action) {
        var minute = parseInt(action.payload.minute);

        if (minute < 0 && minute > 59) {
          return;
        }

        var inputId = action.payload.inputId;
        var typeDate = action.payload.typeDate;

        if (typeDate) {
          draft.dates[inputId][typeDate].minute = (0, _date.transformToNumber)(minute);

          if (typeDate === "start") {
            draft.dates[inputId].calendar.minute = minute;
          }
        } else {
          draft.dates[inputId].minute = (0, _date.transformToNumber)(minute);
          draft.dates[inputId].calendar.minute = minute;
        }

        if (draft.dates[inputId].status !== "selected" && (draft.dates[inputId].type.indexOf("Period") < 0 || typeDate === "end" && draft.dates[inputId].start.minute !== draft.dates[inputId].end.minute)) {
          draft.dates[inputId].status = "selected";
        }

        return;
      }
    },
    setMonth: {
      prepare: function prepare(month, inputId, typeDate) {
        return {
          payload: {
            month: month,
            inputId: inputId,
            typeDate: typeDate
          }
        };
      },
      reducer: function reducer(draft, action) {
        var month = parseInt(action.payload.month);

        if (month < 1 && month > 12) {
          return;
        }

        var inputId = action.payload.inputId;
        var typeDate = action.payload.typeDate;

        if (typeDate) {
          draft.dates[inputId][typeDate].month = (0, _date.transformToNumber)(month);

          if (typeDate === "start") {
            draft.dates[inputId].calendar.month = month;
          }
        } else {
          draft.dates[inputId].month = (0, _date.transformToNumber)(month);
          draft.dates[inputId].calendar.month = month;
        }

        if (draft.dates[inputId].status !== "selected" && (draft.dates[inputId].type.indexOf("Period") < 0 || typeDate === "end" && draft.dates[inputId].start.month !== draft.dates[inputId].end.month)) {
          draft.dates[inputId].status = "selected";
        }

        return;
      }
    },
    setYear: {
      prepare: function prepare(year, inputId, typeDate) {
        return {
          payload: {
            year: year,
            inputId: inputId,
            typeDate: typeDate
          }
        };
      },
      reducer: function reducer(draft, action) {
        var year = parseInt(action.payload.year);

        if (year < (0, _date.getLimitYear)("min") && year > (0, _date.getLimitYear)("max")) {
          return;
        }

        var inputId = action.payload.inputId;
        var typeDate = action.payload.typeDate;

        if (typeDate) {
          draft.dates[inputId][typeDate].year = (0, _date.transformToNumber)(year);

          if (typeDate === "start") {
            draft.dates[inputId].calendar.year = year;
          }
        } else {
          draft.dates[inputId].year = (0, _date.transformToNumber)(year);
          draft.dates[inputId].calendar.year = year;
        }

        if (draft.dates[inputId].status !== "selected" && (draft.dates[inputId].type.indexOf("Period") < 0 || typeDate === "end" && draft.dates[inputId].start.year !== draft.dates[inputId].end.year)) {
          draft.dates[inputId].status = "selected";
        }

        return;
      }
    }
  }
}),
    actions = _createSlice.actions,
    reducer = _createSlice.reducer;

var init = actions.init,
    initCalendar = actions.initCalendar,
    set = actions.set,
    setCalendarDay = actions.setCalendarDay,
    setCalendarHour = actions.setCalendarHour,
    setCalendarMinute = actions.setCalendarMinute,
    setCalendarMonth = actions.setCalendarMonth,
    setCalendarYear = actions.setCalendarYear,
    setDay = actions.setDay,
    setHour = actions.setHour,
    setMinute = actions.setMinute,
    setMonth = actions.setMonth,
    setYear = actions.setYear;
exports.setYear = setYear;
exports.setMonth = setMonth;
exports.setMinute = setMinute;
exports.setHour = setHour;
exports.setDay = setDay;
exports.setCalendarYear = setCalendarYear;
exports.setCalendarMonth = setCalendarMonth;
exports.setCalendarMinute = setCalendarMinute;
exports.setCalendarHour = setCalendarHour;
exports.setCalendarDay = setCalendarDay;
exports.set = set;
exports.initCalendar = initCalendar;
exports.init = init;
var _default = reducer;
exports.default = _default;