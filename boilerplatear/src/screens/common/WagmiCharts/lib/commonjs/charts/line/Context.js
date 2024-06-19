"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartContext = void 0;
exports.LineChartProvider = LineChartProvider;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _Data = require("./Data");
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LineChartContext = exports.LineChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentIndex: {
    value: -1
  },
  domain: [0, 0],
  isActive: {
    value: false
  },
  yDomain: {
    min: 0,
    max: 0
  },
  xDomain: undefined,
  xLength: 0
});
LineChartProvider.displayName = 'LineChartProvider';
function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength,
  xDomain
}) {
  const currentX = (0, _reactNativeReanimated.useSharedValue)(-1);
  const currentIndex = (0, _reactNativeReanimated.useSharedValue)(-1);
  const isActive = (0, _reactNativeReanimated.useSharedValue)(false);
  const domain = React.useMemo(() => (0, _utils.getDomain)(Array.isArray(data) ? data : Object.values(data)[0]), [data]);
  const contextValue = React.useMemo(() => {
    const values = (0, _utils.lineChartDataPropToArray)(data).map(({
      value
    }) => value);
    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: {
        min: yRange?.min ?? Math.min(...values),
        max: yRange?.max ?? Math.max(...values)
      },
      xDomain,
      xLength: xLength ?? (Array.isArray(data) ? data : Object.values(data)[0]).length
    };
  }, [currentIndex, currentX, data, domain, isActive, yRange?.max, yRange?.min, xLength, xDomain]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => currentIndex.value, (x, prevX) => {
    if (x !== -1 && x !== prevX && onCurrentIndexChange) {
      (0, _reactNativeReanimated.runOnJS)(onCurrentIndexChange)(x);
    }
  }, [currentIndex]);
  return /*#__PURE__*/React.createElement(_Data.LineChartDataProvider, {
    data: data
  }, /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: contextValue
  }, children));
}
//# sourceMappingURL=Context.js.map