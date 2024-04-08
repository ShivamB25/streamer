# Streamer

Streamer is a microservice designed as a proxy layer for Google Drive, facilitating efficient indexing, downloading, caching, and streaming of files and folders to clients in real-time. It leverages HLS (HTTP Live Streaming) for media streaming, providing a custom API for enhanced access to Google Drive content.

## Overview

This project utilizes a combination of TypeScript, Node.js, and Express.js for the backend, with `fluent-ffmpeg` for media file conversion to HLS format. The architecture follows the MVC (Model-View-Controller) pattern, with an emphasis on clear separation of concerns for maintainability and scalability. The application integrates with the Google Drive API for content access and uses a custom in-memory caching solution for performance.

## Features

- **Indexing:** Automatic indexing of Google Drive files and folders, with continuous updates.
- **Downloading:** Asynchronous downloading of files for immediate or later use.
- **Streaming:** Media streaming through HLS, enabling efficient video and audio delivery.
- **Listing:** API endpoints to list all cached files and folders.
- **Caching:** In-memory storage of indexed data and content, with regular refreshes and consistency checks.

## Getting started

### Requirements

- Node.js installed on your system.
- TypeScript and ts-node for running TypeScript files directly.
- A Google Drive API key, client ID, and client secret for authentication.

### Quickstart

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install` in the project directory.
3. Set up environment variables for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` to allow Google Drive API authentication.
4. Run the service using `npm run start` or `nodemon` for development purposes.
5. Access the provided endpoints (`/list-files`, `/download/:fileId`, `/stream/:fileId`) to interact with the service.

### License

Copyright (c) 2024.