"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartGroup = LineChartGroup;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactKeyedFlattenChildren = _interopRequireDefault(require("react-keyed-flatten-children"));
var _Chart = require("./Chart");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function LineChartGroup({
  children,
  ...props
}) {
  const flatChildren = (0, _reactKeyedFlattenChildren.default)(children);
  const flatChildrenCount = _react.Children.count(flatChildren);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, props, _react.Children.map(flatChildren, (child, index) => {
    const isLast = index === flatChildrenCount - 1;
    if (!isLast && child.type === _Chart.LineChart) {
      return /*#__PURE__*/(0, _react.cloneElement)(child, {
        absolute: true
      });
    }
    return child;
  }));
}
//# sourceMappingURL=Group.js.map