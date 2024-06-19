"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCrosshairTooltip = CandlestickChartCrosshairTooltip;
exports.CandlestickChartCrosshairTooltipContext = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _Chart = require("./Chart");
var _useCandlestickChart = require("./useCandlestickChart");
var _PriceText = require("./PriceText");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const CandlestickChartCrosshairTooltipContext = exports.CandlestickChartCrosshairTooltipContext = /*#__PURE__*/React.createContext({
  position: {
    value: 'left'
  }
});
function CandlestickChartCrosshairTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  tooltipTextProps,
  textStyle,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    currentY
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const {
    position
  } = React.useContext(CandlestickChartCrosshairTooltipContext);
  const elementHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const handleLayout = React.useCallback(event => {
    elementHeight.value = event.nativeEvent.layout.height;
    elementWidth.value = event.nativeEvent.layout.width;
  }, [elementHeight, elementWidth]);
  const topOffset = (0, _reactNativeReanimated.useDerivedValue)(() => {
    let offset = 0;
    if (currentY.value < elementHeight.value / 2 + yGutter) {
      offset = currentY.value - (elementHeight.value / 2 + yGutter);
    } else if (currentY.value + elementHeight.value / 2 > height - yGutter) {
      offset = currentY.value + elementHeight.value / 2 - height + yGutter;
    }
    return offset;
  }, [currentY, elementHeight, height, yGutter]);
  const tooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    padding: 4
  }), []);
  const leftTooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    left: xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'left' ? 1 : 0
  }), [elementHeight, position, topOffset, xGutter]);
  const rightTooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    left: width - elementWidth.value - xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'right' ? 1 : 0
  }), [elementHeight, elementWidth, position, topOffset, width, xGutter]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [tooltip, leftTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps?.style, textStyle]
  }))), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({}, props, {
    style: [tooltip, rightTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps?.style, textStyle]
  }))));
}
const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 14
  }
});
//# sourceMappingURL=CrosshairTooltip.js.map