# VideoFollow

影片與歌詞同步的 React Hook。讓您輕鬆建立自訂樣式的歌詞同步播放器。

[English](./README_EN.md)

## 特色

- **時間同步** - 根據影片播放進度自動追蹤當前歌詞
- **點擊跳轉** - 點擊歌詞跳轉到對應時間點
- **自訂 UI** - 只提供邏輯，UI 完全由您決定
- **簡單整合** - 可與任何影片播放器搭配使用

## 安裝

```bash
npm install video-follow react-player
```

## 快速開始

```jsx
import { useVideoSync } from 'video-follow';
import ReactPlayer from 'react-player';

const lyricsData = [
  { time: "00:00:15,500", text: "第一句歌詞" },
  { time: "00:00:20,000", text: "第二句歌詞" },
];

function MyLyricsPlayer({ videoUrl, lyricsData }) {
  const { currentIndex, bindPlayer, seekToLyric } = useVideoSync(lyricsData);

  return (
    <div>
      {/* 影片 */}
      <ReactPlayer url={videoUrl} {...bindPlayer} controls />
      
      {/* 歌詞 - 完全自訂樣式 */}
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

核心 Hook，提供歌詞同步功能。

#### 參數

| 參數 | 類型 | 說明 |
|------|------|------|
| `lyricsData` | array | 歌詞資料陣列 `[{ time, text }]` |

#### 回傳值

| 屬性 | 類型 | 說明 |
|------|------|------|
| `currentIndex` | number | 當前歌詞索引 |
| `currentLyric` | object | 當前歌詞物件 `{ time, text }` |
| `isPlaying` | boolean | 是否正在播放 |
| `bindPlayer` | object | 綁定到 ReactPlayer 的屬性 |
| `seekToLyric` | function | 跳轉到指定歌詞 `(index) => void` |
| `seekToTime` | function | 跳轉到指定時間 `(time) => void` |
| `goToPrevious` | function | 上一句歌詞 |
| `goToNext` | function | 下一句歌詞 |
| `togglePlay` | function | 切換播放/暫停 |
| `play` | function | 播放 |
| `pause` | function | 暫停 |

### bindPlayer

快捷綁定物件，可直接展開到 ReactPlayer：

```jsx
<ReactPlayer url={videoUrl} {...bindPlayer} />
```

等同於：

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

## 歌詞資料格式

```javascript
const lyricsData = [
  { time: "00:00:15,500", text: "歌詞內容" },  // SRT 時間戳格式
  { time: "00:00:20,000", text: "下一句" },
];
```

## 授權

MIT License
