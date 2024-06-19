import * as React from 'react';
import Animated from 'react-native-reanimated';
import { PathProps } from 'react-native-svg';
export type LineChartColorProps = Animated.AnimateProps<PathProps> & {
    color?: string;
    from: number;
    to: number;
    showInactiveColor?: boolean;
    inactiveColor?: string;
    width?: number;
};
export declare function LineChartHighlight({ color, inactiveColor, showInactiveColor, from, to, width: strokeWidth, ...props }: LineChartColorProps): React.JSX.Element;
export declare namespace LineChartHighlight {
    var displayName: string;
}
//# sourceMappingURL=Highlight.d.ts.map