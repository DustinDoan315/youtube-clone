import type { TFormatterFn } from '../candle/types';
export declare function useLineChartPrice({ format, precision, index, }?: {
    format?: TFormatterFn<string>;
    precision?: number;
    index?: number;
}): {
    value: Readonly<{
        value: string;
    }>;
    formatted: Readonly<{
        value: string;
    }>;
};
//# sourceMappingURL=usePrice.d.ts.map