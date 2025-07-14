import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/layouts/Sidebar';
import MusicPlayer from './components/layouts/MusicPlayer';
import NowPlayingView from './components/layouts/NowPlayingView';
import TopBar from './components/layouts/TopBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Album from './pages/Album';
import Playlist from './pages/Playlist';
import Category from './pages/Category';
import Artist from './pages/Artist';
import NotFound from './pages/NotFound';
import AddToPlaylistModal from './components/modals/AddToPlaylistModal';

function App() {
  const showNowPlaying = useSelector((state) => state.player.showNowPlaying);
  const showAddToPlaylistModal = useSelector((state) => state.playlist.showAddToPlaylistModal);

  return (
    <Router>
      <div className="flex h-screen bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        {showNowPlaying && <NowPlayingView />}
        <MusicPlayer />
        {showAddToPlaylistModal && <AddToPlaylistModal />}
      </div>
    </Router>
  );
}

export default App;
