"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartHorizontalLine = LineChartHorizontalLine;
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeSvg = require("react-native-svg");
var _Chart = require("./Chart");
var _react = _interopRequireDefault(require("react"));
var _getXPositionForCurve = require("./utils/getXPositionForCurve");
var _reactNativeRedash = require("react-native-redash");
var _useLineChart = require("./useLineChart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedLine = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Line);
LineChartHorizontalLine.displayName = 'LineChartHorizontalLine';
function LineChartHorizontalLine({
  color = 'gray',
  lineProps = {},
  at = {
    index: 0
  },
  offsetY = 0
}) {
  const {
    width,
    parsedPath,
    height,
    gutter
  } = _react.default.useContext(_Chart.LineChartDimensionsContext);
  const {
    yDomain
  } = (0, _useLineChart.useLineChart)();
  const y = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (typeof at === 'number' || at.index != null) {
      const index = typeof at === 'number' ? at : at.index;
      const yForX = (0, _reactNativeRedash.getYForX)(parsedPath, (0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, index)) || 0;
      return (0, _reactNativeReanimated.withTiming)(yForX + offsetY);
    }
    /**
     * <gutter>
     * | ---------- | <- yDomain.max  |
     * |            |                 | offsetTop
     * |            | <- value        |
     * |            |
     * |            | <- yDomain.min
     * <gutter>
     */

    const offsetTop = yDomain.max - at.value;
    const percentageOffsetTop = offsetTop / (yDomain.max - yDomain.min);
    const heightBetweenGutters = height - gutter * 2;
    const offsetTopPixels = gutter + percentageOffsetTop * heightBetweenGutters;
    return (0, _reactNativeReanimated.withTiming)(offsetTopPixels + offsetY);
  }, [at, gutter, height, offsetY, parsedPath, yDomain.max, yDomain.min]);
  const lineAnimatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x1: 0,
    x2: width,
    y1: y.value,
    y2: y.value
  }), [width, y]);
  return /*#__PURE__*/_react.default.createElement(AnimatedLine, _extends({
    animatedProps: lineAnimatedProps,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps));
}
//# sourceMappingURL=HorizontalLine.js.map