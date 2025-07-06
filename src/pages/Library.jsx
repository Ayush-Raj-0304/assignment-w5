import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserPlaylists, addUserPlaylist } from '../redux/features/playlistSlice';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { setCurrentSong, setQueue } from '../redux/features/playerSlice';

const Library = () => {
  const dispatch = useDispatch();
  const { userPlaylists, isLoading } = useSelector((state) => state.playlist);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName.trim(),
      description: newPlaylistDescription.trim() || 'No description',
      coverArt: "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2",
      songs: [],
      type: "Playlist",
      followers: "0",
      owner: "You"
    };

    dispatch(addUserPlaylist(newPlaylist));
    setShowCreateModal(false);
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  const playPlaylist = (e, playlist) => {
    e.preventDefault(); // Prevent navigation when clicking play button
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>

      {/* Playlists Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Create Playlist Card */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-br from-[#282828] to-[#181818] p-6 rounded-lg hover:bg-[#282828] transition-colors duration-300 cursor-pointer aspect-square flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-bold">Create Playlist</h3>
          <p className="text-sm text-gray-400 mt-2">Create your own playlist to share with friends</p>
        </div>

        {/* User Playlists */}
        {userPlaylists.map((playlist) => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300 group relative"
          >
            <img
              src={playlist.coverArt}
              alt={playlist.name}
              className="w-full aspect-square object-cover rounded-md shadow-lg mb-4"
            />
            <h3 className="font-semibold truncate">{playlist.name}</h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {playlist.description}
            </p>
            <button
              className="absolute bottom-[85px] right-6 w-12 h-12 bg-[#1ed760] rounded-full items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex hover:scale-105"
              onClick={(e) => playPlaylist(e, playlist)}
            >
              <BsFillPlayCircleFill className="w-8 h-8 text-black" />
            </button>
          </Link>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#282828] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-[#3e3e3e] text-white placeholder-gray-400 focus:outline-none"
            />
            <textarea
              placeholder="Add an optional description"
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              className="w-full p-3 mb-6 rounded bg-[#3e3e3e] text-white placeholder-gray-400 focus:outline-none resize-none h-24"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 rounded-full text-white hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                disabled={!newPlaylistName.trim()}
                className="px-6 py-2 rounded-full bg-[#1ed760] text-black font-semibold hover:bg-[#1db954] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library; 