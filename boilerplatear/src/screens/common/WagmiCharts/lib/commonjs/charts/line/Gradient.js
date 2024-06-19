"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartGradient = LineChartGradient;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _reactNativeSvg = require("react-native-svg");
var _Chart = require("./Chart");
var _LineChartPathContext = require("./LineChartPathContext");
var _useAnimatedPath = _interopRequireDefault(require("./useAnimatedPath"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);
let id = 0;
LineChartGradient.displayName = 'LineChartGradient';
function LineChartGradient({
  color: overrideColor = undefined,
  children,
  ...props
}) {
  const {
    area
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    color: contextColor,
    isTransitionEnabled
  } = React.useContext(_LineChartPathContext.LineChartPathContext);
  const color = overrideColor || contextColor;

  ////////////////////////////////////////////////

  const {
    animatedProps
  } = (0, _useAnimatedPath.default)({
    enabled: isTransitionEnabled,
    path: area
  });

  ////////////////////////////////////////////////

  const localId = React.useRef(++id);

  ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, children ? /*#__PURE__*/React.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/React.createElement(_reactNativeSvg.LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, children)) : /*#__PURE__*/React.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/React.createElement(_reactNativeSvg.LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "20%",
    stopColor: color,
    stopOpacity: 0.15
  }), /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "40%",
    stopColor: color,
    stopOpacity: 0.05
  }), /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "100%",
    stopColor: color,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    animatedProps: animatedProps,
    fill: `url(#${localId.current})`
  }, props)));
}
//# sourceMappingURL=Gradient.js.map