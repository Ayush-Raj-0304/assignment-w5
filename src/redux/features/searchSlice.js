import { createSlice } from '@reduxjs/toolkit';
import { songs, artists, albums, playlists, categories } from '../../data/mockData';

const initialState = {
  searchTerm: '',
  searchResults: {
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
  },
  showCategories: true,
  selectedCategory: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (action.payload.trim() === '') {
        state.showCategories = true;
        state.searchResults = {
          songs: [],
          artists: [],
          albums: [],
          playlists: [],
        };
      } else {
        state.showCategories = false;
        const term = action.payload.toLowerCase().trim();
        
        // Filter songs
        const matchingSongs = songs.filter(song =>
          song.title.toLowerCase().includes(term) ||
          song.artist.name.toLowerCase().includes(term) ||
          song.album.toLowerCase().includes(term)
        );

        // Filter artists
        const matchingArtists = artists.filter(artist =>
          artist.name.toLowerCase().includes(term)
        );

        // Filter albums
        const matchingAlbums = albums.filter(album =>
          album.title.toLowerCase().includes(term) ||
          album.artist.name.toLowerCase().includes(term)
        );

        // Filter playlists
        const matchingPlaylists = playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(term) ||
          playlist.description.toLowerCase().includes(term)
        );

        state.searchResults = {
          songs: matchingSongs,
          artists: matchingArtists,
          albums: matchingAlbums,
          playlists: matchingPlaylists,
        };
      }
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setShowCategories: (state, action) => {
      state.showCategories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        const category = categories.find(c => c.id === action.payload);
        if (category) {
          state.searchResults = {
            songs: songs.filter(song => category.songs.includes(song.id)),
            playlists: playlists.filter(playlist => category.playlists.includes(playlist.id)),
            artists: [],
            albums: [],
          };
        }
      }
    },
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  setShowCategories,
  setSelectedCategory,
} = searchSlice.actions;

export default searchSlice.reducer; 