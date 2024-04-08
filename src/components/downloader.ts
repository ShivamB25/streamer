import { getDriveInstance } from '../auth/googleDriveAuth';
import fs from 'fs';
import { google } from 'googleapis';
import NodeCache from 'node-cache';
import stream from 'stream';
import { promisify } from 'util';

const cache = new NodeCache();
const finished = promisify(stream.finished);

export const downloadFile = async (fileId: string): Promise<void> => {
    const drive = getDriveInstance();
    const destPath = `./downloads/${fileId}`;
    const dest = fs.createWriteStream(destPath);

    try {
        const response = await drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' });
        response.data
            .on('end', () => {
                console.log(`Downloaded file ${fileId} successfully.`);
                cacheFileData(fileId, destPath);
            })
            .on('error', err => {
                console.error('Error downloading file:', err);
                throw new Error(`Error downloading file ${fileId}: ${err}`);
            })
            .pipe(dest);

        await finished(dest); // Wait until the download is finished.
    } catch (error) {
        console.error(`Failed to download file ${fileId}:`, (error as Error).message, (error as Error).stack);
        throw error;
    }
};

const cacheFileData = (fileId: string, filePath: string) => {
    // Assuming file metadata is already available or fetch here if needed.
    // For simplicity, we're directly caching with a placeholder object.
    const fileData = { id: fileId, name: `Downloaded_File_${fileId}`, mimeType: 'application/octet-stream', modifiedTime: new Date().toISOString(), path: filePath };
    cache.set(fileId, fileData);
    console.log(`Cached file data for ${fileId}`);
};

export const getFileFromCache = (fileId: string) => {
    return cache.get(fileId);
};