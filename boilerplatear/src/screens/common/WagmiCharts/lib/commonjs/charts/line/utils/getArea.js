"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArea = getArea;
var shape = _interopRequireWildcard(require("d3-shape"));
var _d3Scale = require("d3-scale");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

// @ts-ignore

function getArea({
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
  const scaleX = (0, _d3Scale.scaleLinear)().domain(xDomain ?? [Math.min(...timestamps), Math.max(...timestamps)]).range([0, width]);
  const scaleY = (0, _d3Scale.scaleLinear)().domain([yDomain.min, yDomain.max]).range([height - gutter, gutter]);
  const area = shape.area().x((_, i) => scaleX(xDomain ? timestamps[i] : i)).y0(d => scaleY(d.value)).y1(() => height).curve(_shape)(data);
  return area;
}
//# sourceMappingURL=getArea.js.map