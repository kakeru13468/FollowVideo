# FollowVideo

A React Hook for synchronizing video playback with lyrics. Build your own custom lyrics player with full control over styling.

[中文文件](./README.md)

## Features

- **Time Sync** - Automatically track current lyric based on video playback
- **Click to Seek** - Click on any lyric to jump to that timestamp
- **Easy Integration** - Works with any video player

## Installation

```bash
npm install react-player@2 github:kakeru13468/FollowVideo
```

## Quick Start

```jsx
import { useVideoSync } from 'video-follow';
import ReactPlayer from 'react-player';

const lyricsData = [
  { time: "00:00:15,500", text: "First line" },
  { time: "00:00:20,000", text: "Second line" },
];

function MyLyricsPlayer({ videoUrl, lyricsData }) {
  const { currentIndex, bindPlayer, seekToLyric } = useVideoSync(lyricsData);

  return (
    <div>
      {/* Video */}
      <ReactPlayer url={videoUrl} {...bindPlayer} controls />
      
      {/* Lyrics - fully customizable */}
      <div>
        {lyricsData.map((line, index) => (
          <p
            key={index}
            style={{
              color: index === currentIndex ? 'blue' : 'black',
              fontWeight: index === currentIndex ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
            onClick={() => seekToLyric(index)}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
```

## API

### useVideoSync(lyricsData)

Core Hook that provides lyrics synchronization.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `lyricsData` | array | Array of lyrics `[{ time, text }]` |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `currentIndex` | number | Current lyric index |
| `currentLyric` | object | Current lyric object `{ time, text }` |
| `isPlaying` | boolean | Playback state |
| `bindPlayer` | object | Props to bind to ReactPlayer |
| `seekToLyric` | function | Jump to specific lyric `(index) => void` |
| `seekToTime` | function | Jump to specific time `(time) => void` |
| `goToPrevious` | function | Go to previous lyric |
| `goToNext` | function | Go to next lyric |
| `togglePlay` | function | Toggle play/pause |
| `play` | function | Play |
| `pause` | function | Pause |

### bindPlayer

Convenience object to spread onto ReactPlayer:

```jsx
<ReactPlayer url={videoUrl} {...bindPlayer} />
```

Equivalent to:

```jsx
<ReactPlayer
  url={videoUrl}
  ref={bindPlayer.ref}
  playing={bindPlayer.playing}
  onProgress={bindPlayer.onProgress}
  onPlay={bindPlayer.onPlay}
  onPause={bindPlayer.onPause}
/>
```

## Lyrics Data Format

```javascript
const lyricsData = [
  { time: "00:00:15,500", text: "Lyric content" },  // SRT timestamp format
  { time: "00:00:20,000", text: "Next line" },
];
```

## License

MIT License
