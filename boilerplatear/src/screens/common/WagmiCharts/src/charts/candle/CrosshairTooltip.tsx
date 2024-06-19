import * as React from 'react';
import type {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewProps,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

export const {width} = Dimensions.get('screen');

import {CandlestickChartDimensionsContext} from './Chart';
import {useCandlestickChart} from './useCandlestickChart';
import {
  CandlestickChartPriceText,
  CandlestickChartPriceTextProps,
} from './PriceText';

export type CandlestickChartCrosshairTooltipProps = ViewProps & {
  children?: React.ReactNode;
  xGutter?: number;
  yGutter?: number;
  tooltipTextProps?: CandlestickChartPriceTextProps;
  textStyle?: Animated.AnimateStyle<StyleProp<TextStyle>>;
};

export type CandlestickChartCrosshairTooltipContext = {
  position: Animated.SharedValue<'left' | 'right'>;
};

export const CandlestickChartCrosshairTooltipContext = React.createContext<any>(
  {
    position: {value: 'left'},
  },
);

export function CandlestickChartCrosshairTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  tooltipTextProps,
  textStyle,
  ...props
}: CandlestickChartCrosshairTooltipProps) {
  const {height} = React.useContext(CandlestickChartDimensionsContext);
  const {currentY, currentX} = useCandlestickChart();
  const {position} = React.useContext(CandlestickChartCrosshairTooltipContext);

  const elementHeight = useSharedValue(0);
  const elementWidth = useSharedValue(0);

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      elementHeight.value = event.nativeEvent.layout.height;
      elementWidth.value = event.nativeEvent.layout.width;
    },
    [elementHeight, elementWidth],
  );

  const topOffset = useDerivedValue(() => {
    let offset = 0;
    if (currentY.value < elementHeight.value / 2 + yGutter) {
      offset = currentY.value - (elementHeight.value / 2 + yGutter);
    } else if (currentY.value + elementHeight.value / 2 > height - yGutter) {
      offset = currentY.value + elementHeight.value / 2 - height + yGutter;
    }

    return offset;
  }, [currentY, elementHeight, height, yGutter]);

  const tooltip = useAnimatedStyle(
    () => ({
      backgroundColor: 'pink',
      position: 'absolute',
      display: 'flex',
      padding: 4,
    }),
    [],
  );
  const leftTooltip = useAnimatedStyle(
    () => ({
      left: currentX.value - elementWidth.value - xGutter,
      top: -(elementHeight.value / 2) - topOffset.value,
      opacity: position.value === 'left' ? 1 : 0,
    }),
    [elementHeight, position, topOffset, xGutter],
  );

  const rightTooltip = useAnimatedStyle(
    () => ({
      left: currentX.value + xGutter,
      top: -(elementHeight.value / 2) - topOffset.value,
      opacity: position.value === 'right' ? 1 : 0,
    }),
    [elementHeight, elementWidth, position, topOffset, width, xGutter],
  );

  return (
    <>
      <Animated.View
        onLayout={handleLayout}
        {...props}
        style={[tooltip, leftTooltip, props.style]}>
        {children || (
          <CandlestickChartPriceText
            {...tooltipTextProps}
            style={[styles.text, tooltipTextProps?.style, textStyle]}
          />
        )}
      </Animated.View>
      <Animated.View {...props} style={[tooltip, rightTooltip, props.style]}>
        {children || (
          <CandlestickChartPriceText
            {...tooltipTextProps}
            style={[styles.text, tooltipTextProps?.style, textStyle]}
          />
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});
