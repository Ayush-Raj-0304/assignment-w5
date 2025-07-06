import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import playlistReducer from './features/playlistSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    search: searchReducer,
  },
}); 