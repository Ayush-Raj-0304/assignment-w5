import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  volume: 1,
  repeat: false,
  shuffle: false,
  currentTime: 0,
  duration: 0,
  currentTrackIndex: 0,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleRepeat: (state) => {
      state.repeat = !state.repeat;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    playNext: (state) => {
      if (state.currentTrackIndex < state.queue.length - 1) {
        state.currentTrackIndex += 1;
        state.currentSong = state.queue[state.currentTrackIndex];
        state.isPlaying = true;
      } else if (state.repeat) {
        state.currentTrackIndex = 0;
        state.currentSong = state.queue[0];
        state.isPlaying = true;
      }
    },
    playPrevious: (state) => {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex -= 1;
        state.currentSong = state.queue[state.currentTrackIndex];
        state.isPlaying = true;
      } else if (state.repeat) {
        state.currentTrackIndex = state.queue.length - 1;
        state.currentSong = state.queue[state.currentTrackIndex];
        state.isPlaying = true;
      }
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
      state.currentTrackIndex = 0;
      if (state.queue.length > 0) {
        state.currentSong = state.queue[0];
      }
    },
  },
});

export const {
  setCurrentSong,
  togglePlay,
  setVolume,
  toggleRepeat,
  toggleShuffle,
  setCurrentTime,
  setDuration,
  playNext,
  playPrevious,
  setQueue,
} = playerSlice.actions;

export default playerSlice.reducer; 