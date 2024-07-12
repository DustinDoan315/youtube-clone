import router from '@navigation/router';
import ChartScreen from './ChartScreen';
import VideoDetailScreen from './VideoDetailScreen';

export const common = {
  [router.VIDEO_DETAIL_SCREEN]: VideoDetailScreen,
  [router.VIDEO_DETAIL_SCREEN_V2]: VideoDetailScreen,
};
