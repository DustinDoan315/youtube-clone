import * as React from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { LineChartDataProvider } from './Data';
import { getDomain, lineChartDataPropToArray } from './utils';
export const LineChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentIndex: {
    value: -1
  },
  domain: [0, 0],
  isActive: {
    value: false
  },
  yDomain: {
    min: 0,
    max: 0
  },
  xDomain: undefined,
  xLength: 0
});
LineChartProvider.displayName = 'LineChartProvider';
export function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength,
  xDomain
}) {
  const currentX = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);
  const domain = React.useMemo(() => getDomain(Array.isArray(data) ? data : Object.values(data)[0]), [data]);
  const contextValue = React.useMemo(() => {
    const values = lineChartDataPropToArray(data).map(({
      value
    }) => value);
    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: {
        min: yRange?.min ?? Math.min(...values),
        max: yRange?.max ?? Math.max(...values)
      },
      xDomain,
      xLength: xLength ?? (Array.isArray(data) ? data : Object.values(data)[0]).length
    };
  }, [currentIndex, currentX, data, domain, isActive, yRange?.max, yRange?.min, xLength, xDomain]);
  useAnimatedReaction(() => currentIndex.value, (x, prevX) => {
    if (x !== -1 && x !== prevX && onCurrentIndexChange) {
      runOnJS(onCurrentIndexChange)(x);
    }
  }, [currentIndex]);
  return /*#__PURE__*/React.createElement(LineChartDataProvider, {
    data: data
  }, /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: contextValue
  }, children));
}
//# sourceMappingURL=Context.js.map