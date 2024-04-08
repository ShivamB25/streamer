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

## API Documentation and Swagger UI

Streamer now supports OpenAPI documentation accessible via a Swagger UI. This feature makes it easier to understand and interact with the API's endpoints directly from your browser.

You can access the Swagger UI and the detailed API documentation at the `/api-docs` endpoint. This interactive documentation allows you to test API endpoints in real-time.

### Example Endpoints Usage

- **List Files**: `/list-files` - This endpoint lists all files and folders currently cached from Google Drive.
- **Download File**: `/download/:fileId` - Triggers an asynchronous download of a specified file by its ID from Google Drive.
- **Stream File**: `/stream/:fileId` - Streams a specified file in HLS format by its ID. Useful for efficiently streaming media content.

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

## Getting More Help

If you need further assistance or wish to contribute to the project, here are a few ways to get more help:

- **Source Code**: Visit our [GitHub repository](https://github.com/your-username/streamer) to access the complete source code.
- **Development Setup**: For setting up your development environment, refer to the 'Getting started' section in this README.
- **Reporting Issues or Contributions**: If you encounter any issues or would like to contribute new features or bug fixes, please create an issue or pull request on our GitHub repository.

We welcome contributions and feedback to make Streamer even better!

### License

Copyright (c) 2024.