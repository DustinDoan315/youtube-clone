export declare function useLineChart(): {
    currentY: Readonly<{
        value: number;
    }>;
    data: import("./types").TLineChartData;
    currentX: {
        value: number;
    };
    currentIndex: {
        value: number;
    };
    isActive: {
        value: boolean;
    };
    domain: import("./types").TLineChartDomain;
    yDomain: import("./types").YDomain;
    xLength: number;
    xDomain?: [number, number] | undefined;
};
//# sourceMappingURL=useLineChart.d.ts.map