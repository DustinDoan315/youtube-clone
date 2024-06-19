/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';
import {width} from '@utils/response';
import {formatPrice} from '@utils/helper';
import {Image} from 'react-native';
import {LineChart} from '@screens/common/WagmiCharts/src';

const AccessItem = ({item}: any) => {
  const [coinPrice, setCoinPrice] = useState<any[]>([]);

  useEffect(() => {
    fetchBTCPrice(item?.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const fetchBTCPrice = async (tokenName?: string) => {
    try {
      const response = await axios.get(
        'https://testnet.binance.vision/api/v3/klines',
        {
          params: {
            symbol: `${tokenName}USDT`,
            interval: '1h',
            limit: 24,
          },
        },
      );
      const btcPrice = response.data;
      const formattedData = btcPrice.map((entry: any) => ({
        timestamp: Number(entry[0]),
        open: +entry[1],
        high: +entry[2],
        low: +entry[4],
        close: +entry[4],
        value: (+entry[1] + +entry[4]) / 2,
      }));

      setCoinPrice(formattedData);

      return formattedData;
    } catch (error: any) {
      console.error(`Error fetching ${item?.token} price:`, error.message);
      throw error;
    }
  };

  const navigateChart = (token: any) => {
    commonRoot.navigate(router.CHART_SCREEN, {token: token, data: coinPrice});
  };

  return (
    <Pressable
      onPress={() => navigateChart(item)}
      style={styles.assetItem}
      key={item?.id.toString()}>
      <Image
        style={styles.assetItemImage}
        source={item?.img}
        resizeMode="stretch"
      />
      <View style={styles.tokenName}>
        <Text style={{marginBottom: 3, color: 'black'}}>{item?.name}</Text>
        <Text>{item?.token}</Text>
      </View>

      <View style={{}}>
        {coinPrice?.length > 0 && (
          <LineChart.Provider data={coinPrice}>
            <LineChart width={width * 0.41} height={50}>
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
        )}
      </View>

      <View style={styles.tokenPrice}>
        <Text style={{marginBottom: 3, color: 'black'}}>
          {formatPrice(item?.price)}
        </Text>
        <Text
          style={[
            {
              color: item?.profit > 0 ? 'green' : 'red',
            },
          ]}>
          {`${item?.profit > 0 ? '+' + item?.profit : item?.profit}`}%
        </Text>
      </View>
    </Pressable>
  );
};

export default AccessItem;

export const styles = StyleSheet.create({
  listAssetContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  assetItem: {
    width: width,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginVertical: 5,
  },
  assetItemImage: {
    width: 48,
    height: '100%',
    marginTop: 7,
  },
  tokenName: {
    marginHorizontal: 5,
    height: '100%',
    justifyContent: 'center',
    width: '17.5%',
    // backgroundColor: 'red',
  },
  tokenPrice: {
    position: 'absolute',
    right: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '17.5%',
  },
});
