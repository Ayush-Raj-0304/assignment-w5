import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { setSearchTerm, setShowCategories, setSelectedCategory } from '../redux/features/searchSlice';
import { setShowAddToPlaylistModal, setSelectedSong } from '../redux/features/playlistSlice';
import { categories } from '../data/mockData';
import { BsFillPlayCircleFill, BsThreeDots } from 'react-icons/bs';

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm, searchResults, showCategories } = useSelector((state) => state.search);
  const { songs: filteredSongs, artists: filteredArtists, albums: filteredAlbums, playlists: filteredPlaylists } = searchResults;

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
  };

  const playSong = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(setQueue([]));
  };

  const playAlbum = (album) => {
    if (album?.songs?.length > 0) {
      dispatch(setQueue(album.songs.slice(1)));
      dispatch(setCurrentSong(album.songs[0]));
    }
  };

  const playPlaylist = (playlist) => {
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(setShowCategories(false));
  };

  const handleAddToPlaylist = (e, song) => {
    e.stopPropagation();
    dispatch(setSelectedSong(song));
    dispatch(setShowAddToPlaylistModal(true));
  };

  return (
    <div className="text-white pb-20">
      <div className="sticky top-0 z-10 bg-[#121212] pt-4 pb-6">
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-[400px] p-3 rounded-full bg-[#242424] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {showCategories ? (
        <section>
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:brightness-110 transition-all"
                style={{ backgroundColor: category.color }}
              >
                <h3 className="text-2xl font-bold p-4">{category.name}</h3>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute bottom-0 right-0 w-[100px] h-[100px] rotate-25 translate-x-[18%] translate-y-[5%]"
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Songs Results */}
          {filteredSongs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="grid gap-4">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center p-2 rounded-lg hover:bg-[#ffffff1a] group cursor-pointer"
                    onClick={() => playSong(song)}
                  >
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleAddToPlaylist(e, song)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <BsThreeDots size={20} />
                      </button>
                      <button className="w-10 h-10 bg-[#1ed760] rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex">
                        <BsFillPlayCircleFill className="w-6 h-6 text-black" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Artists Results */}
          {filteredArtists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredArtists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-colors group"
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full mb-4"
                    />
                    <h3 className="font-semibold truncate">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Albums Results */}
          {filteredAlbums.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-colors group relative"
                  >
                    <Link to={`/album/${album.id}`}>
                      <img
                        src={album.coverArt}
                        alt={album.title}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg mb-4"
                      />
                      <h3 className="font-semibold truncate">{album.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {album.artist.name}
                      </p>
                    </Link>
                    <button
                      className="absolute bottom-[85px] right-6 w-12 h-12 bg-[#1ed760] rounded-full items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex hover:scale-105"
                      onClick={() => playAlbum(album)}
                    >
                      <BsFillPlayCircleFill className="w-8 h-8 text-black" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Playlists Results */}
          {filteredPlaylists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-colors group relative"
                  >
                    <Link to={`/playlist/${playlist.id}`}>
                      <img
                        src={playlist.coverArt}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg mb-4"
                      />
                      <h3 className="font-semibold truncate">{playlist.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {playlist.description}
                      </p>
                    </Link>
                    <button
                      className="absolute bottom-[85px] right-6 w-12 h-12 bg-[#1ed760] rounded-full items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex hover:scale-105"
                      onClick={() => playPlaylist(playlist)}
                    >
                      <BsFillPlayCircleFill className="w-8 h-8 text-black" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {searchTerm && !filteredSongs.length && !filteredArtists.length && !filteredAlbums.length && !filteredPlaylists.length && (
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold mb-2">No results found for "{searchTerm}"</h2>
              <p className="text-gray-400">
                Please make sure your words are spelled correctly or try different keywords.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search; 