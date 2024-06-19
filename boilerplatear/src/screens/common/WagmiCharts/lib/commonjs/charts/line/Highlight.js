"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartHighlight = LineChartHighlight;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _reactNativeSvg = require("react-native-svg");
var _Chart = require("./Chart");
var _LineChartPathContext = require("./LineChartPathContext");
var _useAnimatedPath = _interopRequireDefault(require("./useAnimatedPath"));
var _getXPositionForCurve = require("./utils/getXPositionForCurve");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);
LineChartHighlight.displayName = 'LineChartHighlight';
function LineChartHighlight({
  color = 'black',
  inactiveColor,
  showInactiveColor = true,
  from,
  to,
  width: strokeWidth = 3,
  ...props
}) {
  const {
    path,
    parsedPath,
    height
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    isTransitionEnabled,
    isInactive: _isInactive
  } = React.useContext(_LineChartPathContext.LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;

  ////////////////////////////////////////////////

  const {
    animatedProps
  } = (0, _useAnimatedPath.default)({
    enabled: isTransitionEnabled,
    path
  });

  ////////////////////////////////////////////////

  const clipStart = (0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, from);
  const clipEnd = (0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, to);
  return /*#__PURE__*/React.createElement(_reactNativeSvg.G, null, /*#__PURE__*/React.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/React.createElement(_reactNativeSvg.ClipPath, {
    id: "clip"
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Rect, {
    x: clipStart,
    y: "0",
    width: clipEnd - clipStart,
    height: height,
    fill: "white"
  }))), /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    clipPath: "url(#clip)",
    animatedProps: animatedProps,
    fill: "transparent",
    stroke: isInactive ? inactiveColor || color : color,
    strokeWidth: strokeWidth,
    strokeOpacity: isInactive && !inactiveColor ? 0.5 : 1
  }, props)));
}
//# sourceMappingURL=Highlight.js.map