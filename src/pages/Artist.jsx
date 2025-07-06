import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { setShowAddToPlaylistModal, setSelectedSong } from '../redux/features/playlistSlice';
import { artists, albums, songs } from '../data/mockData';
import { BsFillPlayCircleFill, BsThreeDots } from 'react-icons/bs';

const Artist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artist = artists.find(a => a.id === parseInt(id));

  if (!artist) {
    return <div className="text-white p-8">Artist not found</div>;
  }

  // Get all songs by this artist
  const artistSongs = songs.filter(song => song.artist.id === artist.id);
  
  // Get all albums by this artist
  const artistAlbums = albums.filter(album => album.artist.id === artist.id);

  const playSong = (song) => {
    const otherSongs = artistSongs.filter(s => s.id !== song.id);
    dispatch(setQueue(otherSongs));
    dispatch(setCurrentSong(song));
  };

  const playAllSongs = () => {
    if (artistSongs.length > 0) {
      dispatch(setQueue(artistSongs.slice(1)));
      dispatch(setCurrentSong(artistSongs[0]));
    }
  };

  const handleAddToPlaylist = (e, song) => {
    e.stopPropagation();
    dispatch(setSelectedSong(song));
    dispatch(setShowAddToPlaylistModal(true));
  };

  return (
    <div className="text-white pb-20">
      {/* Artist Header */}
      <div className="flex flex-col items-center bg-gradient-to-b from-[#333333] to-[#121212] p-8">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-60 h-60 rounded-full shadow-2xl mb-6"
        />
        <h1 className="text-7xl font-bold mb-4">{artist.name}</h1>
        <p className="text-gray-400">{artist.monthlyListeners} monthly listeners</p>
      </div>

      {/* Actions */}
      <div className="px-8 py-4 flex items-center gap-8">
        <button
          onClick={playAllSongs}
          className="w-14 h-14 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
        >
          <BsFillPlayCircleFill className="w-10 h-10 text-black" />
        </button>
        <button className="text-3xl text-gray-400 hover:text-white transition-colors">
          <BsThreeDots />
        </button>
      </div>

      {/* Popular Songs */}
      <div className="px-8 mt-6">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="grid gap-4">
          {artistSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center p-2 rounded-lg hover:bg-[#ffffff1a] group cursor-pointer"
              onClick={() => playSong(song)}
            >
              <div className="w-6 text-center text-gray-400 mr-4">{index + 1}</div>
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-12 h-12 rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.duration}</p>
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
      </div>

      {/* Albums */}
      <div className="px-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {artistAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-colors group"
            >
              <img
                src={album.coverArt}
                alt={album.title}
                className="w-full aspect-square object-cover rounded-lg shadow-lg mb-4"
              />
              <h3 className="font-semibold truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {album.releaseYear} • Album
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist; 