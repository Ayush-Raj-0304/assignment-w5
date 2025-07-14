import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPlayFill, BsPauseFill, BsShuffle, BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { HiQueueList } from 'react-icons/hi2';
import { togglePlay, toggleRepeat, toggleShuffle, playNext, playPrevious, setCurrentTime, setDuration } from '../../redux/features/playerSlice';
import { toggleLikeSong } from '../../redux/features/likedSongsSlice';
import { handleImageError } from '../../utils/imageUtils';
import FeatureModal from '../modals/FeatureModal';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, repeat, shuffle } = useSelector((state) => state.player);
  const { likedSongs } = useSelector((state) => state.likedSongs);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [featureMessage, setFeatureMessage] = useState('');
  const audioRef = useRef(null);

  const isCurrentSongLiked = currentSong && likedSongs.some(song => song.id === currentSong.id);

  const showComingSoon = (feature) => {
    setFeatureMessage(`${feature} feature is coming soon!`);
    setShowFeatureModal(true);
  };

  useEffect(() => {
    if (currentSong?.url) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          dispatch(togglePlay());
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, dispatch]);

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  const handleEnded = () => {
    if (repeat === 'track') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(playNext());
    }
  };

  const handleLikeClick = () => {
    if (currentSong) {
      dispatch(toggleLikeSong(currentSong));
    }
  };

  if (!currentSong) return null;

  return (
    <>
      {showFeatureModal && (
        <FeatureModal
          message={featureMessage}
          onClose={() => setShowFeatureModal(false)}
        />
      )}
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 z-[10]">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Current Song Info */}
          <div className="flex items-center w-[30%]">
            {currentSong && (
              <>
                <img
                  src={currentSong.albumArt}
                  alt={currentSong.title}
                  className="h-14 w-14 rounded"
                  onError={handleImageError}
                />
                <div className="ml-3">
                  <div className="text-white text-sm font-semibold hover:underline cursor-pointer">
                    {currentSong.title}
                  </div>
                  <div className="text-gray-400 text-xs hover:underline cursor-pointer">
                    {currentSong.artist.name}
                  </div>
                </div>
                <button
                  className={`ml-4 transition-colors ${isCurrentSongLiked ? 'text-[#1ed760]' : 'text-gray-400 hover:text-white'}`}
                  onClick={handleLikeClick}
                >
                  {isCurrentSongLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                </button>
              </>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col items-center max-w-[45%] w-full">
            <div className="flex items-center gap-4 mb-2">
              <button
                className={`text-gray-400 hover:text-white transition-colors ${shuffle ? 'text-[#1ed760]' : ''}`}
                onClick={() => showComingSoon('Shuffle')}
              >
                <BsShuffle size={20} />
              </button>
              <button
                className="text-white"
                onClick={() => dispatch(playPrevious())}
              >
                <BiSkipPrevious size={32} />
              </button>
              <button
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => dispatch(togglePlay())}
              >
                {isPlaying ? (
                  <BsPauseFill size={24} className="text-black" />
                ) : (
                  <BsFillPlayFill size={24} className="text-black ml-1" />
                )}
              </button>
              <button
                className="text-white"
                onClick={() => dispatch(playNext())}
              >
                <BiSkipNext size={32} />
              </button>
              <button
                className={`text-gray-400 hover:text-white transition-colors ${repeat !== 'off' ? 'text-[#1ed760]' : ''}`}
                onClick={() => showComingSoon('Repeat')}
              >
                <BsRepeat size={20} />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(audioRef.current?.currentTime)}
              </span>
              <div className="flex-1 bg-[#4d4d4d] rounded-full h-1 cursor-pointer relative group"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const percent = (e.clientX - rect.left) / rect.width;
                     audioRef.current.currentTime = percent * audioRef.current.duration;
                   }}>
                <div
                  className="bg-white h-1 rounded-full absolute left-0 top-0"
                  style={{
                    width: `${(audioRef.current?.currentTime / audioRef.current?.duration) * 100 || 0}%`
                  }}
                />
                <div className="h-3 w-3 bg-white rounded-full absolute top-1/2 -mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{
                       left: `${(audioRef.current?.currentTime / audioRef.current?.duration) * 100 || 0}%`,
                       transform: 'translateX(-50%)'
                     }} />
              </div>
              <span className="text-xs text-gray-400 w-10">
                {formatTime(audioRef.current?.duration)}
              </span>
            </div>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center justify-end w-[30%]">
            <button
              className="text-gray-400 hover:text-white transition-colors mr-4"
              onClick={() => showComingSoon('Queue')}
            >
              <HiQueueList size={20} />
            </button>
            {/* Volume Slider */}
            <div className="w-24 bg-[#4d4d4d] rounded-full h-1 cursor-pointer relative group"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const percent = (e.clientX - rect.left) / rect.width;
                   audioRef.current.volume = Math.max(0, Math.min(1, percent));
                 }}>
              <div
                className="bg-white h-1 rounded-full absolute left-0 top-0"
                style={{ width: `${(audioRef.current?.volume || 1) * 100}%` }}
              />
              <div className="h-3 w-3 bg-white rounded-full absolute top-1/2 -mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{
                     left: `${(audioRef.current?.volume || 1) * 100}%`,
                     transform: 'translateX(-50%)'
                   }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return '0:00';
};

export default MusicPlayer; 