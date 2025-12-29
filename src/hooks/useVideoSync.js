import { useState, useRef, useCallback } from 'react';
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
    // 使用 ref 來追蹤最新的 isFollowMode 值，避免閉包問題
    const isFollowModeRef = useRef(isFollowMode);
    isFollowModeRef.current = isFollowMode;

    /**
     * 處理播放進度更新
     * @param {Object} progress - 進度物件，包含 playedSeconds
     */
    const handleProgress = useCallback((progress) => {
        const currentTime = progress.playedSeconds;
        const index = findCurrentLyricIndex(currentTime, lyricsData);

        if (index !== -1) {
            setCurrentIndex(prevIndex => {
                if (index !== prevIndex) {
                    // 自動滾動到當前歌詞
                    if (autoScroll && isFollowModeRef.current) {
                        const lyricElement = document.getElementById(`lyric-${index}`);
                        const container = document.getElementById(scrollContainerId);

                        if (lyricElement && container) {
                            const containerRect = container.getBoundingClientRect();
                            const lyricRect = lyricElement.getBoundingClientRect();
                            const scrollPosition = lyricRect.top - containerRect.top + container.scrollTop - scrollOffset;

                            container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                        }
                    }
                    return index;
                }
                return prevIndex;
            });
        }
    }, [lyricsData, autoScroll, scrollContainerId, scrollOffset]);

    /**
     * 跳轉到指定時間
     * @param {string} time - SRT 格式時間戳
     */
    const seekTo = useCallback((time) => {
        // 使用 ref 來獲取最新的值
        if (!isFollowModeRef.current) return;

        const seconds = convertTimeToSeconds(time);
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds);
            setIsPlaying(true);
        }
    }, []);

    /**
     * 跳轉到上一句歌詞
     */
    const goToPrevious = useCallback(() => {
        setCurrentIndex(prevIndex => {
            if (prevIndex > 0 && lyricsData[prevIndex - 1]) {
                const seconds = convertTimeToSeconds(lyricsData[prevIndex - 1].time);
                if (playerRef.current?.seekTo) {
                    playerRef.current.seekTo(seconds);
                    setIsPlaying(true);
                }
                return prevIndex - 1;
            }
            return prevIndex;
        });
    }, [lyricsData]);

    /**
     * 跳轉到下一句歌詞
     */
    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => {
            if (prevIndex < lyricsData.length - 1 && lyricsData[prevIndex + 1]) {
                const seconds = convertTimeToSeconds(lyricsData[prevIndex + 1].time);
                if (playerRef.current?.seekTo) {
                    playerRef.current.seekTo(seconds);
                    setIsPlaying(true);
                }
                return prevIndex + 1;
            }
            return prevIndex;
        });
    }, [lyricsData]);

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
