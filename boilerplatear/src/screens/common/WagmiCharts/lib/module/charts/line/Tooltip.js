function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { LineChartPriceText } from './PriceText';
import { CursorContext } from './Cursor';
import { LineChartDimensionsContext } from './Chart';
import { getXPositionForCurve } from './utils/getXPositionForCurve';
import { getYForX } from 'react-native-redash';
import { useLineChart } from './useLineChart';
import { useMemo } from 'react';
LineChartTooltip.displayName = 'LineChartTooltip';
export function LineChartTooltip({
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
  } = React.useContext(LineChartDimensionsContext);
  const {
    type
  } = React.useContext(CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = useLineChart();
  const x = useSharedValue(0);
  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]);

  // When the user set a `at` index, get the index's y & x positions
  const atXPosition = useMemo(() => at !== null && at !== undefined ? getXPositionForCurve(parsedPath, at) : undefined, [at, parsedPath]);
  const atYPosition = useDerivedValue(() => {
    return atXPosition == null ? undefined : getYForX(parsedPath, atXPosition) ?? 0;
  }, [atXPosition]);
  const animatedCursorStyle = useAnimatedStyle(() => {
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
      opacity = withTiming(isActive.value ? 0 : 1);
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
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(LineChartPriceText, _extends({
    index: at,
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map