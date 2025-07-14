// Default fallback images
export const FALLBACK_IMAGE = "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2";
export const ARTIST_FALLBACK = "https://i.scdn.co/image/ab6761610000e5eb5d8f3dc6f7161f5654a4c57c";
export const ALBUM_FALLBACK = "https://community.spotify.com/t5/image/serverpage/image-id/55829i42C0E7B6C81BFB51";
export const PLAYLIST_FALLBACK = "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2";

// Generic handler that uses the default fallback
export const handleImageError = (event) => {
  event.target.src = FALLBACK_IMAGE;
};

// Specific handlers for different types of images
export const handleArtistImageError = (event) => {
  event.target.src = ARTIST_FALLBACK;
};

export const handleAlbumImageError = (event) => {
  event.target.src = ALBUM_FALLBACK;
};

export const handlePlaylistImageError = (event) => {
  event.target.src = PLAYLIST_FALLBACK;
}; 