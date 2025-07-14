import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import playlistReducer from './features/playlistSlice';
import likedSongsReducer from './features/likedSongsSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    likedSongs: likedSongsReducer,
    search: searchReducer,
  },
}); 