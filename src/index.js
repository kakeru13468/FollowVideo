/**
 * VideoFollow - 影片與歌詞同步核心功能
 * 
 * 提供 Hook 讓您輕鬆建立自訂的歌詞同步播放器
 * 
 * @example
 * import { useVideoSync } from 'video-follow';
 * import ReactPlayer from 'react-player';
 * 
 * function MyPlayer({ lyricsData }) {
 *   const { currentIndex, bindPlayer, seekToLyric } = useVideoSync(lyricsData);
 *   
 *   return (
 *     <div>
 *       <ReactPlayer url="..." {...bindPlayer} />
 *       {lyricsData.map((line, i) => (
 *         <p 
 *           key={i}
 *           style={{ color: i === currentIndex ? 'blue' : 'black' }}
 *           onClick={() => seekToLyric(i)}
 *         >
 *           {line.text}
 *         </p>
 *       ))}
 *     </div>
 *   );
 * }
 */

// 核心 Hook
export { useVideoSync } from './hooks/useVideoSync';
export { default } from './hooks/useVideoSync';
