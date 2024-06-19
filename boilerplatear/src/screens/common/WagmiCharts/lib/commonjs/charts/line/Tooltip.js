"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartTooltip = LineChartTooltip;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _PriceText = require("./PriceText");
var _Cursor = require("./Cursor");
var _Chart = require("./Chart");
var _getXPositionForCurve = require("./utils/getXPositionForCurve");
var _reactNativeRedash = require("react-native-redash");
var _useLineChart = require("./useLineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
LineChartTooltip.displayName = 'LineChartTooltip';
function LineChartTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  textProps,
  textStyle,
  at,
  ...props
}) {
  const {
    width,
    height,
    parsedPath
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    type
  } = React.useContext(_Cursor.CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const x = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]);

  // When the user set a `at` index, get the index's y & x positions
  const atXPosition = (0, _react.useMemo)(() => at !== null && at !== undefined ? (0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, at) : undefined, [at, parsedPath]);
  const atYPosition = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return atXPosition == null ? undefined : (0, _reactNativeRedash.getYForX)(parsedPath, atXPosition) ?? 0;
  }, [atXPosition]);
  const animatedCursorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    let translateXOffset = elementWidth.value / 2;
    // the tooltip is considered static when the user specified an `at` prop
    const isStatic = atYPosition.value != null;

    // Calculate X position:
    const x = atXPosition ?? currentX.value;
    if (x < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - x;
      translateXOffset = translateXOffset - xOffset;
    }
    if (x > width - elementWidth.value / 2 - xGutter) {
      const xOffset = x - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    }

    // Calculate Y position:
    let translateYOffset = 0;
    const y = atYPosition.value ?? currentY.value;
    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;
      if (y - translateYOffset < yGutter) {
        translateYOffset = y - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;
      if (y - translateYOffset + elementHeight.value > height - yGutter) {
        translateYOffset = y - (height - yGutter) + elementHeight.value;
      }
    }

    // determine final translateY value
    let translateY;
    if (type === 'crosshair' || isStatic) {
      translateY = y - translateYOffset;
    } else {
      if (position === 'top') {
        translateY = yGutter;
      } else {
        translateY = height - elementHeight.value - yGutter;
      }
    }
    let opacity = isActive.value ? 1 : 0;
    if (isStatic) {
      // Only show static when there is no active cursor
      opacity = (0, _reactNativeReanimated.withTiming)(isActive.value ? 0 : 1);
    }
    return {
      transform: [{
        translateX: x - translateXOffset
      }, {
        translateY: translateY
      }],
      opacity: opacity
    };
  }, [atXPosition, atYPosition.value, currentX.value, currentY.value, cursorGutter, elementHeight.value, elementWidth.value, height, isActive.value, position, type, width, xGutter, yGutter]);
  return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.LineChartPriceText, _extends({
    index: at,
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map