"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChart = CandlestickChart;
exports.CandlestickChartDimensionsContext = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useCandlestickChart = require("./useCandlestickChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CandlestickChartDimensionsContext = exports.CandlestickChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0
});
const {
  width: screenWidth
} = _reactNative.Dimensions.get('window');
function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  ...props
}) {
  const {
    setWidth,
    setHeight
  } = (0, _useCandlestickChart.useCandlestickChart)();
  React.useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [height, setHeight, setWidth, width]);
  const contextValue = React.useMemo(() => ({
    width,
    height
  }), [height, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(_reactNative.View, props, children));
}
//# sourceMappingURL=Chart.js.map