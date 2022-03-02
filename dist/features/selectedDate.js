"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setYear = exports.setMonth = exports.setMinute = exports.setHour = exports.setDay = exports.setCalendarYear = exports.setCalendarMonth = exports.setCalendarMinute = exports.setCalendarHour = exports.setCalendarDay = exports.set = exports.initCalendar = exports.init = exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _toolkit = require("@reduxjs/toolkit");

var _date = require("../utils/date");

var dateObject = {
  day: false,
  month: false,
  year: false
};
var timeObject = {
  hour: false,
  minute: false
};
/**
 * @param {object} draft 
 * @param {string} id 
 * @param {string} type - accept date, datePeriod, dateTime, dateTimePeriod, time, timePeriod  
 */

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
/**
 * @typedef {object} selectedDate 
 * @component 
 * @description Redux component in charge of selected dates state - 
 * state : { status: {string}, dates: {object} } - 
 * state.dates : { selectedDate1Id, selectedDate2Id, ... }
 * state.dates.selectedDate1Id : { day: {number}, month: {number}, year: {number}, hour: {number}, minute: {number} } 
 * @property {function} init - Initializes selected dates state of element corresponding to id passed as parameter
 * @property {function} initCalendar - Initializes calendars state of element corresponding to id passed as parameter
 * @property {function} setCalendarDay - Set day displayed to calendar 
 * @property {function} setCalendarHour - Set hour displayed to calendar
 * @property {function} setCalendarMinute - Set minute displayed to calendar
 * @property {function} setCalendarMonth - Set month displayed to calendar
 * @property {function} setCalendarYear - Set year displayed to calendar
 * @property {function} setDay - Set selected day 
 * @property {function} setHour - Set selected hour 
 * @property {function} setMinute - Set selected minute 
 * @property {function} setMonth - Set selected month 
 * @property {function} setYear - Set selected year
 */

var _createSlice = (0, _toolkit.createSlice)({
  name: "selectedDate",
  initialState: initialState,
  reducers: {
    /**
     * Initializes selected dates state of element corresponding to id passed as parameter
     * @memberof selectedDate 
     * @param {string} id 
     * @param {string} type - accept date, datePeriod, dateTime, dateTimePeriod, time, timePeriod 
     * @example `selectedDateAction.init( {string} id, {string} type )` 
     */
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

    /**
     * Initializes calendars state of element corresponding to id passed as parameter
     * @memberof selectedDate 
     * @memberof selectedDate.initCalendar
     * @param {string} id 
     * @example `selectedDateAction.initCalendar( {string} id )` 
     */
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

    /**
     * Set day displayed to calendar
     * @memberof selectedDate 
     * @param {number} day 
     * @param {string} inputId 
     * @example `selectedDateAction.setCalendarDay( {string} id, {number} day )` 
     */
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

        if (day < 1 || day > 31) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.day = day;
        return;
      }
    },

    /**
     * Set hour displayed to calendar
     * @memberof selectedDate 
     * @param {number} hour 
     * @param {string} inputId 
     * @example `selectedDateAction.setCalendarHour( {string} id, {number} hour )` 
     */
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

        if (hour < 0 || hour >= 24) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.hour = hour;
        return;
      }
    },

    /**
     * Set minutes displayed to calendar
     * @memberof selectedDate 
     * @param {number} minute 
     * @param {string} inputId 
     * @example `selectedDateAction.setCalendarMinute( {string} id, {number} minute )`
     */
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

        if (minute < 0 || minute > 59) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.minute = minute;
        return;
      }
    },

    /**
     * Set month displayed to calendar
     * @memberof selectedDate 
     * @param {number} month 
     * @param {string} inputId 
     * @example `selectedDateAction.setCalendarMonth( {string} id, {number} month )` 
     */
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

        if (month < 1 || month > 12) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.month = month;
        return;
      }
    },

    /**
     * Set year displayed to calendar
     * @memberof selectedDate 
     * @param {number} year 
     * @param {string} inputId 
     * @example `selectedDateAction.setCalendarYear( {string} id, {number} year )` 
     */
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

        if (year < (0, _date.getLimitYear)("min") || year > (0, _date.getLimitYear)("max")) {
          return;
        }

        var inputId = action.payload.inputId;
        draft.dates[inputId].calendar.year = year;
        return;
      }
    },

    /**
     * Set selected day
     * @memberof selectedDate 
     * @param {number} day 
     * @param {string} inputId 
     * @param {string | boolean} typeDate - accept start, end or false 
     * @example `selectedDateAction.setDay( {string} id, {number} day, {string | boolean} typeDate )` 
     */
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

        if (day < 1 || day > 31) {
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

    /**
     * Set selected hour
     * @memberof selectedDate 
     * @param {number} hour 
     * @param {string} inputId 
     * @param {string | boolean} typeDate - accept start, end or false 
     * @example `selectedDateAction.setHour( {string} id, {number} hour, {string | boolean} typeDate )` 
     */
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

        if (hour < 0 || hour >= 24) {
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

    /**
     * Set selected minute
     * @memberof selectedDate 
     * @param {number} minute 
     * @param {string} inputId 
     * @param {string | boolean} typeDate - accept start, end or false 
     * @example `selectedDateAction.setMinute( {string} id, {number} minute, {string | boolean} typeDate )` 
     */
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

        if (minute < 0 || minute > 59) {
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

    /**
     * Set selected Month
     * @memberof selectedDate 
     * @param {number} month 
     * @param {string} inputId 
     * @param {string | boolean} typeDate - accept start, end or false 
     * @example `selectedDateAction.setMonth( {string} id, {number} month, {string | boolean} typeDate )` 
     */
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

        if (month < 1 || month > 12) {
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

    /**
     * Set selected year
     * @memberof selectedDate 
     * @param {number} year 
     * @param {string} inputId 
     * @param {string | boolean} typeDate - accept start, end or false 
     * @example `selectedDateAction.setYear( {string} id, {number} year, {string | boolean} typeDate )` 
     */
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

        if (year < (0, _date.getLimitYear)("min") || year > (0, _date.getLimitYear)("max")) {
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