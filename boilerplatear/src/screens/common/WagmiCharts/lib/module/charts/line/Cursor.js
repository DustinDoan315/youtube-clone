function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import Animated, { runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { LineChartDimensionsContext } from './Chart';
import { StyleSheet } from 'react-native';
import { bisectCenter } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { useLineChart } from './useLineChart';
export const CursorContext = /*#__PURE__*/React.createContext({
  type: ''
});
LineChartCursor.displayName = 'LineChartCursor';
export function LineChartCursor({
  children,
  snapToPoint,
  type,
  ...props
}) {
  const {
    pathWidth: width,
    parsedPath
  } = React.useContext(LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data,
    xDomain
  } = useLineChart();
  const xValues = React.useMemo(() => data.map(({
    timestamp
  }, i) => xDomain ? timestamp : i), [data, xDomain]);

  // Same scale as in /src/charts/line/utils/getPath.ts
  const scaleX = React.useMemo(() => {
    const domainArray = xDomain ?? [0, xValues.length];
    return scaleLinear().domain(domainArray).range([0, width]);
  }, [width, xDomain, xValues.length]);
  const linearScalePositionAndIndex = ({
    xPosition
  }) => {
    if (!parsedPath) {
      return;
    }

    // Calculate a scaled timestamp for the current touch position
    const xRelative = scaleX.invert(xPosition);
    const closestIndex = bisectCenter(xValues, xRelative);
    const pathDataDelta = Math.abs(parsedPath.curves.length - xValues.length); // sometimes there is a difference between data length and number of path curves.
    const closestPathCurve = Math.max(Math.min(closestIndex, parsedPath.curves.length + 1) - pathDataDelta, 0);
    const newXPosition = (closestIndex > 0 ? parsedPath.curves[closestPathCurve].to : parsedPath.move).x;
    // Update values
    currentIndex.value = closestIndex;
    currentX.value = newXPosition;
  };
  const onGestureEvent = useAnimatedGestureHandler({
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
          runOnJS(linearScalePositionAndIndex)({
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
  }, /*#__PURE__*/React.createElement(LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent,
    shouldCancelWhenOutside: false
  }, props), /*#__PURE__*/React.createElement(Animated.View, {
    style: StyleSheet.absoluteFill
  }, children)));
}
//# sourceMappingURL=Cursor.js.map