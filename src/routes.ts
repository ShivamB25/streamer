import express from 'express';
import asyncHandler from 'express-async-handler';
import { downloadFile, getFileFromCache } from './components/downloader';
import { getCache } from './components/cacheManager';
import { convertToHLS } from './components/hlsConverter';
import fs from 'fs';
import path from 'path';

const router = express.Router();

/**
 * @swagger
 * /list-files:
 *   get:
 *     summary: Lists all files and folders in the cache.
 *     responses:
 *       200:
 *         description: An array of files and folders.
 *       500:
 *         description: Error message.
 */
router.get('/list-files', asyncHandler(async (req, res) => {
    const cache = getCache();
    const allKeys = cache.keys();
    const filesAndFolders = allKeys.map(key => cache.get(key));
    console.log('Listing all files and folders from the cache.');
    res.json(filesAndFolders);
}));

/**
 * @swagger
 * /download/{fileId}:
 *   get:
 *     summary: Triggers the asynchronous download of a file by ID.
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to download.
 *     responses:
 *       200:
 *         description: Download initiation message.
 *       400:
 *         description: File ID is required message.
 *       500:
 *         description: Error message.
 */
router.get('/download/:fileId', asyncHandler(async (req, res, next) => {
    const { fileId } = req.params;
    if (!fileId) {
        console.error('File ID is required for download.');
        return res.status(400).send('File ID is required');
    }
    try {
        await downloadFile(fileId);
        console.log(`Download of file ${fileId} initiated.`);
        res.send(`Download of file ${fileId} initiated.`);
    } catch (error: any) {
        console.error('Error downloading file:', (error as Error).message, (error as Error).stack);
        res.status(500).send('Error initiating file download.');
    }
}));

/**
 * @swagger
 * /stream/{fileId}:
 *   get:
 *     summary: Streams a file in HLS format by ID.
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to stream.
 *     responses:
 *       200:
 *         description: HLS file stream.
 *       404:
 *         description: File not found in cache message.
 *       500:
 *         description: Error message.
 */
router.get('/stream/:fileId', asyncHandler(async (req, res) => {
    const { fileId } = req.params;
    const fileData = getFileFromCache(fileId);
    if (!fileData) {
        console.error('File not found in cache for streaming.');
        return res.status(404).send('File not found in cache');
    }
    const filePath = path.join(__dirname, '../downloads', fileId); // INPUT_REQUIRED {Ensure this path matches your download directory structure}
    const outputPath = path.join(__dirname, '../hls', fileId); // INPUT_REQUIRED {Ensure this path matches your HLS output directory structure}

    try {
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
            await convertToHLS(filePath, outputPath);
        }
        console.log(`Streaming file ${fileId} in HLS format.`);
        res.sendFile(path.join(outputPath, 'playlist.m3u8'));
    } catch (error) {
        console.error('Error streaming file in HLS format:', error.message, error.stack);
        res.status(500).send('Error streaming file.');
    }
}));

export default router;