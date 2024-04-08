import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.REDIRECT_URI}/oauth2callback`
);

// Generate a url that asks permissions for Google Drive scopes
const scopes = [
  'https://www.googleapis.com/auth/drive'
];

router.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
  console.log('Redirecting to Google OAuth2 consent page.');
  res.redirect(url);
});

router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    console.log('Successfully authenticated with Google Drive API.');
    // Store tokens securely for future use here
    fs.writeFileSync(path.join(__dirname, '../tokens.json'), JSON.stringify(tokens));
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Failed to authenticate with Google Drive API:', error);
    res.status(500).send('Authentication failed. Please check the server logs for more details.');
  }
});

export default router;