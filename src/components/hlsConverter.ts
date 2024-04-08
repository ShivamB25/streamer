import ffmpeg from 'fluent-ffmpeg';

/**
 * Converts a media file to HLS format.
 * @param sourceFilePath The path to the source media file.
 * @param outputDir The directory where the HLS files (m3u8 playlist and ts segments) will be saved.
 * @returns A promise that resolves when conversion is complete or rejects with an error.
 */
export const convertToHLS = (sourceFilePath: string, outputDir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(`Starting conversion of ${sourceFilePath} to HLS format.`);
    ffmpeg(sourceFilePath)
      .outputOptions([
        '-profile:v baseline', // baseline profile (level 3.0) for compatibility
        '-level 3.0',
        '-start_number 0',     // start the first .ts segment at index 0
        '-hls_time 10',        // 10 second segment duration
        '-hls_list_size 0',    // Do not limit the playlist size (includes all segments)
        '-f hls'               // HLS format
      ])
      .output(`${outputDir}/playlist.m3u8`)
      .on('end', () => {
        console.log(`Media file ${sourceFilePath} has been converted to HLS format successfully.`);
        resolve();
      })
      .on('error', (err: Error) => {
        console.error('Error converting media file to HLS format:', err.message, err.stack);
        reject(err);
      })
      .run();
  });
};