"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartDot = LineChartDot;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeSvg = require("react-native-svg");
var _Chart = require("./Chart");
var _LineChartPathContext = require("./LineChartPathContext");
var _getXPositionForCurve = require("./utils/getXPositionForCurve");
var _reactNativeRedash = require("react-native-redash");
var _useLineChart = require("./useLineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);
LineChartDot.displayName = 'LineChartDot';
function LineChartDot({
  at,
  color: defaultColor = 'black',
  dotProps,
  hasOuterDot: defaultHasOuterDot = false,
  hasPulse = false,
  inactiveColor,
  outerDotProps,
  pulseBehaviour = 'while-inactive',
  pulseDurationMs = 800,
  showInactiveColor = true,
  size = 4,
  outerSize = size * 4
}) {
  const {
    isActive
  } = (0, _useLineChart.useLineChart)();
  const {
    parsedPath
  } = React.useContext(_Chart.LineChartDimensionsContext);

  ////////////////////////////////////////////////////////////

  const {
    isInactive: _isInactive
  } = React.useContext(_LineChartPathContext.LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;
  const color = isInactive ? inactiveColor || defaultColor : defaultColor;
  const opacity = isInactive && !inactiveColor ? 0.5 : 1;
  const hasOuterDot = defaultHasOuterDot || hasPulse;

  ////////////////////////////////////////////////////////////

  const x = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _reactNativeReanimated.withTiming)((0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, at));
  }, [at, parsedPath]);
  const y = (0, _reactNativeReanimated.useDerivedValue)(() => (0, _reactNativeReanimated.withTiming)((0, _reactNativeRedash.getYForX)(parsedPath, x.value) || 0), [parsedPath, x]);

  ////////////////////////////////////////////////////////////

  const animatedDotProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    cx: x.value,
    cy: y.value
  }), [x, y]);
  const animatedOuterDotProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    let defaultProps = {
      cx: x.value,
      cy: y.value,
      opacity: 0.1,
      r: outerSize
    };
    if (!hasPulse) {
      return defaultProps;
    }
    if (isActive.value && pulseBehaviour === 'while-inactive') {
      return {
        ...defaultProps,
        r: 0
      };
    }
    const easing = _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.sin);
    const animatedOpacity = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(0.8), (0, _reactNativeReanimated.withTiming)(0, {
      duration: pulseDurationMs,
      easing
    })), -1, false);
    const scale = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(0), (0, _reactNativeReanimated.withTiming)(outerSize, {
      duration: pulseDurationMs,
      easing
    })), -1, false);
    if (pulseBehaviour === 'while-inactive') {
      return {
        ...defaultProps,
        opacity: isActive.value ? (0, _reactNativeReanimated.withTiming)(0) : animatedOpacity,
        r: isActive.value ? (0, _reactNativeReanimated.withTiming)(0) : scale
      };
    }
    return {
      ...defaultProps,
      opacity: animatedOpacity,
      r: scale
    };
  }, [hasPulse, isActive, outerSize, pulseBehaviour, pulseDurationMs, x, y]);

  ////////////////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedDotProps,
    r: size,
    fill: color,
    opacity: opacity
  }, dotProps)), hasOuterDot && /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedOuterDotProps,
    fill: color
  }, outerDotProps)));
}
//# sourceMappingURL=Dot.js.map