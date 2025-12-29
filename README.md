# VideoFollow

影片與歌詞同步的 React 組件庫。輕鬆將 YouTube 等影片與時間戳歌詞同步顯示。

[English](./README_EN.md)

## 特色

- 🎵 **時間同步** - 根據影片播放進度自動高亮當前歌詞
- 🖱️ **點擊跳轉** - 點擊歌詞跳轉到對應時間點
- 📜 **跟播模式** - 歌詞自動滾動跟隨當前播放位置
- 🎨 **多種顯示模式** - 支援卡片和純文字兩種顯示樣式
- 💬 **浮動歌詞** - 影片上方顯示當前歌詞

## 安裝

```bash
npm install video-follow react-player
```

## 快速開始

```jsx
import { VideoFollowPlayer } from 'video-follow';
import 'video-follow/src/components/VideoFollowPlayer.css';
import 'video-follow/src/components/LyricsDisplay.css';

const lyricsData = [
  { time: "00:00:15,500", text: "第一句歌詞" },
  { time: "00:00:20,000", text: "第二句歌詞" },
  { time: "00:00:25,500", text: "第三句歌詞" },
];

function App() {
  return (
    <VideoFollowPlayer
      videoUrl="https://www.youtube.com/watch?v=your-video-id"
      lyricsData={lyricsData}
      title="歌曲標題"
    />
  );
}
```

## 組件 API

### VideoFollowPlayer

主播放器組件，整合影片與歌詞同步。

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `videoUrl` | string | - | 影片網址（支援 YouTube 等） |
| `lyricsData` | array | `[]` | 歌詞資料陣列 |
| `title` | string | `''` | 標題 |
| `showControls` | boolean | `true` | 是否顯示控制列 |
| `showTimestamp` | boolean | `false` | 是否顯示時間戳 |
| `displayMode` | string | `'card'` | 顯示模式：`'card'` \| `'plain'` |
| `floatingLyrics` | boolean | `true` | 是否顯示浮動歌詞 |

### LyricsDisplay

獨立的歌詞顯示組件。

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `lyricsData` | array | `[]` | 歌詞資料陣列 |
| `currentIndex` | number | `-1` | 當前高亮的歌詞索引 |
| `onLyricClick` | function | - | 點擊歌詞的回調函數 |
| `displayMode` | string | `'card'` | 顯示模式 |

### useVideoSync Hook

核心同步 Hook，可用於自訂播放器。

```jsx
import { useVideoSync } from 'video-follow';

const {
  currentIndex,      // 當前歌詞索引
  isPlaying,         // 是否正在播放
  isFollowMode,      // 跟播模式狀態
  playerRef,         // 播放器引用
  handleProgress,    // 進度更新處理
  seekTo,            // 跳轉到指定時間
  goToPrevious,      // 上一句
  goToNext,          // 下一句
  toggleFollowMode,  // 切換跟播模式
  togglePlay,        // 切換播放/暫停
} = useVideoSync(lyricsData, options);
```

## 歌詞資料格式

```javascript
const lyricsData = [
  { 
    time: "00:00:15,500",  // SRT 時間戳格式 (HH:MM:SS,mmm)
    text: "歌詞內容"        // 歌詞文字
  },
  // ...
];
```

## 授權

MIT License
