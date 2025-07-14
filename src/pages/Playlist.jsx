import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlayFill, BsThreeDots, BsPlus } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';
import { removeSongFromPlaylist } from '../redux/features/playlistSlice';
import { playlists } from '../data/mockData';
import { handleImageError } from '../utils/imageUtils';

const Playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userPlaylists } = useSelector((state) => state.playlist);
  const { likedSongsPlaylist } = useSelector((state) => state.likedSongs);
  
  // Try to find the playlist in user playlists, mock playlists, or liked songs playlist
  const playlist = id === 'liked-songs' 
    ? likedSongsPlaylist
    : userPlaylists.find((p) => p.id === Number(id)) || 
      playlists.find((p) => p.id === Number(id));

  const playPlaylist = () => {
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  const playSong = (song, index) => {
    if (!playlist.songs) return;
    const remainingSongs = [
      ...playlist.songs.slice(index + 1),
      ...playlist.songs.slice(0, index),
    ];
    dispatch(setQueue(remainingSongs));
    dispatch(setCurrentSong(song));
  };

  const handleRemoveSong = (e, songId) => {
    e.stopPropagation();
    if (playlist.id) {
      dispatch(removeSongFromPlaylist({ playlistId: playlist.id, songId }));
    }
  };

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div>Playlist not found</div>
      </div>
    );
  }

  const isUserPlaylist = userPlaylists.some(p => p.id === playlist.id);

  return (
    <div className="text-white h-full overflow-y-auto pb-36">
      <div className="flex flex-col min-h-full">
        {/* Playlist Header */}
        <div className="flex items-end space-x-6 bg-gradient-to-b from-[#454545] to-[#121212] p-8">
          <img
            src={playlist.coverArt}
            alt={playlist.name}
            className="w-60 h-60 rounded-xl shadow-2xl flex-shrink-0"
            onError={handleImageError}
          />
          <div>
            <p className="text-sm uppercase">Playlist</p>
            <h1 className="text-8xl font-bold mt-2 mb-6">{playlist.name}</h1>
            <p className="text-sm text-gray-300">{playlist.description}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm font-semibold">{playlist.owner}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-gray-300">
                {playlist.songs?.length || 0} songs
              </span>
              {playlist.followers && (
                <>
                  <span className="mx-1">•</span>
                  <span className="text-sm text-gray-300">
                    {playlist.followers} likes
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Playlist Controls */}
          <div className="px-8 py-4 flex items-center space-x-4">
            <button
              className={`w-14 h-14 flex items-center justify-center rounded-full ${
                playlist.songs?.length > 0
                  ? 'bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105'
                  : 'bg-[#1ed76060] cursor-not-allowed'
              } transition-all`}
              onClick={playPlaylist}
              disabled={!playlist.songs?.length}
            >
              <BsPlayFill size={28} />
            </button>
            {isUserPlaylist && (
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                <BsThreeDots size={24} />
              </button>
            )}
          </div>

          {/* Songs List */}
          <div className="px-8">
            {/* Table Header */}
            <div className="sticky top-0 bg-[#121212] z-[1] grid grid-cols-[16px,4fr,3fr,2fr,16px] gap-4 px-4 py-2 text-gray-400 border-b border-gray-800 text-sm">
              <div>#</div>
              <div>Title</div>
              <div>Album</div>
              <div className="flex items-center">
                <BiTime size={20} />
              </div>
              <div></div>
            </div>

            {/* Songs */}
            <div className="mt-4">
              {playlist.songs?.length > 0 ? (
                playlist.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="grid grid-cols-[16px,4fr,3fr,2fr,16px] gap-4 px-4 py-2 hover:bg-[#282828] rounded-lg cursor-pointer group"
                    onClick={() => playSong(song, index)}
                  >
                    <div className="flex items-center text-gray-400 group-hover:text-white">
                      {index + 1}
                    </div>
                    <div className="flex items-center">
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-10 h-10 rounded-md mr-4"
                        onError={handleImageError}
                      />
                      <div>
                        <div className="text-white">{song.title}</div>
                        <div className="text-sm text-gray-400">{song.artist.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      {song.album}
                    </div>
                    <div className="flex items-center text-gray-400">
                      {song.duration}
                    </div>
                    {isUserPlaylist && (
                      <button
                        onClick={(e) => handleRemoveSong(e, song.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all"
                      >
                        <BsThreeDots size={20} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>This playlist is empty</p>
                  <p className="text-sm mt-2">Let's add some songs!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist; 