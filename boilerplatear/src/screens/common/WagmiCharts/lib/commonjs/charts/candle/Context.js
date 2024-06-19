"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartContext = void 0;
exports.CandlestickChartProvider = CandlestickChartProvider;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CandlestickChartContext = exports.CandlestickChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentY: {
    value: -1
  },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setWidth: () => undefined,
  setHeight: () => undefined
});
function CandlestickChartProvider({
  children,
  data = []
}) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const currentX = (0, _reactNativeReanimated.useSharedValue)(-1);
  const currentY = (0, _reactNativeReanimated.useSharedValue)(-1);
  const domain = React.useMemo(() => (0, _utils.getDomain)(data), [data]);
  React.useEffect(() => {
    if (data.length) {
      const newStep = width / data.length;
      setStep(newStep);
    }
  }, [data.length, width]);
  const contextValue = React.useMemo(() => ({
    currentX,
    currentY,
    data,
    width,
    height,
    domain,
    step,
    setWidth,
    setHeight,
    setStep
  }), [currentX, currentY, data, domain, height, step, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartContext.Provider, {
    value: contextValue
  }, children);
}
//# sourceMappingURL=Context.js.map