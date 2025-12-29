# VideoFollow

A React component library for synchronizing video playback with lyrics display. Easily sync YouTube videos with timestamped lyrics.

[中文文件](./README.md)

## Features

- 🎵 **Time Sync** - Automatically highlight current lyrics based on video playback
- 🖱️ **Click to Seek** - Click on any lyric to jump to that timestamp
- 📜 **Follow Mode** - Lyrics auto-scroll to follow current playback position
- 🎨 **Multiple Display Modes** - Card and plain text display styles
- 💬 **Floating Lyrics** - Display current lyrics overlaid on video

## Installation

```bash
npm install video-follow react-player
```

## Quick Start

```jsx
import { VideoFollowPlayer } from 'video-follow';
import 'video-follow/src/components/VideoFollowPlayer.css';
import 'video-follow/src/components/LyricsDisplay.css';

const lyricsData = [
  { time: "00:00:15,500", text: "First line of lyrics" },
  { time: "00:00:20,000", text: "Second line of lyrics" },
  { time: "00:00:25,500", text: "Third line of lyrics" },
];

function App() {
  return (
    <VideoFollowPlayer
      videoUrl="https://www.youtube.com/watch?v=your-video-id"
      lyricsData={lyricsData}
      title="Song Title"
    />
  );
}
```

## Component API

### VideoFollowPlayer

Main player component that integrates video with synchronized lyrics.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoUrl` | string | - | Video URL (supports YouTube, etc.) |
| `lyricsData` | array | `[]` | Array of lyrics data |
| `title` | string | `''` | Title |
| `showControls` | boolean | `true` | Show control bar |
| `showTimestamp` | boolean | `false` | Show timestamps in lyrics |
| `displayMode` | string | `'card'` | Display mode: `'card'` \| `'plain'` |
| `floatingLyrics` | boolean | `true` | Show floating lyrics overlay |

### LyricsDisplay

Standalone lyrics display component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lyricsData` | array | `[]` | Array of lyrics data |
| `currentIndex` | number | `-1` | Currently highlighted lyric index |
| `onLyricClick` | function | - | Callback when lyric is clicked |
| `displayMode` | string | `'card'` | Display mode |

### useVideoSync Hook

Core sync hook for building custom players.

```jsx
import { useVideoSync } from 'video-follow';

const {
  currentIndex,      // Current lyric index
  isPlaying,         // Playback state
  isFollowMode,      // Follow mode state
  playerRef,         // Player reference
  handleProgress,    // Progress update handler
  seekTo,            // Seek to specific time
  goToPrevious,      // Go to previous lyric
  goToNext,          // Go to next lyric
  toggleFollowMode,  // Toggle follow mode
  togglePlay,        // Toggle play/pause
} = useVideoSync(lyricsData, options);
```

## Lyrics Data Format

```javascript
const lyricsData = [
  { 
    time: "00:00:15,500",  // SRT timestamp format (HH:MM:SS,mmm)
    text: "Lyric content"  // Lyric text
  },
  // ...
];
```

## License

MIT License
