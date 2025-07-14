import { createSlice } from '@reduxjs/toolkit';
import { FALLBACK_IMAGE } from '../../utils/imageUtils';

// Load initial state from localStorage
const loadLikedSongs = () => {
  try {
    const savedLikedSongs = localStorage.getItem('likedSongs');
    if (savedLikedSongs) {
      const { likedSongs, likedSongsPlaylist } = JSON.parse(savedLikedSongs);
      return {
        likedSongs,
        likedSongsPlaylist: {
          ...likedSongsPlaylist,
          coverArt: likedSongsPlaylist.coverArt || FALLBACK_IMAGE
        }
      };
    }
  } catch (error) {
    console.error('Error loading liked songs:', error);
  }
  return {
    likedSongs: [],
    likedSongsPlaylist: {
      id: 'liked-songs',
      name: 'Liked Songs',
      description: 'Songs you\'ve liked',
      coverArt: FALLBACK_IMAGE,
      owner: 'You',
      songs: []
    }
  };
};

const initialState = loadLikedSongs();

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    toggleLikeSong: (state, action) => {
      const song = action.payload;
      const songIndex = state.likedSongs.findIndex(s => s.id === song.id);
      
      if (songIndex === -1) {
        // Add song to liked songs
        state.likedSongs.push(song);
        state.likedSongsPlaylist.songs.push(song);
      } else {
        // Remove song from liked songs
        state.likedSongs.splice(songIndex, 1);
        state.likedSongsPlaylist.songs = state.likedSongsPlaylist.songs.filter(s => s.id !== song.id);
      }

      // Save to localStorage
      localStorage.setItem('likedSongs', JSON.stringify({
        likedSongs: state.likedSongs,
        likedSongsPlaylist: state.likedSongsPlaylist
      }));
    },
    clearLikedSongs: (state) => {
      state.likedSongs = [];
      state.likedSongsPlaylist.songs = [];
      // Clear from localStorage
      localStorage.removeItem('likedSongs');
    }
  }
});

export const { toggleLikeSong, clearLikedSongs } = likedSongsSlice.actions;
export default likedSongsSlice.reducer; 