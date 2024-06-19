function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
// @ts-ignore
import * as d3Shape from 'd3-shape';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChartIdProvider, useLineChartData } from './Data';
import { parse } from 'react-native-redash';
import { getArea, getPath } from './utils';
import { LineChartContext } from './Context';
export const LineChartDimensionsContext = /*#__PURE__*/React.createContext({
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
} = Dimensions.get('window');
LineChart.displayName = 'LineChart';
export function LineChart({
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
  } = React.useContext(LineChartContext);
  const {
    data
  } = useLineChartData({
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
      return getPath({
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
      return getArea({
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
  const parsedPath = React.useMemo(() => parse(path), [path]);
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
  return /*#__PURE__*/React.createElement(LineChartIdProvider, {
    id: id
  }, /*#__PURE__*/React.createElement(LineChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(View, _extends({}, props, {
    style: [absolute && styles.absolute, props.style]
  }), children)));
}
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute'
  }
});
//# sourceMappingURL=Chart.js.map