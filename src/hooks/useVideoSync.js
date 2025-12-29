import { useState, useRef, useCallback } from 'react';

/**
 * 將 SRT 格式時間戳轉換為秒數
 * @param {string} timeString - 時間字串，格式：HH:MM:SS,mmm 或 HH:MM:SS
 * @returns {number} 總秒數
 */
const convertTimeToSeconds = (timeString) => {
    const parts = timeString.split(/[:,]/);
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    const milliseconds = parseInt(parts[3], 10) || 0;

    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
};

/**
 * 根據當前時間找到對應的歌詞索引
 * @param {number} currentTime - 當前播放時間（秒）
 * @param {Array} lyricsData - 歌詞資料陣列
 * @returns {number} 當前歌詞的索引
 */
const findCurrentLyricIndex = (currentTime, lyricsData) => {
    if (!lyricsData || lyricsData.length === 0) return -1;

    return lyricsData.findIndex((line, idx) => {
        const startTime = convertTimeToSeconds(line.time);
        const endTime = lyricsData[idx + 1]
            ? convertTimeToSeconds(lyricsData[idx + 1].time)
            : Infinity;
        return currentTime >= startTime && currentTime < endTime;
    });
};

/**
 * 影片與歌詞同步的核心 Hook
 * 
 * @param {Array} lyricsData - 歌詞資料陣列 [{ time: "HH:MM:SS,mmm", text: "歌詞" }]
 * @returns {Object} 同步狀態和控制方法
 * 
 * @example
 * const { currentIndex, bindPlayer, seekToLyric } = useVideoSync(lyricsData);
 * 
 * <ReactPlayer
 *   ref={bindPlayer.ref}
 *   onProgress={bindPlayer.onProgress}
 *   playing={bindPlayer.playing}
 *   onPlay={bindPlayer.onPlay}
 *   onPause={bindPlayer.onPause}
 * />
 * 
 * {lyricsData.map((line, index) => (
 *   <div 
 *     key={index}
 *     className={index === currentIndex ? 'active' : ''}
 *     onClick={() => seekToLyric(index)}
 *   >
 *     {line.text}
 *   </div>
 * ))}
 */
export const useVideoSync = (lyricsData = []) => {
    // 狀態
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    // 引用
    const playerRef = useRef(null);

    /**
     * 處理播放進度更新
     */
    const handleProgress = useCallback((progress) => {
        const currentTime = progress.playedSeconds;
        const index = findCurrentLyricIndex(currentTime, lyricsData);

        if (index !== -1 && index !== currentIndex) {
            setCurrentIndex(index);
        }
    }, [lyricsData, currentIndex]);

    /**
     * 跳轉到指定歌詞
     * @param {number} index - 歌詞索引
     */
    const seekToLyric = useCallback((index) => {
        if (index < 0 || index >= lyricsData.length) return;

        const time = lyricsData[index].time;
        const seconds = convertTimeToSeconds(time);

        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds);
            setIsPlaying(true);
            setCurrentIndex(index);
        }
    }, [lyricsData]);

    /**
     * 跳轉到指定時間
     * @param {string} time - SRT 格式時間戳
     */
    const seekToTime = useCallback((time) => {
        const seconds = convertTimeToSeconds(time);
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(seconds);
            setIsPlaying(true);
        }
    }, []);

    /**
     * 上一句歌詞
     */
    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            seekToLyric(currentIndex - 1);
        }
    }, [currentIndex, seekToLyric]);

    /**
     * 下一句歌詞
     */
    const goToNext = useCallback(() => {
        if (currentIndex < lyricsData.length - 1) {
            seekToLyric(currentIndex + 1);
        }
    }, [currentIndex, lyricsData.length, seekToLyric]);

    /**
     * 切換播放/暫停
     */
    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    /**
     * 播放
     */
    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    /**
     * 暫停
     */
    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    // 綁定到播放器的屬性
    const bindPlayer = {
        ref: playerRef,
        playing: isPlaying,
        onProgress: handleProgress,
        onPlay: () => setIsPlaying(true),
        onPause: () => setIsPlaying(false),
    };

    return {
        // 狀態
        currentIndex,
        isPlaying,
        currentLyric: lyricsData[currentIndex] || null,

        // 播放器綁定（方便整合 ReactPlayer）
        bindPlayer,

        // 控制方法
        seekToLyric,
        seekToTime,
        goToPrevious,
        goToNext,
        togglePlay,
        play,
        pause,

        // 進階控制
        playerRef,
        setCurrentIndex,
        setIsPlaying,
    };
};

export default useVideoSync;
