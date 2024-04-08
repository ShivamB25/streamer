import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Ensure this is set in your .env file
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; // Ensure this is set in your .env file
const REDIRECT_URI = 'http://localhost:3000/auth/callback'; // Adjust this to match your application's redirect endpoint

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Route to initiate the OAuth2 flow
router.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive'],
    prompt: 'consent',
  });
  res.redirect(url);
});

// Callback route to handle the response from Google's OAuth 2.0 server.
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    console.error('Error during authentication: No code received');
    return res.status(400).send('Authentication failed: No code received.');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    console.log('Successfully authenticated with Google Drive API');

    // In a real application, securely store the tokens and refresh them when necessary
    // For demonstration purposes, we're printing the tokens to the console
    console.log('Tokens:', tokens);

    res.send('Authentication successful! You can close this window.');
  } catch (error: any) {
    console.error('Failed to exchange code for tokens:', error.stack);
    res.status(500).send('Authentication failed.');
  }
});

export default router;