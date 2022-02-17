"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _style = require("../../style");

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
    $longSize: longSize
  }, children && children);
}

Dialog.defaultProps = {
  isDisplay: false,
  isModal: false
};
var _default = Dialog;
exports.default = _default;