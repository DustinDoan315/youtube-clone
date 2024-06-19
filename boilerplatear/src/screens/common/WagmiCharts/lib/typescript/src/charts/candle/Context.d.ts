import * as React from 'react';
import type { TContext, TData } from './types';
export declare const CandlestickChartContext: React.Context<TContext>;
type CandlestickChartProviderProps = {
    children: React.ReactNode;
    data: TData;
    width?: number;
    height?: number;
};
export declare function CandlestickChartProvider({ children, data, }: CandlestickChartProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=Context.d.ts.map