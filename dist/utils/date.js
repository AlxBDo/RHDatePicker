"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weekdays = exports.transformToNumber = exports.timePlaceholder = exports.timePattern = exports.months = exports.getLimitYear = exports.datePlaceholder = exports.datePattern = exports.currentTime = exports.currentDate = void 0;
var date = new Date();
/**
 * Convert a digit to a number
 * @param {number} number 
 * @returns {string}
 */

var transformToNumber = function transformToNumber(number) {
  return number.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
};
/**
 * Store current date - contains day, month and year attributes
 */


exports.transformToNumber = transformToNumber;
var currentDate = {
  day: transformToNumber(date.getDate()),
  month: transformToNumber(date.getMonth() + 1),
  year: date.getFullYear()
};
/**
 * Store current time - contains hour and minute attributes
 */

exports.currentDate = currentDate;
var currentTime = {
  hour: transformToNumber(date.getHours()),
  minute: transformToNumber(date.getMinutes())
};
/**
 * Input pattern array
 */

exports.currentTime = currentTime;
var datePattern = ["[0-9]{4}-[0-9]{2}-[0-9]{2}", "[0-9]{2}-[0-9]{2}-[0-9]{4}", "[0-9]{1}-[0-9]{1}-[0-9]{4}", "[0-9]{1}.[0-9]{1}.[0-9]{4}"];
/**
 * Input placeholder array
 */

exports.datePattern = datePattern;
var datePlaceholder = ["YYYY-MM-DD", "JJ-MM-AAAA", "J-M-AAAA", "J.M.AAAA"];
/**
 * provides the start and end years of the select
 * @param {string} minOrMax - max = last year accepted 
 * @returns {interger} year
*/

exports.datePlaceholder = datePlaceholder;

var getLimitYear = function getLimitYear(minOrMax) {
  return minOrMax === "max" ? currentDate.year + 30 : currentDate.year - 70;
};
/**
 * Provide month informations. Contains name (month names array) and getLength (function) attributes
 */


exports.getLimitYear = getLimitYear;
var months = {
  name: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

  /**
   * Provides month length
   * @param {number} month 
   * @param {number} year 
   * @returns {number}
   */
  getLength: function getLength(month, year) {
    switch (month) {
      case 1:
        return parseInt(year) % 4 === 0 ? 28 : 27;

      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        return 30;

      default:
        return 31;
    }
  }
};
exports.months = months;
var timePattern = "[0-9]{2}:[0-9]{2}";
exports.timePattern = timePattern;
var timePlaceholder = "HH:MM";
exports.timePlaceholder = timePlaceholder;
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
exports.weekdays = weekdays;