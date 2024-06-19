import React from 'react';
import { TextProps as RNTextProps } from 'react-native';
import Animated from 'react-native-reanimated';
interface AnimatedTextProps {
    text: Animated.SharedValue<string>;
    style?: Animated.AnimateProps<RNTextProps>['style'];
}
export declare const AnimatedText: ({ text, style }: AnimatedTextProps) => React.JSX.Element;
export {};
//# sourceMappingURL=AnimatedText.d.ts.map