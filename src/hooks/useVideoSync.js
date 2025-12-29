import { useState, useRef, useCallback, useEffect } from 'react';
import { convertTimeToSeconds, findCurrentLyricIndex } from '../utils/timeUtils';

/**
 * 影片與歌詞同步的核心 Hook
 * @param {Array} lyricsData - 歌詞資料陣列
 * @param {Object} options - 選項配置
 * @param {boolean} options.autoScroll - 是否自動滾動到當前歌詞
 * @param {string} options.scrollContainerId - 歌詞容器的 ID
 * @returns {Object} 同步狀態和控制方法
 */
export const useVideoSync = (lyricsData = [], options = {}) => {
    const {
        autoScroll = true,
        scrollContainerId = 'lyrics-container',
        scrollOffset = 20,
    } = options;

    // 狀態
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFollowMode, setIsFollowMode] = useState(true);

    // 引用
    const playerRef = useRef(null);

    /**
     * 處理播放進度更新
     * @param {Object} progress - 進度物件，包含 playedSeconds
     */
    const handleProgress = useCallback((progress) => {
        const currentTime = progress.playedSeconds;
        const index = findCurrentLyricIndex(currentTime, lyricsData);

        if (index !== -1 && index !== currentIndex) {
            setCurrentIndex(index);

            // 自動滾動到當前歌詞
            if (autoScroll && isFollowMode) {
                const lyricElement = document.getElementById(`lyric-${index}`);
                const container = document.getElementById(scrollContainerId);

                if (lyricElement && container) {
                    const containerRect = container.getBoundingClientRect();
                    const lyricRect = lyricElement.getBoundingClientRect();
                    const scrollPosition = lyricRect.top - containerRect.top + container.scrollTop - scrollOffset;

                    container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                }
            }
        }
    }, [lyricsData, currentIndex, autoScroll, isFollowMode, scrollContainerId, scrollOffset]);

    /**
     * 跳轉到指定時間
     * @param {string} time - SRT 格式時間戳
     */
    const seekTo = useCallback((time) => {
        if (!isFollowMode) return;

        const seconds = convertTimeToSeconds(time);
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds);
            setIsPlaying(true);
        }
    }, [isFollowMode]);

    /**
     * 跳轉到上一句歌詞
     */
    const goToPrevious = useCallback(() => {
        if (currentIndex > 0 && lyricsData[currentIndex - 1]) {
            seekTo(lyricsData[currentIndex - 1].time);
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex, lyricsData, seekTo]);

    /**
     * 跳轉到下一句歌詞
     */
    const goToNext = useCallback(() => {
        if (currentIndex < lyricsData.length - 1 && lyricsData[currentIndex + 1]) {
            seekTo(lyricsData[currentIndex + 1].time);
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, lyricsData, seekTo]);

    /**
     * 切換跟播模式
     */
    const toggleFollowMode = useCallback(() => {
        setIsFollowMode(prev => !prev);
    }, []);

    /**
     * 切換播放/暫停
     */
    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    return {
        // 狀態
        currentIndex,
        isPlaying,
        isFollowMode,
        playerRef,

        // 控制方法
        handleProgress,
        seekTo,
        goToPrevious,
        goToNext,
        toggleFollowMode,
        togglePlay,
        setIsPlaying,
        setCurrentIndex,
    };
};

export default useVideoSync;
