import * as React from 'react';
import Animated from 'react-native-reanimated';
import { LineChartPriceTextProps } from './PriceText';
import type { ViewProps } from 'react-native';
export type LineChartTooltipProps = Animated.AnimateProps<ViewProps> & {
    children?: React.ReactNode;
    xGutter?: number;
    yGutter?: number;
    cursorGutter?: number;
    position?: 'top' | 'bottom';
    textProps?: LineChartPriceTextProps;
    textStyle?: LineChartPriceTextProps['style'];
    /**
     * When specified the tooltip is considered static, and will
     * always be rendered at the given index, unless there is interaction
     * with the chart (like interacting with a cursor).
     *
     * @default undefined
     */
    at?: number;
};
export declare function LineChartTooltip({ children, xGutter, yGutter, cursorGutter, position, textProps, textStyle, at, ...props }: LineChartTooltipProps): React.JSX.Element;
export declare namespace LineChartTooltip {
    var displayName: string;
}
//# sourceMappingURL=Tooltip.d.ts.map