"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCandles = CandlestickChartCandles;
var React = _interopRequireWildcard(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _Chart = require("./Chart");
var _Candle = require("./Candle");
var _useCandlestickChart = require("./useCandlestickChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  margin,
  useAnimations = true,
  renderRect,
  renderLine,
  candleProps,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    data,
    domain,
    step
  } = (0, _useCandlestickChart.useCandlestickChart)();

  ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(_reactNativeSvg.Svg, _extends({
    width: width,
    height: height
  }, props), step > 0 && data.map((candle, index) => /*#__PURE__*/React.createElement(_Candle.CandlestickChartCandle, _extends({
    key: index,
    domain: domain,
    margin: margin,
    maxHeight: height,
    width: step,
    positiveColor: positiveColor,
    negativeColor: negativeColor,
    renderRect: renderRect,
    renderLine: renderLine,
    rectProps: rectProps,
    lineProps: lineProps,
    useAnimations: useAnimations,
    candle: candle,
    index: index
  }, candleProps))));
}
//# sourceMappingURL=Candles.js.map