import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
// INPUT_REQUIRED {Set your Google Client ID in your environment variables}
config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
// INPUT_REQUIRED {Set your Google Client Secret in your environment variables}
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; 
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // This is a common redirect URI used for Google OAuth2 playground; adjust as needed
// INPUT_REQUIRED {Set your Google Refresh Token in your environment variables}
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN; 

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

if (!REFRESH_TOKEN) {
  console.error('No refresh token set. Please set the GOOGLE_REFRESH_TOKEN environment variable.');
} else {
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      console.log('Refresh token updated');
      // Here you should update your stored refresh token with tokens.refresh_token
      // and possibly update other credentials related to your OAuth2 client
    }
    console.log('Access token updated');
  });

  oauth2Client.getAccessToken().then(() => {
    console.log('Successfully authenticated with Google Drive API');
  }).catch((error) => {
    console.error('Failed to authenticate with Google Drive API:', error.message, error.stack);
  });
}

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export const getDriveInstance = (): typeof drive => {
  console.log('Getting authenticated Google Drive instance');
  return drive;
};