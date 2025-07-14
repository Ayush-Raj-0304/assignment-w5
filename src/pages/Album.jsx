import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { setShowAddToPlaylistModal, setSelectedSong } from '../redux/features/playlistSlice';
import { albums } from '../data/mockData';
import { BsPlayFill, BsThreeDots } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { handleImageError } from '../utils/imageUtils';

const Album = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const album = albums.find((a) => a.id === parseInt(id));

  if (!album) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div>Album not found</div>
      </div>
    );
  }

  const playAlbum = () => {
    if (album.songs?.length > 0) {
      dispatch(setQueue(album.songs.slice(1)));
      dispatch(setCurrentSong(album.songs[0]));
    }
  };

  const playSong = (song, index) => {
    const remainingSongs = [
      ...album.songs.slice(index + 1),
      ...album.songs.slice(0, index),
    ];
    dispatch(setQueue(remainingSongs));
    dispatch(setCurrentSong(song));
  };

  const handleAddToPlaylist = (e, song) => {
    e.stopPropagation();
    dispatch(setSelectedSong(song));
    dispatch(setShowAddToPlaylistModal(true));
  };

  return (
    <div className="text-white h-full overflow-y-auto pb-36">
      <div className="flex flex-col min-h-full">
        {/* Album Header */}
        <div className="flex items-end space-x-6 bg-gradient-to-b from-[#454545] to-[#121212] p-8">
          <img
            src={album.coverArt}
            alt={album.title}
            className="w-60 h-60 rounded-xl shadow-2xl flex-shrink-0"
            onError={handleImageError}
          />
          <div>
            <p className="text-sm uppercase">Album</p>
            <h1 className="text-8xl font-bold mt-2 mb-6">{album.title}</h1>
            <div className="flex items-center">
              <img
                src={album.artist.image}
                alt={album.artist.name}
                className="w-6 h-6 rounded-full mr-2 flex-shrink-0"
                onError={handleImageError}
              />
              <span className="text-sm font-semibold">{album.artist.name}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-gray-300">{album.releaseYear}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-gray-300">
                {album.songs?.length || 0} songs
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Album Controls */}
          <div className="px-8 py-4 flex items-center space-x-4">
            <button
              className={`w-14 h-14 flex items-center justify-center rounded-full ${
                album.songs?.length > 0
                  ? 'bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105'
                  : 'bg-[#1ed76060] cursor-not-allowed'
              } transition-all`}
              onClick={playAlbum}
              disabled={!album.songs?.length}
            >
              <BsPlayFill size={28} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
              <BsThreeDots size={24} />
            </button>
          </div>

          {/* Songs List */}
          <div className="px-8">
            {/* Table Header */}
            <div className="sticky top-0 bg-[#121212] z-[1] grid grid-cols-[16px,4fr,2fr,16px] gap-4 px-4 py-2 text-gray-400 border-b border-gray-800 text-sm">
              <div>#</div>
              <div>Title</div>
              <div className="flex items-center">
                <BiTime size={20} />
              </div>
              <div></div>
            </div>

            {/* Songs */}
            <div className="mt-4">
              {album.songs?.length > 0 ? (
                album.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="grid grid-cols-[16px,4fr,2fr,16px] gap-4 px-4 py-2 hover:bg-[#282828] rounded-lg cursor-pointer group"
                    onClick={() => playSong(song, index)}
                  >
                    <div className="flex items-center text-gray-400 group-hover:text-white">
                      {index + 1}
                    </div>
                    <div className="flex items-center">
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-10 h-10 rounded-md mr-4 flex-shrink-0"
                        onError={handleImageError}
                      />
                      <div>
                        <div className="text-white">{song.title}</div>
                        <div className="text-sm text-gray-400">{song.artist.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      {song.duration}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => handleAddToPlaylist(e, song)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all"
                      >
                        <BsThreeDots size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>This album is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album; 