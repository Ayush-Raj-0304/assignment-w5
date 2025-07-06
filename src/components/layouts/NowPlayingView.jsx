import { useSelector, useDispatch } from 'react-redux';
import { BsFillPlayFill, BsPauseFill, BsShuffle, BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { togglePlay, toggleRepeat, toggleShuffle, playNext, playPrevious } from '../../redux/features/playerSlice';

const NowPlayingView = ({ onClose }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, repeat, shuffle } = useSelector((state) => state.player);

  if (!currentSong) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white z-50">
      {/* Header */}
      <div className="p-8 flex justify-between items-center">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Now Playing</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Album Art and Controls */}
      <div className="max-w-screen-sm mx-auto px-4 text-center">
        <img
          src={currentSong.albumArt}
          alt={currentSong.title}
          className="w-full aspect-square object-cover rounded-lg shadow-2xl mb-8"
        />

        {/* Song Info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-gray-400 text-lg">{currentSong.artist.name}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-gray-600 rounded-full">
            <div className="h-full bg-white rounded-full" style={{ width: '45%' }} />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <button
            className={`text-gray-400 hover:text-white ${shuffle ? 'text-[#1ed760]' : ''}`}
            onClick={() => dispatch(toggleShuffle())}
          >
            <BsShuffle size={24} />
          </button>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => dispatch(playPrevious())}
          >
            <BiSkipPrevious size={36} />
          </button>
          <button
            className="bg-white rounded-full p-3 hover:scale-105 transition-transform"
            onClick={() => dispatch(togglePlay())}
          >
            {isPlaying ? (
              <BsPauseFill size={32} className="text-black" />
            ) : (
              <BsFillPlayFill size={32} className="text-black ml-1" />
            )}
          </button>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => dispatch(playNext())}
          >
            <BiSkipNext size={36} />
          </button>
          <button
            className={`text-gray-400 hover:text-white ${repeat !== 'off' ? 'text-[#1ed760]' : ''}`}
            onClick={() => dispatch(toggleRepeat())}
          >
            {repeat === 'track' ? <BsRepeat1 size={24} /> : <BsRepeat size={24} />}
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-center gap-8">
          <button className="text-gray-400 hover:text-white">
            <FaRegHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingView; 