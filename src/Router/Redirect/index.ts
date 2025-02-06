import axios from 'axios';
import { Router } from 'express';
import Context from 'src/Context';
import querystring from 'querystring';

const router = Router();

export type TokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: string;
	refresh_token: string;
};

router.get('/', async (req, res) => {
	try {
		const { state, code } = req.query;
		if (state !== Context.get('runId')) {
			return res.status(400).send('invalid state');
		}

		if (!code) {
			return res.status(400).send('no code');
		}

		const authString = `Basic ${Buffer.from(
			`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
		).toString('base64')}`;

		const { data } = await axios.post<TokenResponse>(
			'https://accounts.spotify.com/api/token',
			querystring.stringify({
				code: code as string,
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
				grant_type: 'authorization_code',
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: authString,
				},
			}
		);

		const { access_token, refresh_token } = data;

		return res.send({
			access_token,
			refresh_token,
		});
	} catch (e) {
		console.warn(e);
		return res.status(500).send(`${e}`);
	}
});

export default router;
