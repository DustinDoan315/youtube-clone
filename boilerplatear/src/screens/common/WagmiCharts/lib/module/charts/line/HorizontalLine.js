function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import Animated, { useAnimatedProps, useDerivedValue, withTiming } from 'react-native-reanimated';
import { Line as SVGLine } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import React from 'react';
import { getXPositionForCurve } from './utils/getXPositionForCurve';
import { getYForX } from 'react-native-redash';
import { useLineChart } from './useLineChart';
const AnimatedLine = Animated.createAnimatedComponent(SVGLine);
LineChartHorizontalLine.displayName = 'LineChartHorizontalLine';
export function LineChartHorizontalLine({
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
  } = React.useContext(LineChartDimensionsContext);
  const {
    yDomain
  } = useLineChart();
  const y = useDerivedValue(() => {
    if (typeof at === 'number' || at.index != null) {
      const index = typeof at === 'number' ? at : at.index;
      const yForX = getYForX(parsedPath, getXPositionForCurve(parsedPath, index)) || 0;
      return withTiming(yForX + offsetY);
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
    return withTiming(offsetTopPixels + offsetY);
  }, [at, gutter, height, offsetY, parsedPath, yDomain.max, yDomain.min]);
  const lineAnimatedProps = useAnimatedProps(() => ({
    x1: 0,
    x2: width,
    y1: y.value,
    y2: y.value
  }), [width, y]);
  return /*#__PURE__*/React.createElement(AnimatedLine, _extends({
    animatedProps: lineAnimatedProps,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps));
}
//# sourceMappingURL=HorizontalLine.js.map