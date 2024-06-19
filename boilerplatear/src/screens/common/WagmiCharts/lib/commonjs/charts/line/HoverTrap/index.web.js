"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartHoverTrap = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Chart = require("../Chart");
var _useLineChart = require("../useLineChart");
var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let isEnabled = false;

// the following logic comes from the creator of react-native-web
// https://gist.github.com/necolas/1c494e44e23eb7f8c5864a2fac66299a
// it's also used by MotiPressable's hover interactions
// https://github.com/nandorojo/moti/blob/master/packages/interactions/src/pressable/hoverable.tsx
if (_ExecutionEnvironment.canUseDOM) {
  /**
   * Web browsers emulate mouse events (and hover states) after touch events.
   * This code infers when the currently-in-use modality supports hover
   * (including for multi-modality devices) and considers "hover" to be enabled
   * if a mouse movement occurs more than 1 second after the last touch event.
   * This threshold is long enough to account for longer delays between the
   * browser firing touch and mouse events on low-powered devices.
   */
  const HOVER_THRESHOLD_MS = 1000;
  let lastTouchTimestamp = 0;
  function enableHover() {
    if (isEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
      return;
    }
    isEnabled = true;
  }
  function disableHover() {
    lastTouchTimestamp = Date.now();
    if (isEnabled) {
      isEnabled = false;
    }
  }
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('touchmove', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);
}
function isHoverEnabled() {
  return isEnabled;
}
const LineChartHoverTrap = () => {
  const {
    width,
    parsedPath
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data
  } = (0, _useLineChart.useLineChart)();
  const onMouseMove = React.useCallback(({
    x
  }) => {
    if (isHoverEnabled()) {
      if (parsedPath) {
        const boundedX = Math.min(x, width);
        isActive.value = true;
        currentX.value = boundedX;

        // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24
        const minIndex = 0;
        const boundedIndex = Math.max(minIndex, Math.round(boundedX / width / (1 / (data.length - 1))));
        currentIndex.value = boundedIndex;
      }
    } else {
      isActive.value = false;
      currentIndex.value = -1;
    }
  }, [currentIndex, currentX, data.length, isActive, parsedPath, width]);
  const onMouseLeave = React.useCallback(() => {
    isActive.value = false;
    currentIndex.value = -1;
  }, [currentIndex, isActive]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill
    // @ts-expect-error mouse move event
    ,
    onMouseMove: React.useCallback(
    // eslint-disable-next-line no-undef
    e => {
      let rect = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - rect.left; // x position within the element.

      onMouseMove({
        x
      });
    }, [onMouseMove]),
    onMouseLeave: onMouseLeave
  });
};
exports.LineChartHoverTrap = LineChartHoverTrap;
//# sourceMappingURL=index.web.js.map