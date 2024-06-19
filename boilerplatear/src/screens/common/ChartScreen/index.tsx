/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {root} from '@navigation/NavigationRef';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '@utils/response';
import {CandlestickChart, LineChart} from '../WagmiCharts/src';

const ITEM_WIDTH = 20;

const ChartScreen = ({route}: any) => {
  const {data} = route?.params;
  const [switchChartMode, setSwitchChartMode] = useState<string>('candle');

  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 20]);
  const [visibleData, setVisibleData] = useState<any[]>([]);

  useEffect(() => {
    updateVisibleData();
  }, [data, visibleRange]);

  const updateVisibleData = useCallback(() => {
    const [startIndex, endIndex] = visibleRange;
    const newData = data?.slice(startIndex, endIndex);
    setVisibleData(newData);
  }, [data, visibleRange]);

  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const startIndex =
      contentOffset.x > 0 ? Math.floor(contentOffset.x / ITEM_WIDTH) : 0;
    const endIndex = Math.ceil(
      (contentOffset.x + layoutMeasurement.width) / ITEM_WIDTH,
    );

    if (startIndex !== visibleRange[0] || endIndex !== visibleRange[1]) {
      setVisibleRange([startIndex, endIndex]);
    }
  };

  const goBack = () => {
    root.goBack();
  };

  const switchChart = () => {
    setSwitchChartMode(switchChartMode === 'line' ? 'candle' : 'line');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable onPress={goBack}>
          <Text>Go back</Text>
        </Pressable>

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}
          onPress={switchChart}>
          <Text style={{color: 'white'}}>
            Switch to {switchChartMode === 'line' ? 'Candle' : 'Line'} Chart
          </Text>
        </Pressable>

        <ScrollView
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row'}}>
          {switchChartMode === 'line' ? (
            <LineChart.Provider data={data}>
              <LineChart width={data.length * 20}>
                <LineChart.Path color="red">
                  <LineChart.Gradient color={'red'} />
                </LineChart.Path>
                <LineChart.CursorCrosshair>
                  <LineChart.Tooltip
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>
          ) : (
            <CandlestickChart.Provider
              data={data}
              dataDomain={visibleData || [0, 0]}>
              <CandlestickChart
                style={{
                  backgroundColor: 'white',
                  height: '75%',
                }}
                width={data.length * 20}>
                <CandlestickChart.Candles />
                <CandlestickChart.Crosshair
                  currentScreenWidth={
                    visibleRange?.[visibleRange.length - 1] * ITEM_WIDTH
                  }
                  color={'black'}>
                  <CandlestickChart.Tooltip />
                </CandlestickChart.Crosshair>
              </CandlestickChart>

              <View
                style={{
                  width: visibleRange?.[visibleRange.length - 1] * ITEM_WIDTH,
                  position: 'absolute',
                  bottom: 20,
                  left:
                    visibleRange?.[visibleRange.length - 1] * ITEM_WIDTH -
                    width / 1.425,
                  height: 100,
                }}>
                <CandlestickChart.PriceText type="open" />
                <CandlestickChart.PriceText type="high" />
                <CandlestickChart.PriceText type="low" />
                <CandlestickChart.PriceText type="close" />
                <CandlestickChart.DatetimeText />
              </View>
            </CandlestickChart.Provider>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
