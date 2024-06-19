import * as React from 'react';
import { ViewProps } from 'react-native';
export declare const CandlestickChartDimensionsContext: React.Context<{
    width: number;
    height: number;
}>;
type CandlestickChartProps = ViewProps & {
    children: React.ReactNode;
    width?: number;
    height?: number;
};
export declare function CandlestickChart({ children, width, height, ...props }: CandlestickChartProps): React.JSX.Element;
export {};
//# sourceMappingURL=Chart.d.ts.map