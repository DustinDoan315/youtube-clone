"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCrosshair = CandlestickChartCrosshair;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeRedash = require("react-native-redash");
var _Chart = require("./Chart");
var _Line = require("./Line");
var _useCandlestickChart = require("./useCandlestickChart");
var _CrosshairTooltip = require("./CrosshairTooltip");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function CandlestickChartCrosshair({
  color,
  onCurrentXChange,
  children,
  horizontalCrosshairProps = {},
  verticalCrosshairProps = {},
  lineProps = {},
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    currentX,
    currentY,
    step
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const tooltipPosition = (0, _reactNativeReanimated.useSharedValue)('left');
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onActive: ({
      x,
      y
    }) => {
      const boundedX = x <= width - 1 ? x : width - 1;
      if (boundedX < 100) {
        tooltipPosition.value = 'right';
      } else {
        tooltipPosition.value = 'left';
      }
      opacity.value = 1;
      currentY.value = (0, _reactNativeRedash.clamp)(y, 0, height);
      currentX.value = boundedX - boundedX % step + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
    }
  });
  const horizontal = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: currentY.value
    }]
  }), [opacity, currentY]);
  const vertical = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{
      translateX: currentX.value
    }]
  }), [opacity, currentX]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => currentX.value, (data, prevData) => {
    if (data !== -1 && data !== prevData && onCurrentXChange) {
      (0, _reactNativeReanimated.runOnJS)(onCurrentXChange)(data);
    }
  }, [currentX]);
  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    style: [_reactNative.StyleSheet.absoluteFill, horizontal]
  }, horizontalCrosshairProps), /*#__PURE__*/React.createElement(_Line.CandlestickChartLine, _extends({
    color: color,
    x: width,
    y: 0
  }, lineProps)), /*#__PURE__*/React.createElement(_CrosshairTooltip.CandlestickChartCrosshairTooltipContext.Provider, {
    value: {
      position: tooltipPosition
    }
  }, children)), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    style: [_reactNative.StyleSheet.absoluteFill, vertical]
  }, verticalCrosshairProps), /*#__PURE__*/React.createElement(_Line.CandlestickChartLine, _extends({
    color: color,
    x: 0,
    y: height
  }, lineProps)))));
}
//# sourceMappingURL=Crosshair.js.map