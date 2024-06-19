import * as React from 'react';
import type { StyleProp, TextStyle, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { CandlestickChartPriceTextProps } from './PriceText';
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
export declare const CandlestickChartCrosshairTooltipContext: React.Context<CandlestickChartCrosshairTooltipContext>;
export declare function CandlestickChartCrosshairTooltip({ children, xGutter, yGutter, tooltipTextProps, textStyle, ...props }: CandlestickChartCrosshairTooltipProps): React.JSX.Element;
//# sourceMappingURL=CrosshairTooltip.d.ts.map