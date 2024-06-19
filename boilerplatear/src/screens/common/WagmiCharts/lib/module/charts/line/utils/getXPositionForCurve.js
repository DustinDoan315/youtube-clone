export function getXPositionForCurve(path, index) {
  'worklet';

  if (index === 0) {
    return path.move.x;
  }
  return path.curves[index - 1].to.x;
}
//# sourceMappingURL=getXPositionForCurve.js.map