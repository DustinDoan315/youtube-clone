import router from '@navigation/router';
import ChartScreen from './ChartScreen';
import VideoDetailScreen from './VideoDetailScreen';

export const common = {
  [router.CHART_SCREEN]: ChartScreen,
  [router.VIDEO_DETAIL_SCREEN]: VideoDetailScreen,
};
