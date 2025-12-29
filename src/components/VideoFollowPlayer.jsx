import React from 'react';
import ReactPlayer from 'react-player';
import LyricsDisplay from './LyricsDisplay';
import { useVideoSync } from '../hooks/useVideoSync';
import './VideoFollowPlayer.css';

/**
 * VideoFollow 主播放器組件
 * 整合影片播放與歌詞同步顯示
 * 
 * @param {Object} props
 * @param {string} props.videoUrl - 影片網址（支援 YouTube 等）
 * @param {Array} props.lyricsData - 歌詞資料陣列 [{ time, text }]
 * @param {string} props.title - 標題（可選）
 * @param {boolean} props.autoPlay - 是否自動播放
 * @param {boolean} props.showControls - 是否顯示控制列
 * @param {boolean} props.showTimestamp - 是否在歌詞中顯示時間戳
 * @param {string} props.displayMode - 歌詞顯示模式：'card' | 'plain'
 * @param {boolean} props.floatingLyrics - 是否顯示浮動歌詞
 * @param {string} props.className - 額外的 CSS 類名
 */
const VideoFollowPlayer = ({
    videoUrl,
    lyricsData = [],
    title = '',
    autoPlay = false,
    showControls = true,
    showTimestamp = false,
    displayMode = 'card',
    floatingLyrics = true,
    className = '',
}) => {
    const {
        currentIndex,
        isPlaying,
        isFollowMode,
        playerRef,
        handleProgress,
        seekTo,
        goToPrevious,
        goToNext,
        toggleFollowMode,
        togglePlay,
        setIsPlaying,
    } = useVideoSync(lyricsData, {
        autoScroll: true,
        scrollContainerId: 'vf-lyrics-scroll-container',
    });

    // 處理歌詞點擊
    const handleLyricClick = (time) => {
        seekTo(time);
    };

    return (
        <div className={`vf-player-container ${className}`}>
            {/* 影片區域 */}
            <div className="vf-video-section">
                {title && <h2 className="vf-title">{title}</h2>}

                <div className="vf-video-wrapper">
                    <ReactPlayer
                        ref={playerRef}
                        url={videoUrl}
                        controls={true}
                        width="100%"
                        height="100%"
                        playing={isPlaying}
                        onProgress={handleProgress}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="vf-react-player"
                    />

                    {/* 浮動歌詞 */}
                    {floatingLyrics && currentIndex >= 0 && lyricsData[currentIndex] && (
                        <div className="vf-floating-lyrics">
                            <p>{lyricsData[currentIndex].text}</p>
                        </div>
                    )}
                </div>

                {/* 控制列 */}
                {showControls && (
                    <div className="vf-controls">
                        <button
                            onClick={togglePlay}
                            className="vf-control-btn"
                            title={isPlaying ? '暫停' : '播放'}
                        >
                            {isPlaying ? '⏸️' : '▶️'}
                        </button>

                        <button
                            onClick={goToPrevious}
                            className="vf-control-btn"
                            disabled={currentIndex <= 0}
                            title="上一句"
                        >
                            ⏮️
                        </button>

                        <button
                            onClick={goToNext}
                            className="vf-control-btn"
                            disabled={currentIndex >= lyricsData.length - 1}
                            title="下一句"
                        >
                            ⏭️
                        </button>
                    </div>
                )}
            </div>

            {/* 歌詞區域 */}
            <div className="vf-lyrics-section">
                <LyricsDisplay
                    lyricsData={lyricsData}
                    currentIndex={currentIndex}
                    onLyricClick={handleLyricClick}
                    showTimestamp={showTimestamp}
                    displayMode={displayMode}
                    containerId="vf-lyrics-scroll-container"
                />
            </div>
        </div>
    );
};

export default VideoFollowPlayer;
