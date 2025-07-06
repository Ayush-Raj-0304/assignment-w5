import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { categories, playlists, songs } from '../data/mockData';
import { BsFillPlayCircleFill } from 'react-icons/bs';

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = categories.find(c => c.id === parseInt(id));

  if (!category) {
    return <div className="text-white p-8">Category not found</div>;
  }

  // Get playlists for this category
  const categoryPlaylists = playlists.filter(playlist => category.playlists.includes(playlist.id));

  // Get songs for this category
  const categorySongs = songs.filter(song => category.songs.includes(song.id));

  const playPlaylist = (playlist) => {
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  const playSong = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(setQueue([]));
  };

  return (
    <div className="text-white pb-20">
      {/* Category Header */}
      <div 
        className="flex items-end gap-6 p-8"
        style={{ 
          backgroundColor: category.color,
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      >
        <div>
          <p className="text-sm uppercase mb-2">Category</p>
          <h1 className="text-7xl font-bold mb-6">{category.name}</h1>
          <p className="text-xl">Popular music in {category.name.toLowerCase()}</p>
        </div>
      </div>

      {/* Popular Playlists */}
      <section className="px-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors group relative"
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

      {/* Popular Songs */}
      <section className="px-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
        <div className="grid gap-4">
          {categorySongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center p-2 rounded-md hover:bg-[#ffffff1a] group cursor-pointer"
              onClick={() => playSong(song)}
            >
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist.name}</p>
              </div>
              <button className="w-10 h-10 bg-[#1ed760] rounded-full items-center justify-center mr-4 opacity-0 group-hover:opacity-100 transition-opacity flex">
                <BsFillPlayCircleFill className="w-6 h-6 text-black" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category; 