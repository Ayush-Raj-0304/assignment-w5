import { createSlice } from '@reduxjs/toolkit';

// Load initial playlists from localStorage
const loadUserPlaylists = () => {
  try {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  } catch (error) {
    console.error('Error loading playlists from localStorage:', error);
    return [];
  }
};

const initialState = {
  userPlaylists: loadUserPlaylists(),
  currentPlaylist: null,
  isLoading: false,
  error: null,
  showAddToPlaylistModal: false,
  selectedSong: null,
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setUserPlaylists: (state, action) => {
      state.userPlaylists = action.payload;
      state.isLoading = false;
      state.error = null;
      // Save to localStorage
      localStorage.setItem('userPlaylists', JSON.stringify(action.payload));
    },
    addUserPlaylist: (state, action) => {
      state.userPlaylists.push(action.payload);
      // Save to localStorage
      localStorage.setItem('userPlaylists', JSON.stringify(state.userPlaylists));
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteUserPlaylist: (state, action) => {
      state.userPlaylists = state.userPlaylists.filter(
        playlist => playlist.id !== action.payload
      );
      // Save to localStorage
      localStorage.setItem('userPlaylists', JSON.stringify(state.userPlaylists));
    },
    updateUserPlaylist: (state, action) => {
      const index = state.userPlaylists.findIndex(
        playlist => playlist.id === action.payload.id
      );
      if (index !== -1) {
        state.userPlaylists[index] = action.payload;
        // Save to localStorage
        localStorage.setItem('userPlaylists', JSON.stringify(state.userPlaylists));
      }
    },
    addSongToPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.userPlaylists.find(p => p.id === playlistId);
      if (playlist) {
        if (!playlist.songs) {
          playlist.songs = [];
        }
        // Check if song already exists in playlist
        if (!playlist.songs.some(s => s.id === song.id)) {
          playlist.songs.push(song);
          localStorage.setItem('userPlaylists', JSON.stringify(state.userPlaylists));
        }
      }
    },
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.userPlaylists.find(p => p.id === playlistId);
      if (playlist && playlist.songs) {
        playlist.songs = playlist.songs.filter(song => song.id !== songId);
        localStorage.setItem('userPlaylists', JSON.stringify(state.userPlaylists));
      }
    },
    setShowAddToPlaylistModal: (state, action) => {
      state.showAddToPlaylistModal = action.payload;
    },
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload;
    },
  },
});

export const {
  setUserPlaylists,
  addUserPlaylist,
  setCurrentPlaylist,
  setLoading,
  setError,
  deleteUserPlaylist,
  updateUserPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  setShowAddToPlaylistModal,
  setSelectedSong,
} = playlistSlice.actions;

// Thunk action creator for fetching user playlists
export const fetchUserPlaylists = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Load from localStorage
    const savedPlaylists = loadUserPlaylists();
    dispatch(setUserPlaylists(savedPlaylists));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default playlistSlice.reducer;