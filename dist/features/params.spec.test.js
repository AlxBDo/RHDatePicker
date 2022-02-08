"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var paramsAction = _interopRequireWildcard(require("./params"));

describe("Params reducer and actions", function () {
  it("Should have a void status", function () {
    expect((0, paramsAction.default)(undefined, {
      type: '@INIT'
    })).toEqual({
      status: "void",
      display: {},
      checked: []
    });
  });
  it("Should have a defined status", function () {
    expect((0, paramsAction.default)({
      status: "void",
      display: {},
      checked: []
    }, paramsAction.init("myId"))).toEqual({
      status: "defined",
      display: {},
      checked: ["myId"]
    });
  });
  it("Should had a new attribute to display object", function () {
    expect((0, paramsAction.default)({
      status: "defined",
      display: {},
      checked: ["myId"]
    }, paramsAction.setDisplay("myId"))).toEqual({
      status: "defined",
      display: {
        myId: false
      },
      checked: ["myId"]
    });
    expect((0, paramsAction.default)({
      status: "defined",
      display: {},
      checked: ["myId"]
    }, paramsAction.setDisplay("myId", true))).toEqual({
      status: "defined",
      display: {
        myId: true
      },
      checked: ["myId"]
    });
  });
  it("Should update display object", function () {
    expect((0, paramsAction.default)({
      status: "defined",
      display: {
        myId: true
      },
      checked: ["myId"]
    }, paramsAction.updateDisplay("myId", false))).toEqual({
      status: "defined",
      display: {
        myId: false
      },
      checked: ["myId"]
    });
    expect((0, paramsAction.default)({
      status: "defined",
      display: {
        myId: false
      },
      checked: ["myId"]
    }, paramsAction.updateDisplay("myId", true))).toEqual({
      status: "defined",
      display: {
        myId: true
      },
      checked: ["myId"]
    });
  });
});