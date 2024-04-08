import { google, drive_v3 } from 'googleapis';
import NodeCache from 'node-cache';
import { getDriveInstance } from '../auth/googleDriveAuth';

export const fetchFilesAndFolders = async (cache: NodeCache, quickCheck = false, sharedDriveId: string) => {
  const drive = getDriveInstance();
  try {
    let pageToken: string | null = null;
    do {
      const response: drive_v3.Response<drive_v3.Schema$FileList> = await drive.files.list({
        pageSize: quickCheck ? 10 : 100,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, parents)',
        q: `'${sharedDriveId}' in parents`,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        driveId: sharedDriveId,
        corpora: 'drive',
        pageToken: pageToken,
      });

      const files = response.data.files || [];
      pageToken = response.data.nextPageToken;

      if (files.length) {
        files.forEach((file: drive_v3.Schema$File) => {
          if (file.id) {
            cache.set(file.id, { id: file.id, name: file.name, mimeType: file.mimeType, modifiedTime: file.modifiedTime, parents: file.parents });
          }
        });
        console.log('Cache updated with latest files and folders from Google Drive');
      } else {
        console.log('No files found in Google Drive');
      }
    } while (pageToken);
  } catch (error) {
    console.error('The API returned an error: ', error instanceof Error ? error.message : 'An unknown error occurred', error instanceof Error ? error.stack : '');
  }
};