import router from '@navigation/router';
import VideoDetailScreen from './VideoDetailScreen';
import SearchScreen from './SearchScreen';
import ListingVideoScreen from './ListingVideoScreen';
export const common = {
  [router.VIDEO_DETAIL_SCREEN]: VideoDetailScreen,
  [router.SEARCH_SCREEN]: SearchScreen,
  [router.LISTING_VIDEO_SCREEN]: ListingVideoScreen,
};
