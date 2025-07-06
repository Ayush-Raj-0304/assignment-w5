import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  togglePlay,
  setVolume,
  toggleRepeat,
  toggleShuffle,
  setCurrentTime,
  setDuration,
  playNext,
  playPrevious,
} from '../../redux/features/playerSlice';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
  BsRepeat,
  BsRepeat1,
  BsFillVolumeUpFill,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
} from 'react-icons/bs';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { TbMicrophone2, TbPlaylist } from 'react-icons/tb';
import { HiQueueList } from 'react-icons/hi2';
import NowPlayingView from './NowPlayingView';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const {
    currentSong,
    isPlaying,
    volume,
    repeat,
    shuffle,
    currentTime,
    queue,
  } = useSelector((state) => state.player);

  useEffect(() => {
    if (currentSong?.url) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

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

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '0:00';
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    dispatch(setCurrentTime(seekTime));
  };

  const handlePlayerClick = () => {
    if (currentSong) {
      setShowNowPlaying(true);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-2 cursor-pointer"
        onClick={handlePlayerClick}
      >
        <audio
          ref={audioRef}
          src={currentSong?.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
        
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Current Song Info */}
          <div className="flex items-center w-[30%]">
            {currentSong && (
              <>
                <img
                  src={currentSong.albumArt}
                  alt={currentSong.title}
                  className="h-14 w-14 rounded"
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
                  className="ml-4 text-gray-400 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaRegHeart size={16} />
                </button>
              </>
            )}
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center w-[40%]">
            <div className="flex items-center gap-4 mb-1">
              <button
                className={`text-gray-400 hover:text-white ${shuffle ? 'text-[#1ed760]' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleShuffle());
                }}
              >
                <BsShuffle size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(playPrevious());
                }}
              >
                <BiSkipPrevious size={30} />
              </button>
              <button
                className="bg-white rounded-full p-2 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(togglePlay());
                }}
              >
                {isPlaying ? (
                  <BsPauseFill size={24} className="text-black" />
                ) : (
                  <BsFillPlayFill size={24} className="text-black ml-1" />
                )}
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(playNext());
                }}
              >
                <BiSkipNext size={30} />
              </button>
              <button
                className={`text-gray-400 hover:text-white ${repeat !== 'off' ? 'text-[#1ed760]' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleRepeat());
                }}
              >
                {repeat === 'track' ? (
                  <BsRepeat1 size={20} />
                ) : (
                  <BsRepeat size={20} />
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / (audioRef.current?.duration || 1)) * 100}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-[#1ed760]"
              />
              <span className="text-xs text-gray-400 w-10">
                {formatTime(audioRef.current?.duration)}
              </span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-end gap-3 w-[30%]" onClick={(e) => e.stopPropagation()}>
            <button className="text-gray-400 hover:text-white">
              <TbMicrophone2 size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <HiQueueList size={20} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <TbPlaylist size={20} />
            </button>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white">
                {volume === 0 ? (
                  <BsFillVolumeMuteFill size={20} />
                ) : volume < 0.5 ? (
                  <BsFillVolumeDownFill size={20} />
                ) : (
                  <BsFillVolumeUpFill size={20} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-[#1ed760]"
              />
            </div>
          </div>
        </div>
      </div>

      {showNowPlaying && <NowPlayingView onClose={() => setShowNowPlaying(false)} />}
    </>
  );
};

export default MusicPlayer; 