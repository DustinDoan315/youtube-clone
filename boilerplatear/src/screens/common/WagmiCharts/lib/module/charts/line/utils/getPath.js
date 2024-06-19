// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';
export function getPath({
  data,
  from,
  to,
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
  const path = shape.line().defined(d => from || to ? data.slice(from, to ? to + 1 : undefined).find(item => item.timestamp === d.timestamp) : true).x((_, i) => scaleX(xDomain ? timestamps[i] : i)).y(d => scaleY(d.value)).curve(_shape)(data);
  return path;
}
//# sourceMappingURL=getPath.js.map