import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { playlists, albums, artists, categories } from '../data/mockData';
import { BsFillPlayCircleFill } from 'react-icons/bs';

const Home = () => {
  const dispatch = useDispatch();

  const playPlaylist = (playlist) => {
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  const playAlbum = (album) => {
    if (album?.songs?.length > 0) {
      dispatch(setQueue(album.songs.slice(1)));
      dispatch(setCurrentSong(album.songs[0]));
    }
  };

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="text-white pb-20">
      {/* Greeting */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {playlists.slice(0, 6).map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center bg-[#ffffff1a] rounded-lg overflow-hidden hover:bg-[#ffffff33] transition-colors group cursor-pointer"
              onClick={() => playPlaylist(playlist)}
            >
              <img
                src={playlist.coverArt}
                alt={playlist.name}
                className="h-20 w-20"
              />
              <span className="font-semibold px-4 flex-1">{playlist.name}</span>
              <button className="w-12 h-12 bg-[#1ed760] rounded-full items-center justify-center mr-4 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex hover:scale-105">
                <BsFillPlayCircleFill className="w-8 h-8 text-black" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <Link to="/categories" className="text-sm text-gray-400 font-bold hover:underline">
            Show all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              style={{ backgroundColor: category.color }}
            >
              <h3 className="text-2xl font-bold p-4">{category.name}</h3>
              <img
                src={category.image}
                alt={category.name}
                className="absolute bottom-0 right-0 w-[100px] h-[100px] rotate-25 translate-x-[18%] translate-y-[5%]"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Playlists</h2>
          <Link to="/featured" className="text-sm text-gray-400 font-bold hover:underline">
            Show all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300 group relative"
            >
              <Link to={`/playlist/${playlist.id}`}>
                <img
                  src={playlist.coverArt}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-md shadow-lg mb-4"
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

      {/* Popular Artists */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Popular Artists</h2>
          <Link to="/artists" className="text-sm text-gray-400 font-bold hover:underline">
            Show all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300 group"
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

      {/* New Releases */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">New Releases</h2>
          <Link to="/new-releases" className="text-sm text-gray-400 font-bold hover:underline">
            Show all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300 group relative"
            >
              <Link to={`/album/${album.id}`}>
                <img
                  src={album.coverArt}
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-md shadow-lg mb-4"
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
    </div>
  );
};

export default Home; 