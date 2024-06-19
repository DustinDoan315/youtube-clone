// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';
export function getArea({
  data,
  width,
  height,
  gutter,
  shape: _shape,
  yDomain,
  xDomain
}) {
  const timestamps = data.map(({
    timestamp
  }, i) => xDomain ? timestamp : i);
  const scaleX = scaleLinear().domain(xDomain ?? [Math.min(...timestamps), Math.max(...timestamps)]).range([0, width]);
  const scaleY = scaleLinear().domain([yDomain.min, yDomain.max]).range([height - gutter, gutter]);
  const area = shape.area().x((_, i) => scaleX(xDomain ? timestamps[i] : i)).y0(d => scaleY(d.value)).y1(() => height).curve(_shape)(data);
  return area;
}
//# sourceMappingURL=getArea.js.map