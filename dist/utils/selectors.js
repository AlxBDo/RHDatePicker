"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSelectedDate = exports.selectParams = exports.selectError = void 0;
var emptyError = {
  status: "empty"
};

var selectError = function selectError() {
  return function (state) {
    var _state$error;

    return (_state$error = state.error) !== null && _state$error !== void 0 ? _state$error : emptyError;
  };
};

exports.selectError = selectError;
var defaultParams = {
  status: "void"
};

var selectParams = function selectParams() {
  return function (state) {
    var _state$params;

    return (_state$params = state.params) !== null && _state$params !== void 0 ? _state$params : defaultParams;
  };
};

exports.selectParams = selectParams;
var defaultSelectedDate = {
  status: "default"
};

var selectSelectedDate = function selectSelectedDate(inputId) {
  return function (state) {
    var _state$selectedDate$d;

    return (_state$selectedDate$d = state.selectedDate.dates[inputId]) !== null && _state$selectedDate$d !== void 0 ? _state$selectedDate$d : defaultSelectedDate;
  };
};

exports.selectSelectedDate = selectSelectedDate;