import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiLibrary } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { BsSearch, BsPlusSquareFill, BsFillPlayCircleFill } from 'react-icons/bs';
import { playlists } from '../../data/mockData';
import { setCurrentSong, setQueue } from '../../redux/features/playerSlice';
import { fetchUserPlaylists, addUserPlaylist } from '../../redux/features/playlistSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userPlaylists } = useSelector((state) => state.playlist);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName.trim(),
      description: `Created by user`,
      coverArt: "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2",
      songs: [],
      type: "Playlist",
      followers: "0",
      owner: "You"
    };

    dispatch(addUserPlaylist(newPlaylist));
    setNewPlaylistName('');
    setShowCreateModal(false);
  };

  const playPlaylist = (e, playlist) => {
    e.preventDefault(); // Prevent navigation when clicking play button
    if (playlist?.songs?.length > 0) {
      dispatch(setQueue(playlist.songs.slice(1)));
      dispatch(setCurrentSong(playlist.songs[0]));
    }
  };

  return (
    <div className="bg-black w-60 flex-shrink-0 h-full flex flex-col">
      {/* Navigation */}
      <div className="p-6">
        <Link to="/" className={`flex items-center mb-4 text-gray-400 hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>
          <AiFillHome className="w-6 h-6 mr-4" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link to="/search" className={`flex items-center mb-4 text-gray-400 hover:text-white transition-colors ${location.pathname === '/search' ? 'text-white' : ''}`}>
          <BsSearch className="w-6 h-6 mr-4" />
          <span className="font-semibold">Search</span>
        </Link>
        <Link to="/library" className={`flex items-center mb-6 text-gray-400 hover:text-white transition-colors ${location.pathname === '/library' ? 'text-white' : ''}`}>
          <BiLibrary className="w-6 h-6 mr-4" />
          <span className="font-semibold">Your Library</span>
        </Link>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center mb-6 text-gray-400 hover:text-white transition-colors w-full"
        >
          <BsPlusSquareFill className="w-6 h-6 mr-4" />
          <span className="font-semibold">Create Playlist</span>
        </button>
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#282828] p-6 rounded-lg w-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-white">Create Playlist</h2>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full p-3 rounded-md bg-[#3E3E3E] text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
              autoFocus
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-full text-white hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createPlaylist}
                className="px-4 py-2 rounded-full bg-[#1ed760] text-black font-semibold hover:bg-[#1db954] transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="space-y-2 pb-28">
          {/* User Created Playlists */}
          {userPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="flex items-center p-2 rounded-md hover:bg-[#ffffff1a] group cursor-pointer relative"
            >
              <img
                src={playlist.coverArt}
                alt={playlist.name}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400">Playlist • {playlist.owner}</p>
              </div>
              <button
                className="absolute right-2 w-8 h-8 bg-[#1ed760] rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex"
                onClick={(e) => playPlaylist(e, playlist)}
              >
                <BsFillPlayCircleFill className="w-5 h-5 text-black" />
              </button>
            </Link>
          ))}

          {/* Spotify Playlists */}
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="flex items-center p-2 rounded-md hover:bg-[#ffffff1a] group cursor-pointer relative"
            >
              <img
                src={playlist.coverArt}
                alt={playlist.name}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400">Playlist • {playlist.owner}</p>
              </div>
              <button
                className="absolute right-2 w-8 h-8 bg-[#1ed760] rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex"
                onClick={(e) => playPlaylist(e, playlist)}
              >
                <BsFillPlayCircleFill className="w-5 h-5 text-black" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 