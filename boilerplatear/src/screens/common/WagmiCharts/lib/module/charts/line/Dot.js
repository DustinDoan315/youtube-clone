function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import Animated, { Easing, useAnimatedProps, useDerivedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import { getXPositionForCurve } from './utils/getXPositionForCurve';
import { getYForX } from 'react-native-redash';
import { useLineChart } from './useLineChart';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
LineChartDot.displayName = 'LineChartDot';
export function LineChartDot({
  at,
  color: defaultColor = 'black',
  dotProps,
  hasOuterDot: defaultHasOuterDot = false,
  hasPulse = false,
  inactiveColor,
  outerDotProps,
  pulseBehaviour = 'while-inactive',
  pulseDurationMs = 800,
  showInactiveColor = true,
  size = 4,
  outerSize = size * 4
}) {
  const {
    isActive
  } = useLineChart();
  const {
    parsedPath
  } = React.useContext(LineChartDimensionsContext);

  ////////////////////////////////////////////////////////////

  const {
    isInactive: _isInactive
  } = React.useContext(LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;
  const color = isInactive ? inactiveColor || defaultColor : defaultColor;
  const opacity = isInactive && !inactiveColor ? 0.5 : 1;
  const hasOuterDot = defaultHasOuterDot || hasPulse;

  ////////////////////////////////////////////////////////////

  const x = useDerivedValue(() => {
    return withTiming(getXPositionForCurve(parsedPath, at));
  }, [at, parsedPath]);
  const y = useDerivedValue(() => withTiming(getYForX(parsedPath, x.value) || 0), [parsedPath, x]);

  ////////////////////////////////////////////////////////////

  const animatedDotProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value
  }), [x, y]);
  const animatedOuterDotProps = useAnimatedProps(() => {
    let defaultProps = {
      cx: x.value,
      cy: y.value,
      opacity: 0.1,
      r: outerSize
    };
    if (!hasPulse) {
      return defaultProps;
    }
    if (isActive.value && pulseBehaviour === 'while-inactive') {
      return {
        ...defaultProps,
        r: 0
      };
    }
    const easing = Easing.out(Easing.sin);
    const animatedOpacity = withRepeat(withSequence(withTiming(0.8), withTiming(0, {
      duration: pulseDurationMs,
      easing
    })), -1, false);
    const scale = withRepeat(withSequence(withTiming(0), withTiming(outerSize, {
      duration: pulseDurationMs,
      easing
    })), -1, false);
    if (pulseBehaviour === 'while-inactive') {
      return {
        ...defaultProps,
        opacity: isActive.value ? withTiming(0) : animatedOpacity,
        r: isActive.value ? withTiming(0) : scale
      };
    }
    return {
      ...defaultProps,
      opacity: animatedOpacity,
      r: scale
    };
  }, [hasPulse, isActive, outerSize, pulseBehaviour, pulseDurationMs, x, y]);

  ////////////////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedDotProps,
    r: size,
    fill: color,
    opacity: opacity
  }, dotProps)), hasOuterDot && /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedOuterDotProps,
    fill: color
  }, outerDotProps)));
}
//# sourceMappingURL=Dot.js.map