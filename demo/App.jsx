import React from 'react';
import ReactPlayer from 'react-player';
import { useVideoSync } from '../src';
import './styles.css';

// 範例歌詞資料
const lyricsData = [
    { time: "00:00:43,547", text: "Never gonna give you up" },
    { time: "00:00:45,284", text: "Never gonna let you down" },
    { time: "00:00:47,845", text: "Never gonna run around and desert you" },
    { time: "00:00:51,397", text: "Never gonna make you cry" },
    { time: "00:00:53,727", text: "Never gonna say goodbye" },
    { time: "00:00:56,263", text: "Never gonna tell a lie and hurt you" },
];

function App() {
    const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    // 使用核心 Hook
    const {
        currentIndex,
        bindPlayer,
        seekToLyric,
        goToPrevious,
        goToNext,
        togglePlay,
        isPlaying,
    } = useVideoSync(lyricsData);

    return (
        <div className="demo-app">
            {/* 標頭 */}
            <header className="demo-header">
                <h1>VideoFollow Demo</h1>
                <p>純 Hook 實現 - 完全自訂 UI</p>
            </header>

            {/* 主要內容 */}
            <main className="demo-main">
                <div className="player-container">
                    {/* 影片區 */}
                    <div className="video-section">
                        <ReactPlayer
                            url={videoUrl}
                            {...bindPlayer}
                            controls
                            width="100%"
                            height="100%"
                        />
                    </div>

                    {/* 歌詞區 - 完全自訂樣式 */}
                    <div className="lyrics-section">
                        <div className="controls">
                            <button onClick={goToPrevious}>⏮️ 上一句</button>
                            <button onClick={togglePlay}>
                                {isPlaying ? '⏸️ 暫停' : '▶️ 播放'}
                            </button>
                            <button onClick={goToNext}>⏭️ 下一句</button>
                        </div>

                        <div className="lyrics-list">
                            {lyricsData.map((line, index) => (
                                <div
                                    key={index}
                                    className={`lyric-item ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => seekToLyric(index)}
                                >
                                    {line.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* 頁尾 */}
            <footer className="demo-footer">
                <p>VideoFollow - MIT License</p>
            </footer>
        </div>
    );
}

export default App;
