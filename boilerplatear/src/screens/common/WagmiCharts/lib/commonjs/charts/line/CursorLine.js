"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursorLine = LineChartCursorLine;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _Chart = require("./Chart");
var _Cursor = require("./Cursor");
var _useLineChart = require("./useLineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
LineChartCursorLine.displayName = 'LineChartCursorLine';
function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps,
  ...cursorProps
}) {
  const {
    height
  } = _react.default.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const vertical = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: isActive.value ? 1 : 0,
    height: '100%',
    transform: [{
      translateX: currentX.value
    }]
  }), [currentX, isActive]);
  return /*#__PURE__*/_react.default.createElement(_Cursor.LineChartCursor, _extends({}, cursorProps, {
    type: "line"
  }), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: vertical
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    style: styles.svg
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Line, _extends({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps)))), children);
}
const styles = _reactNative.StyleSheet.create({
  svg: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    // height: 100% is required for <svg /> on web
    height: '100%'
  }
});
//# sourceMappingURL=CursorLine.js.map