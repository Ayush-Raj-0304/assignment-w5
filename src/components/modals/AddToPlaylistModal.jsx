import { useDispatch, useSelector } from 'react-redux';
import { addSongToPlaylist, setShowAddToPlaylistModal } from '../../redux/features/playlistSlice';
import { BsX, BsPlus } from 'react-icons/bs';

const AddToPlaylistModal = () => {
  const dispatch = useDispatch();
  const { userPlaylists, selectedSong } = useSelector((state) => state.playlist);

  const handleAddToPlaylist = (playlistId) => {
    dispatch(addSongToPlaylist({ playlistId, song: selectedSong }));
    dispatch(setShowAddToPlaylistModal(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#282828] p-6 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
          <button
            onClick={() => dispatch(setShowAddToPlaylistModal(false))}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <BsX size={24} />
          </button>
        </div>

        {selectedSong && (
          <div className="flex items-center mb-6 bg-[#181818] p-4 rounded-lg">
            <img
              src={selectedSong.albumArt}
              alt={selectedSong.title}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div>
              <h3 className="text-white font-semibold">{selectedSong.title}</h3>
              <p className="text-gray-400 text-sm">{selectedSong.artist.name}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {userPlaylists.map((playlist) => {
            const isInPlaylist = playlist.songs?.some(
              (song) => song.id === selectedSong?.id
            );

            return (
              <button
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                disabled={isInPlaylist}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  isInPlaylist
                    ? 'bg-[#ffffff1a] cursor-not-allowed'
                    : 'hover:bg-[#ffffff1a]'
                }`}
              >
                <img
                  src={playlist.coverArt}
                  alt={playlist.name}
                  className="w-12 h-12 rounded-md mr-4"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold truncate">
                    {playlist.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {playlist.songs?.length || 0} songs
                  </p>
                </div>
                {!isInPlaylist && (
                  <BsPlus
                    size={24}
                    className="text-gray-400 group-hover:text-white"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal; 