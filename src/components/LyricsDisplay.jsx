import React from 'react';
import './LyricsDisplay.css';

/**
 * 歌詞顯示組件
 * @param {Object} props
 * @param {Array} props.lyricsData - 歌詞資料陣列 [{ time, text }]
 * @param {number} props.currentIndex - 當前高亮的歌詞索引
 * @param {Function} props.onLyricClick - 點擊歌詞時的回調函數
 * @param {boolean} props.showTimestamp - 是否顯示時間戳
 * @param {string} props.displayMode - 顯示模式：'card' | 'plain'
 * @param {string} props.className - 額外的 CSS 類名
 */
const LyricsDisplay = ({
    lyricsData = [],
    currentIndex = -1,
    onLyricClick,
    showTimestamp = false,
    displayMode = 'card',
    className = '',
    containerId = 'lyrics-container',
}) => {
    if (!Array.isArray(lyricsData) || lyricsData.length === 0) {
        return (
            <div className="vf-lyrics-empty">
                暫無歌詞
            </div>
        );
    }

    const handleClick = (time, index) => {
        if (onLyricClick) {
            onLyricClick(time, index);
        }
    };

    // 卡片模式
    if (displayMode === 'card') {
        return (
            <div
                id={containerId}
                className={`vf-lyrics-container vf-lyrics-card ${className}`}
            >
                {lyricsData.map((line, index) => (
                    <div
                        key={index}
                        id={`lyric-${index}`}
                        className={`vf-lyric-card ${index === currentIndex ? 'vf-lyric-active' : ''}`}
                        onClick={() => handleClick(line.time, index)}
                    >
                        {showTimestamp && (
                            <span className="vf-lyric-time">{line.time}</span>
                        )}
                        <p className="vf-lyric-text">{line.text}</p>
                    </div>
                ))}
            </div>
        );
    }

    // 純文字模式
    return (
        <div
            id={containerId}
            className={`vf-lyrics-container vf-lyrics-plain ${className}`}
        >
            {lyricsData.map((line, index) => (
                <p
                    key={index}
                    id={`lyric-${index}`}
                    className={`vf-lyric-line ${index === currentIndex ? 'vf-lyric-active' : ''}`}
                    onClick={() => handleClick(line.time, index)}
                >
                    {showTimestamp && (
                        <span className="vf-lyric-time">{line.time}</span>
                    )}
                    <span className="vf-lyric-text">{line.text}</span>
                </p>
            ))}
        </div>
    );
};

export default LyricsDisplay;
