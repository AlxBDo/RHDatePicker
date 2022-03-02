"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _style = require("../../style");

/**
 * Display DialogBox component 
 * @component 
 * @param {object} props
 * @param {object} props.children 
 * @param {string} props.dialogBoxId - define html attribute id 
 * @param {object} props.htmlClass - contains html classes to assign to component className attribute 
 * @param {boolean} displayBox - true is display 
 * @param {boolean} isModal - true is modal 
 * @param {string} color - define color 
 * @param {string} backgroundColor - define backgroundColor 
 * @param {string} name - use to styled component definition 
 * @param {boolean} longSize - true is long 
 * @returns {object} DialogBox
 */
function Dialog(props) {
  var children = props.children,
      dialogBoxId = props.dialogBoxId,
      htmlClass = props.htmlClass,
      displayBox = props.displayBox,
      isModal = props.isModal,
      color = props.color,
      backgroundColor = props.backgroundColor,
      name = props.name,
      longSize = props.longSize;
  return /*#__PURE__*/_react.default.createElement(_style.DialogBox, {
    id: dialogBoxId && dialogBoxId,
    className: htmlClass && htmlClass,
    $backgroundColor: backgroundColor,
    $color: color,
    $name: name && name,
    $isDisplay: displayBox,
    $isModal: isModal,
    $longSize: longSize,
    "data-testid": dialogBoxId.indexOf("-calendar-modal") > 0 && "date-picker-calendar"
  }, children && children);
}

Dialog.defaultProps = {
  displayBox: false,
  isModal: false
};
var _default = Dialog;
exports.default = _default;