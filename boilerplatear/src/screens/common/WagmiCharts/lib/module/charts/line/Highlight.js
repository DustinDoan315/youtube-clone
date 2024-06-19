function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import Animated from 'react-native-reanimated';
import { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import useAnimatedPath from './useAnimatedPath';
import { getXPositionForCurve } from './utils/getXPositionForCurve';
const AnimatedPath = Animated.createAnimatedComponent(Path);
LineChartHighlight.displayName = 'LineChartHighlight';
export function LineChartHighlight({
  color = 'black',
  inactiveColor,
  showInactiveColor = true,
  from,
  to,
  width: strokeWidth = 3,
  ...props
}) {
  const {
    path,
    parsedPath,
    height
  } = React.useContext(LineChartDimensionsContext);
  const {
    isTransitionEnabled,
    isInactive: _isInactive
  } = React.useContext(LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;

  ////////////////////////////////////////////////

  const {
    animatedProps
  } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path
  });

  ////////////////////////////////////////////////

  const clipStart = getXPositionForCurve(parsedPath, from);
  const clipEnd = getXPositionForCurve(parsedPath, to);
  return /*#__PURE__*/React.createElement(G, null, /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(ClipPath, {
    id: "clip"
  }, /*#__PURE__*/React.createElement(Rect, {
    x: clipStart,
    y: "0",
    width: clipEnd - clipStart,
    height: height,
    fill: "white"
  }))), /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    clipPath: "url(#clip)",
    animatedProps: animatedProps,
    fill: "transparent",
    stroke: isInactive ? inactiveColor || color : color,
    strokeWidth: strokeWidth,
    strokeOpacity: isInactive && !inactiveColor ? 0.5 : 1
  }, props)));
}
//# sourceMappingURL=Highlight.js.map