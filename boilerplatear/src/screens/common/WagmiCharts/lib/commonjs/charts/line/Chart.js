"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = LineChart;
exports.LineChartDimensionsContext = void 0;
var React = _interopRequireWildcard(require("react"));
var d3Shape = _interopRequireWildcard(require("d3-shape"));
var _reactNative = require("react-native");
var _Data = require("./Data");
var _reactNativeRedash = require("react-native-redash");
var _utils = require("./utils");
var _Context = require("./Context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // @ts-ignore
const LineChartDimensionsContext = exports.LineChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0,
  pointWidth: 0,
  parsedPath: {},
  path: '',
  area: '',
  shape: d3Shape.curveBumpX,
  gutter: 0,
  pathWidth: 0
});
const {
  width: screenWidth
} = _reactNative.Dimensions.get('window');
LineChart.displayName = 'LineChart';
function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape = d3Shape.curveBumpX,
  id,
  absolute,
  ...props
}) {
  const {
    yDomain,
    xLength,
    xDomain
  } = React.useContext(_Context.LineChartContext);
  const {
    data
  } = (0, _Data.useLineChartData)({
    id
  });
  const pathWidth = React.useMemo(() => {
    let allowedWidth = width;
    if (xLength > data.length) {
      allowedWidth = width * data.length / xLength;
    }
    return allowedWidth;
  }, [data.length, width, xLength]);
  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return (0, _utils.getPath)({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, xDomain]);
  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return (0, _utils.getArea)({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, xDomain]);
  const dataLength = data.length;
  const parsedPath = React.useMemo(() => (0, _reactNativeRedash.parse)(path), [path]);
  const pointWidth = React.useMemo(() => width / (dataLength - 1), [dataLength, width]);
  const contextValue = React.useMemo(() => ({
    gutter: yGutter,
    parsedPath,
    pointWidth,
    area,
    path,
    width,
    height,
    pathWidth,
    shape
  }), [yGutter, parsedPath, pointWidth, area, path, width, height, pathWidth, shape]);
  return /*#__PURE__*/React.createElement(_Data.LineChartIdProvider, {
    id: id
  }, /*#__PURE__*/React.createElement(LineChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, props, {
    style: [absolute && styles.absolute, props.style]
  }), children)));
}
const styles = _reactNative.StyleSheet.create({
  absolute: {
    position: 'absolute'
  }
});
//# sourceMappingURL=Chart.js.map