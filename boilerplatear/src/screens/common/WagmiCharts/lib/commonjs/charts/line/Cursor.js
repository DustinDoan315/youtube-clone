"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CursorContext = void 0;
exports.LineChartCursor = LineChartCursor;
var React = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _Chart = require("./Chart");
var _reactNative = require("react-native");
var _d3Array = require("d3-array");
var _d3Scale = require("d3-scale");
var _useLineChart = require("./useLineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const CursorContext = exports.CursorContext = /*#__PURE__*/React.createContext({
  type: ''
});
LineChartCursor.displayName = 'LineChartCursor';
function LineChartCursor({
  children,
  snapToPoint,
  type,
  ...props
}) {
  const {
    pathWidth: width,
    parsedPath
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data,
    xDomain
  } = (0, _useLineChart.useLineChart)();
  const xValues = React.useMemo(() => data.map(({
    timestamp
  }, i) => xDomain ? timestamp : i), [data, xDomain]);

  // Same scale as in /src/charts/line/utils/getPath.ts
  const scaleX = React.useMemo(() => {
    const domainArray = xDomain ?? [0, xValues.length];
    return (0, _d3Scale.scaleLinear)().domain(domainArray).range([0, width]);
  }, [width, xDomain, xValues.length]);
  const linearScalePositionAndIndex = ({
    xPosition
  }) => {
    if (!parsedPath) {
      return;
    }

    // Calculate a scaled timestamp for the current touch position
    const xRelative = scaleX.invert(xPosition);
    const closestIndex = (0, _d3Array.bisectCenter)(xValues, xRelative);
    const pathDataDelta = Math.abs(parsedPath.curves.length - xValues.length); // sometimes there is a difference between data length and number of path curves.
    const closestPathCurve = Math.max(Math.min(closestIndex, parsedPath.curves.length + 1) - pathDataDelta, 0);
    const newXPosition = (closestIndex > 0 ? parsedPath.curves[closestPathCurve].to : parsedPath.move).x;
    // Update values
    currentIndex.value = closestIndex;
    currentX.value = newXPosition;
  };
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onActive: ({
      x
    }) => {
      if (parsedPath) {
        const xPosition = Math.max(0, x <= width ? x : width);
        isActive.value = true;

        // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24
        const minIndex = 0;
        const boundedIndex = Math.max(minIndex, Math.round(xPosition / width / (1 / (data.length - 1))));
        if (snapToPoint) {
          // We have to run this on the JS thread unfortunately as the scaleLinear functions won't work on UI thread
          (0, _reactNativeReanimated.runOnJS)(linearScalePositionAndIndex)({
            xPosition
          });
        } else if (!snapToPoint) {
          currentX.value = xPosition;
          currentIndex.value = boundedIndex;
        }
      }
    },
    onEnd: () => {
      isActive.value = false;
      currentIndex.value = -1;
    }
  });
  return /*#__PURE__*/React.createElement(CursorContext.Provider, {
    value: {
      type
    }
  }, /*#__PURE__*/React.createElement(_reactNativeGestureHandler.LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent,
    shouldCancelWhenOutside: false
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, children)));
}
//# sourceMappingURL=Cursor.js.map