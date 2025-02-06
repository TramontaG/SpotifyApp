# Spotify API App

## Overview

This is a simple application that provides an API for accessing your Spotify account. It allows you to interact with your Spotify data, such as your playlists, tracks, and more.

## Features

- _To be determined!_

## Getting Started

### Prerequisites

- A Spotify account
- A Spotify Developer account
- Basic understanding of RESTful APIs

### Configuration

#### Environment Variables

The app requires the following environment variables to be set in a `.env` file in the root of the project:

- `SPOTIFY_CLIENT_ID`: Your Spotify Client ID.
- `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret.
- `SPOTIFY_REDIRECT_URI`: Your Spotify Redirect URI.

#### Obtaining Credentials

1. **Create a Spotify Developer Account**:

   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login).
   - Log in with your Spotify account or create a new one.

2. **Create a New Application**:

   - Click on "Create App".
   - Fill in the required details and click "Create".

3. **Set Redirect URI**:

   - In the app dashboard, go to the "Settings" tab.
   - Add a Redirect URI (e.g., `http://localhost:3000/callback`).

4. **Get Client ID and Client Secret**:

   - After creating the app, you will be redirected to the app dashboard.
   - Copy the `Client ID` and `Client Secret` from the dashboard.

5. **Create a `.env` File**:
   - In the root of your project, create a file named `.env`.
   - Add the following lines to the `.env` file:

```sh
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REDIRECT_URI=your_redirect_uri_here
```

### Running

Run this as any other node.js api.

```sh
	git clone https://github.com/yourusername/spotify-api-app.git spotify-web-app
	cd spotify-api-app
	npm install
	npm run start
```
