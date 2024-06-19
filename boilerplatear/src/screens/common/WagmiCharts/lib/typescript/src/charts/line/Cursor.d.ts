import * as React from 'react';
import { LongPressGestureHandlerProps } from 'react-native-gesture-handler';
export type LineChartCursorProps = LongPressGestureHandlerProps & {
    children: React.ReactNode;
    type: 'line' | 'crosshair';
    snapToPoint?: boolean;
};
export declare const CursorContext: React.Context<{
    type: string;
}>;
export declare function LineChartCursor({ children, snapToPoint, type, ...props }: LineChartCursorProps): React.JSX.Element;
export declare namespace LineChartCursor {
    var displayName: string;
}
//# sourceMappingURL=Cursor.d.ts.map