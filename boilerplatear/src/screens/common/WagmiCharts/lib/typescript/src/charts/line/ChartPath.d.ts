import * as React from 'react';
import { WithTimingConfig } from 'react-native-reanimated';
import { LineChartPathProps } from './Path';
type LineChartPathWrapperProps = {
    animationDuration?: number;
    animationProps?: Omit<Partial<WithTimingConfig>, 'duration'>;
    children?: React.ReactNode;
    color?: string;
    inactiveColor?: string;
    width?: number;
    widthOffset?: number;
    pathProps?: Partial<LineChartPathProps>;
    showInactivePath?: boolean;
    animateOnMount?: 'foreground';
    mountAnimationDuration?: number;
    mountAnimationProps?: Partial<WithTimingConfig>;
};
export declare function LineChartPathWrapper({ animationDuration, animationProps, children, color, inactiveColor, width: strokeWidth, widthOffset, pathProps, showInactivePath, animateOnMount, mountAnimationDuration, mountAnimationProps, }: LineChartPathWrapperProps): React.JSX.Element;
export declare namespace LineChartPathWrapper {
    var displayName: string;
}
export {};
//# sourceMappingURL=ChartPath.d.ts.map