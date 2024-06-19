"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartLine = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const CandlestickChartLine = ({
  color = 'gray',
  x,
  y,
  ...props
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Line, _extends({
    x1: 0,
    y1: 0,
    x2: x,
    y2: y,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "6 6"
  }, props)));
};
exports.CandlestickChartLine = CandlestickChartLine;
//# sourceMappingURL=Line.js.map