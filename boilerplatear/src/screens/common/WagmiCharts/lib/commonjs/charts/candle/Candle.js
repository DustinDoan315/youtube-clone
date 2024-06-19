"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCandle = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeSvg = require("react-native-svg");
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AnimatedRect = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Rect);
const AnimatedLine = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Line);
const CandlestickChartCandle = ({
  candle,
  maxHeight,
  domain,
  margin = 2,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  rectProps: overrideRectProps,
  lineProps: overrideLineProps,
  index,
  width,
  useAnimations = true,
  renderLine = props => props.useAnimations ? /*#__PURE__*/_react.default.createElement(AnimatedLine, props) : /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Line, props),
  renderRect = props => props.useAnimations ? /*#__PURE__*/_react.default.createElement(AnimatedRect, props) : /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, props)
}) => {
  const {
    close,
    open,
    high,
    low
  } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  const lineProps = _react.default.useMemo(() => ({
    stroke: fill,
    strokeWidth: 1,
    direction: isPositive ? 'positive' : 'negative',
    x1: x + width / 2,
    y1: (0, _utils.getY)({
      maxHeight,
      value: low,
      domain
    }),
    x2: x + width / 2,
    y2: (0, _utils.getY)({
      maxHeight,
      value: high,
      domain
    }),
    ...overrideLineProps
  }), [domain, fill, high, isPositive, low, maxHeight, overrideLineProps, width, x]);
  const animatedLineProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x1: (0, _reactNativeReanimated.withTiming)(x + width / 2),
    y1: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: low,
      domain
    })),
    x2: (0, _reactNativeReanimated.withTiming)(x + width / 2),
    y2: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: high,
      domain
    }))
  }));
  const rectProps = _react.default.useMemo(() => ({
    width: width - margin * 2,
    fill: fill,
    direction: isPositive ? 'positive' : 'negative',
    x: x + margin,
    y: (0, _utils.getY)({
      maxHeight,
      value: max,
      domain
    }),
    height: (0, _utils.getHeight)({
      maxHeight,
      value: max - min,
      domain
    }),
    ...overrideRectProps
  }), [domain, fill, isPositive, margin, max, maxHeight, min, overrideRectProps, width, x]);
  const animatedRectProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x: (0, _reactNativeReanimated.withTiming)(x + margin),
    y: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: max,
      domain
    })),
    height: (0, _reactNativeReanimated.withTiming)((0, _utils.getHeight)({
      maxHeight,
      value: max - min,
      domain
    }))
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderLine({
    ...lineProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedLineProps
    } : {})
  }), renderRect({
    ...rectProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedRectProps
    } : {})
  }));
};
exports.CandlestickChartCandle = CandlestickChartCandle;
//# sourceMappingURL=Candle.js.map