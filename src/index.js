/**
 * VideoFollow - 影片與歌詞同步組件庫
 * 
 * @description 將 YouTube 等影片與時間戳歌詞同步顯示的 React 組件
 * @author VideoFollow Contributors
 * @license MIT
 */

// 組件
export { default as VideoFollowPlayer } from './components/VideoFollowPlayer';
export { default as LyricsDisplay } from './components/LyricsDisplay';

// Hooks
export { useVideoSync } from './hooks/useVideoSync';

// 工具函數
export {
    convertTimeToSeconds,
    formatTime,
    findCurrentLyricIndex,
} from './utils/timeUtils';
