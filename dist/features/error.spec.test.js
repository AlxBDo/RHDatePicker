"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var errorAction = _interopRequireWildcard(require("./error"));

describe("Error reducer and actions", function () {
  var errorObj = {
    what: "something",
    why: "because",
    output: "here"
  };
  it("Should return empty status", function () {
    expect((0, errorAction.default)(undefined, {
      type: '@INIT'
    })).toEqual({
      status: "empty",
      error: {}
    });
    expect((0, errorAction.default)({
      status: 1,
      error: {
        here: [errorObj]
      }
    }, errorAction.clear("here"))).toEqual({
      status: "empty",
      error: {}
    });
  });
  it("Should return 1 status", function () {
    expect((0, errorAction.default)({
      status: "empty",
      error: {}
    }, errorAction.add(errorObj))).toEqual({
      status: 1,
      error: {
        here: [errorObj]
      }
    });
  });
});