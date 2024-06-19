"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursorCrosshair = LineChartCursorCrosshair;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _Cursor = require("./Cursor");
var _useLineChart = require("./useLineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
LineChartCursorCrosshair.displayName = 'LineChartCursorCrosshair';
function LineChartCursorCrosshair({
  children,
  color = 'black',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  ...props
}) {
  const {
    currentX,
    currentY,
    isActive
  } = (0, _useLineChart.useLineChart)();

  // It seems that enabling spring animation on initial render on Android causes a crash.
  const [enableSpringAnimation, setEnableSpringAnimation] = React.useState(_reactNative.Platform.OS === 'ios');
  React.useEffect(() => {
    setTimeout(() => {
      setEnableSpringAnimation(true);
    }, 100);
  }, []);
  const animatedCursorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: currentX.value - outerSize / 2
    }, {
      translateY: currentY.value - outerSize / 2
    }, {
      scale: enableSpringAnimation ? (0, _reactNativeReanimated.withSpring)(isActive.value ? 1 : 0, {
        damping: 10
      }) : 0
    }]
  }), [currentX, currentY, enableSpringAnimation, isActive, outerSize]);
  return /*#__PURE__*/React.createElement(_Cursor.LineChartCursor, _extends({
    type: "crosshair"
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({}, crosshairWrapperProps, {
    style: [{
      width: outerSize,
      height: outerSize,
      alignItems: 'center',
      justifyContent: 'center'
    }, animatedCursorStyle, crosshairWrapperProps.style]
  }), /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, crosshairOuterProps, {
    style: [{
      backgroundColor: color,
      width: outerSize,
      height: outerSize,
      borderRadius: outerSize,
      opacity: 0.1,
      position: 'absolute'
    }, crosshairOuterProps.style]
  })), /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, crosshairProps, {
    style: [{
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size
    }, crosshairProps.style]
  }))), children);
}
//# sourceMappingURL=CursorCrosshair.js.map