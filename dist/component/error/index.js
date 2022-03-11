"use strict";

var _interopRequireWildcard3 = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/interopRequireWildcard"));

var _react = _interopRequireWildcard3(require("react"));

var _reactRedux = require("react-redux");

var _dialog = _interopRequireDefault(require("../dialog"));

var _style = require("../../style");

var _datePickerParams = require("../../utils/datePickerParams");

var _validation = require("../../utils/validation");

var _selectors = require("../../utils/selectors");

/**
 * Display Dialog component containing error messages
 * @component 
 * @param {object} props 
 * @param {string} props.dialogBoxId - use for html attribute id 
 * @param {string} props.htmlClass - html class(es) to assign to component className attribute 
 * @returns {object} Dialog component
 */
function Error(props) {
  var dispatch = (0, _reactRedux.useDispatch)();
  var dialogBoxId = props.dialogBoxId,
      htmlClass = props.htmlClass;
  var error = (0, _reactRedux.useSelector)((0, _selectors.selectError)());
  /**
   * Provides error message to validation object
   */

  var errorMessage = {
    allowed: {
      length: function length(_ref) {
        var max = _ref.max,
            min = _ref.min;
        return max !== min ? "Its length must be between ".concat(min, " and ").concat(max, " characters.") : "Its length must be ".concat(max, " characters.");
      },
      format: function format(what) {
        switch (what) {
          case "date":
            return "Date must consist of numbers separated by hyphens : ".concat(_datePickerParams.datePickerParams.format[dialogBoxId].placeholder, " .");

          case "dateTime":
            return "Date and time must be separeted by a space and consist of numbers separated by hyphens (for date) \n                        or double point (for time) : ".concat(_datePickerParams.datePickerParams.format[dialogBoxId].placeholder, " .");

          case "id":
            return "Only alphanumeric characters are allowed.";

          case "label":
            return "Only alphanumeric characters, hyphen and apostrophe are allowed.";

          case "time":
            return "Time must consist of numbers separated by double point : ".concat(_datePickerParams.datePickerParams.format[dialogBoxId].placeholder, " .");

          default:
            return "Impossible to determinate good format !";
        }
      },
      type: function type(expectedType) {
        return "The expected type is ".concat(expectedType.indexOf("-") < 0 ? expectedType : expectedType.split("-")[1]);
      }
    },
    get: function get(errorObj, key) {
      if (errorObj.what && errorMessage[errorObj.why].problem && typeof errorMessage[errorObj.why].advice === "function") {
        return /*#__PURE__*/_react.default.createElement(_style.ErrorBox, {
          key: key,
          $color: _style.style.colors.error
        }, errorObj.what, " ", errorMessage[errorObj.why].problem, /*#__PURE__*/_react.default.createElement(_style.AdviceBox, {
          $color: _style.style.colors.advice
        }, errorMessage[errorObj.why].advice(errorObj.what)));
      }
    },
    outOfBounds: {
      problem: "is out of bounds!",
      advice: function advice() {
        return "It's must be between ".concat(_datePickerParams.datePickerParams.deadlines[dialogBoxId].min, " and ").concat(_datePickerParams.datePickerParams.deadlines[dialogBoxId].max);
      }
    },
    tooLong: {
      problem: "is too long !",
      advice: function advice(what) {
        return errorMessage.allowed.length(_validation.validation.allowedLength[what]);
      }
    },
    tooShort: {
      problem: "is too short !",
      advice: function advice(what) {
        return errorMessage.allowed.length(_validation.validation.allowedLength[what]);
      }
    },
    wrongFormat: {
      problem: "is in wrong format !",
      advice: function advice(what) {
        return errorMessage.allowed.format(what);
      }
    },
    wrongType: {
      problem: "is in wrong type !",
      advice: function advice(what) {
        return errorMessage.allowed.type(_validation.validation.allowedType[what]);
      }
    }
  };
  (0, _react.useEffect)(function () {
    Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2.default)(require("../../features/error"));
    }).then(function (errorAction) {
      return dispatch(errorAction.getErrors(dialogBoxId));
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_dialog.default, {
    dialogBoxId: "".concat(dialogBoxId, "-err-msg"),
    htmlClass: "hrnet-dp-error ".concat(htmlClass && htmlClass),
    displayBox: error.error[dialogBoxId] && error.status !== "empty" ? true : false
  }, error.error[dialogBoxId] && error.error[dialogBoxId].length > 0 && error.error[dialogBoxId].map(function (err, index) {
    return err.what && errorMessage.get(err, "error".concat(index));
  }));
}

var _default = Error;
exports.default = _default;