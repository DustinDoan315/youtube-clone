import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn } from '../candle/types';
export type LineChartPriceTextProps = {
    format?: TFormatterFn<string>;
    precision?: number;
    variant?: 'formatted' | 'value';
    style?: Animated.AnimateProps<RNTextProps>['style'];
    /**
     * By default, it will use the current active index from the chart.
     * If this is set it will use the index provided.
     */
    index?: number;
};
export declare function LineChartPriceText({ format, precision, variant, style, index, }: LineChartPriceTextProps): React.JSX.Element;
export declare namespace LineChartPriceText {
    var displayName: string;
}
//# sourceMappingURL=PriceText.d.ts.map