import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn } from 'react-native-wagmi-charts';
type CandlestickChartPriceTextProps = {
    locale?: string;
    options?: {
        [key: string]: string;
    };
    format?: TFormatterFn<number>;
    variant?: 'formatted' | 'value';
    style?: Animated.AnimateProps<RNTextProps>['style'];
};
export declare function CandlestickChartDatetimeText({ locale, options, format, variant, style, }: CandlestickChartPriceTextProps): React.JSX.Element;
export {};
//# sourceMappingURL=DatetimeText.d.ts.map