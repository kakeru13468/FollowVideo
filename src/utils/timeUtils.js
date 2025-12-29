/**
 * 將 SRT 格式時間戳轉換為秒數
 * @param {string} timeString - 時間字串，格式：HH:MM:SS,mmm 或 HH:MM:SS
 * @returns {number} 總秒數
 * @example
 * convertTimeToSeconds("00:01:30,500") // returns 90.5
 * convertTimeToSeconds("00:01:30") // returns 90
 */
export const convertTimeToSeconds = (timeString) => {
    const parts = timeString.split(/[:,]/);
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    const milliseconds = parseInt(parts[3], 10) || 0;

    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
};

/**
 * 將秒數格式化為時間字串
 * @param {number} totalSeconds - 總秒數
 * @param {boolean} includeMs - 是否包含毫秒
 * @returns {string} 格式化的時間字串
 * @example
 * formatTime(90.5, true) // returns "00:01:30,500"
 * formatTime(90, false) // returns "00:01:30"
 */
export const formatTime = (totalSeconds, includeMs = false) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const ms = Math.round((totalSeconds % 1) * 1000);

    const pad = (num) => String(num).padStart(2, '0');

    if (includeMs) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${String(ms).padStart(3, '0')}`;
    }
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * 根據當前時間找到對應的歌詞索引
 * @param {number} currentTime - 當前播放時間（秒）
 * @param {Array} lyricsData - 歌詞資料陣列
 * @returns {number} 當前歌詞的索引，如果沒有匹配則返回 -1
 */
export const findCurrentLyricIndex = (currentTime, lyricsData) => {
    if (!lyricsData || lyricsData.length === 0) return -1;

    return lyricsData.findIndex((line, idx) => {
        const startTime = convertTimeToSeconds(line.time);
        const endTime = lyricsData[idx + 1]
            ? convertTimeToSeconds(lyricsData[idx + 1].time)
            : Infinity;
        return currentTime >= startTime && currentTime < endTime;
    });
};
