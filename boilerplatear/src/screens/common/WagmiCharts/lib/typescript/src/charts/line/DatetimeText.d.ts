import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn } from 'react-native-wagmi-charts';
type LineChartDatetimeProps = {
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
    format?: TFormatterFn<number>;
    variant?: 'formatted' | 'value';
    style?: Animated.AnimateProps<RNTextProps>['style'];
};
export declare function LineChartDatetimeText({ locale, options, format, variant, style, }: LineChartDatetimeProps): React.JSX.Element;
export declare namespace LineChartDatetimeText {
    var displayName: string;
}
export {};
//# sourceMappingURL=DatetimeText.d.ts.map