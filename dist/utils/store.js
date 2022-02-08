"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _error = _interopRequireDefault(require("../features/error"));

var _params = _interopRequireDefault(require("../features/params"));

var _selectedDate = _interopRequireDefault(require("../features/selectedDate"));

var _default = (0, _toolkit.configureStore)({
  reducer: {
    error: _error.default,
    params: _params.default,
    selectedDate: _selectedDate.default
  }
});

exports.default = _default;