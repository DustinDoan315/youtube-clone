import type { TLineChartData } from './types';
import React from 'react';
import type { ReactNode } from 'react';
import type { TLineChartDataProp } from './types';
export declare const DefaultLineChartId = "__LineChartData";
export type LineChartDataContext = {
    [key: string]: TLineChartData;
};
export type LineChartDataProviderProps = {
    children: ReactNode;
    data: TLineChartDataProp;
};
export declare function LineChartDataProvider({ children, data, }: LineChartDataProviderProps): React.JSX.Element;
export declare function LineChartIdProvider({ id, children, }: {
    id?: string;
    children: ReactNode;
}): React.JSX.Element;
export declare const useLineChartId: () => string | undefined;
export declare function useLineChartData({ id }: {
    id?: string;
}): {
    data: TLineChartData;
};
//# sourceMappingURL=Data.d.ts.map