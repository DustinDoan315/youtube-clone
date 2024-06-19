import * as React from 'react';
import { SvgProps } from 'react-native-svg';
import { CandlestickChartCandleProps } from './Candle';
type CandlestickChartCandlesProps = SvgProps & {
    width?: number;
    height?: number;
    margin?: CandlestickChartCandleProps['margin'];
    positiveColor?: CandlestickChartCandleProps['positiveColor'];
    negativeColor?: CandlestickChartCandleProps['negativeColor'];
    renderRect?: CandlestickChartCandleProps['renderRect'];
    renderLine?: CandlestickChartCandleProps['renderLine'];
    rectProps?: CandlestickChartCandleProps['rectProps'];
    lineProps?: CandlestickChartCandleProps['lineProps'];
    candleProps?: Partial<CandlestickChartCandleProps>;
    useAnimations?: boolean;
};
export declare function CandlestickChartCandles({ positiveColor, negativeColor, rectProps, lineProps, margin, useAnimations, renderRect, renderLine, candleProps, ...props }: CandlestickChartCandlesProps): React.JSX.Element;
export {};
//# sourceMappingURL=Candles.d.ts.map