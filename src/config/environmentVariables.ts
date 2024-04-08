import dotenv from 'dotenv';

dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''; // INPUT_REQUIRED {Set your Google Client ID in your environment variables}
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''; // INPUT_REQUIRED {Set your Google Client Secret in your environment variables}
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || ''; // INPUT_REQUIRED {Set your Google Refresh Token in your environment variables}

console.log('Environment variables loaded.');