# 🎵 Spotify Clone

A modern web application that replicates the core features of Spotify, built with React and Redux. This project demonstrates advanced state management, responsive design, and modern web development practices.

## 🔄 Latest Updates

### Version Update (Latest Push)

1. 🎵 **Liked Songs Enhancement**
   - Added localStorage persistence for liked songs
   - Improved state management with Redux
   - Fixed playlist display for liked songs collection

2. 🔍 **Search Page Improvements**
   - Fixed blank page issue with proper Redux integration
   - Enhanced search results display
   - Improved error handling and loading states
   - Added proper JSX structure for better performance

3. 🖼️ **Image Handling System**
   - Implemented robust fallback system for different content types:
     - Artist profiles
     - Album covers
     - Playlist thumbnails
     - Generic content
   - Added specific error handlers for each image type
   - Fixed image loading issues across components

4. 🎨 **UI/UX Enhancements**
   - Fixed layout issues in playlist and album pages
   - Improved music player responsiveness
   - Enhanced overall user experience with better error states


## ✨ Features

- 🎵 Music Playback
  - Play/pause, skip, and previous track controls
  - Progress bar with seek functionality
  - Volume control
  - Shuffle and repeat modes

- 📱 Responsive Design
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Consistent UI components

- 🎨 Modern UI
  - Spotify-inspired design
  - Smooth animations and transitions
  - Dynamic color themes
  - Loading states and error handling

- 📚 Library Management
  - Create and manage playlists
  - Add/remove songs from playlists
  - Browse artists, albums, and categories
  - Search functionality

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: React Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-clone.git
cd spotify-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
spotify-clone/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── layouts/       # Layout components
│   │   └── modals/        # Modal components
│   ├── pages/             # Page components
│   ├── redux/             # Redux store and slices
│   │   ├── features/      # Redux slices
│   │   └── store.js       # Redux store configuration
│   ├── data/             # Mock data
│   ├── assets/           # Static assets
│   └── App.jsx           # Root component
├── public/               # Public assets
└── package.json         # Project dependencies
```

## 🎨 UI Components

- **MusicPlayer**: Controls playback and displays current track
- **Sidebar**: Navigation and playlist management
- **TopBar**: Search and user controls
- **NowPlayingView**: Expanded view of current track
- **AddToPlaylistModal**: Manage playlist songs

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:

- **playerSlice**: Handles music playback state
- **playlistSlice**: Manages playlists and library
- **searchSlice**: Handles search functionality

## 🎯 Features in Detail

### Music Player
- Real-time progress tracking
- Keyboard shortcuts for playback control
- Persistent volume settings
- Queue management

### Playlists
- Create custom playlists
- Add/remove songs
- Automatic playlist updates
- Local storage persistence

### Search
- Real-time search results
- Filter by songs, artists, albums
- Category-based browsing
- Recent searches history

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Spotify
- Icons from React Icons
- Mock audio from SoundHelix