import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({
	path: '.env',
});

import express from 'express';
import querystring from 'querystring';
import Context from 'src/Context';
import { TokenResponse } from '../Redirect';

const router = express.Router();

router.get('/link', (req, res) => {
	res.send(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: process.env.SPOTIFY_CLIENT_ID,
				scope: 'user-read-playback-state',
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
				state: Context.get('runId'),
			})
	);
});

router.get('/', (req, res) => {
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: process.env.SPOTIFY_CLIENT_ID,
				scope: 'user-read-playback-state',
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
				state: Context.get('runId'),
			})
	);
});

router.post('/refresh', express.json(), async (req, res) => {
	try {
		const { refresh_token } = req.body;

		if (!refresh_token) {
			return res.status(400).send('missing refresh token');
		}

		const authString = `Basic ${Buffer.from(
			`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
		).toString('base64')}`;

		const { data } = await axios.post<TokenResponse>(
			'https://accounts.spotify.com/api/token',
			querystring.stringify({
				grant_type: 'refresh_token',
				refresh_token,
				client_id: process.env.SPOTIFY_CLIENT_ID,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: authString,
				},
			}
		);

		return res.send(data);
	} catch (e) {
		console.warn(e);
		return res.status(500).send('Error: ' + e);
	}
});

export default router;
