import React, { useState } from 'react';
import { VideoFollowPlayer } from '../src';
import '../src/components/VideoFollowPlayer.css';
import '../src/components/LyricsDisplay.css';
import './styles.css';

// 範例歌詞資料
const sampleLyricsData = [
    { time: "00:00:43,547", text: "Never gonna give you up" },
    { time: "00:00:45,284", text: "Never gonna let you down" },
    { time: "00:00:47,845", text: "Never gonna run around and desert you" },
    { time: "00:00:51,397", text: "Never gonna make you cry" },
    { time: "00:00:53,727", text: "Never gonna say goodbye" },
    { time: "00:00:56,263", text: "Never gonna tell a lie and hurt you" },
];

function App() {
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    const [displayMode, setDisplayMode] = useState('card');

    return (
        <div className="demo-app">
            {/* 標頭 */}
            <header className="demo-header">
                <div className="demo-header-content">
                    <h1>VideoFollow</h1>
                    <p className="demo-subtitle">影片與歌詞同步組件庫</p>
                </div>
            </header>

            {/* 主要內容 */}
            <main className="demo-main">
                {/* 設定區 */}
                <div className="demo-settings">
                    <div className="demo-setting-item">
                        <label>影片網址</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="輸入 YouTube 網址"
                        />
                    </div>

                    <div className="demo-setting-item">
                        <label>顯示模式</label>
                        <select
                            value={displayMode}
                            onChange={(e) => setDisplayMode(e.target.value)}
                        >
                            <option value="card">卡片模式</option>
                            <option value="plain">純文字模式</option>
                        </select>
                    </div>
                </div>

                {/* 播放器 */}
                <VideoFollowPlayer
                    videoUrl={videoUrl}
                    lyricsData={sampleLyricsData}
                    title=""
                    displayMode={displayMode}
                    showTimestamp={false}
                    floatingLyrics={true}
                />
            </main>

            {/* 頁尾 */}
            <footer className="demo-footer">
                <p>VideoFollow - MIT License</p>
            </footer>
        </div>
    );
}

export default App;
