import express from 'express';
import router from './Router/index';

const app = express();
const port = 6897;

app.use('/', router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
