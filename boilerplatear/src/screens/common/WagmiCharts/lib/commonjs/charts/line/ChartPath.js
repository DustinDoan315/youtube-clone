"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartPathWrapper = LineChartPathWrapper;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactKeyedFlattenChildren = _interopRequireDefault(require("react-keyed-flatten-children"));
var _Chart = require("./Chart");
var _LineChartPathContext = require("./LineChartPathContext");
var _Path = require("./Path");
var _useLineChart = require("./useLineChart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const BACKGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartHorizontalLine', 'LineChartGradient', 'LineChartDot', 'LineChartTooltip'];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];
const AnimatedSVG = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Svg);
LineChartPathWrapper.displayName = 'LineChartPathWrapper';
function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  widthOffset = 20,
  pathProps = {},
  showInactivePath = true,
  animateOnMount,
  mountAnimationDuration = animationDuration,
  mountAnimationProps = animationProps
}) {
  const {
    height,
    pathWidth,
    width
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const isMounted = (0, _reactNativeReanimated.useSharedValue)(false);
  const hasMountedAnimation = (0, _reactNativeReanimated.useSharedValue)(false);
  React.useEffect(() => {
    isMounted.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ////////////////////////////////////////////////

  const svgProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    const shouldAnimateOnMount = animateOnMount === 'foreground';
    const inactiveWidth = !isMounted.value && shouldAnimateOnMount ? 0 : pathWidth;
    let duration = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationDuration : animationDuration;
    const props = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationProps : animationProps;
    if (isActive.value) {
      duration = 0;
    }
    return {
      width: (0, _reactNativeReanimated.withTiming)(isActive.value ?
      // on Web, <svg /> elements don't support negative widths
      // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
      Math.max(currentX.value, 0) : inactiveWidth + widthOffset, Object.assign({
        duration
      }, props), () => {
        hasMountedAnimation.value = true;
      })
    };
  }, [animateOnMount, animationDuration, animationProps, currentX, hasMountedAnimation, isActive, isMounted, mountAnimationDuration, mountAnimationProps, pathWidth, widthOffset]);
  const viewSize = React.useMemo(() => ({
    width,
    height
  }), [width, height]);

  ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;
  if (children) {
    const iterableChildren = (0, _reactKeyedFlattenChildren.default)(children);
    backgroundChildren = iterableChildren.filter(child =>
    // @ts-ignore
    BACKGROUND_COMPONENTS.includes(child?.type?.displayName));
    foregroundChildren = iterableChildren.filter(child =>
    // @ts-ignore
    FOREGROUND_COMPONENTS.includes(child?.type?.displayName));
  }

  ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_LineChartPathContext.LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: showInactivePath,
      isTransitionEnabled: pathProps.isTransitionEnabled ?? true
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: viewSize
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Svg, {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(_Path.LineChartPath, _extends({
    color: color,
    inactiveColor: inactiveColor,
    width: strokeWidth
  }, pathProps)), backgroundChildren))), /*#__PURE__*/React.createElement(_LineChartPathContext.LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: false,
      isTransitionEnabled: pathProps.isTransitionEnabled ?? true
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(AnimatedSVG, {
    animatedProps: svgProps,
    height: height
  }, /*#__PURE__*/React.createElement(_Path.LineChartPath, _extends({
    color: color,
    width: strokeWidth
  }, pathProps)), foregroundChildren))));
}
//# sourceMappingURL=ChartPath.js.map