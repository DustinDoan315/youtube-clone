import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VideoState} from '@utils/interfaces';

const initialState: VideoState = {
  videoIndex: 0,
  shortIndex: 0,
} satisfies VideoState as VideoState;

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoIndex(
      state,
      action: PayloadAction<{video: number | null; short: number | null}>,
    ) {
      state.videoIndex = action.payload.video;
      state.shortIndex = action.payload.short;
    },

    clearUser(state) {
      state.videoIndex = null;
      state.shortIndex = null;
    },
  },
});

export const {setVideoIndex, clearUser} = videoSlice.actions;

export default videoSlice.reducer;
