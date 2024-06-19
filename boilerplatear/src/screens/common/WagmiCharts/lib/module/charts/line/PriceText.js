import * as React from 'react';
import { useLineChartPrice } from './usePrice';
import { AnimatedText } from '../../components/AnimatedText';
LineChartPriceText.displayName = 'LineChartPriceText';
export function LineChartPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
  index
}) {
  const price = useLineChartPrice({
    format,
    precision,
    index
  });
  return /*#__PURE__*/React.createElement(AnimatedText, {
    text: price[variant],
    style: style
  });
}
//# sourceMappingURL=PriceText.js.map