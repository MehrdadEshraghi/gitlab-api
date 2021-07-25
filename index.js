const express = require('express');
const axios = require('axios');

const app = express();

let currentUserGitlabAccessToken;
let currentUserGitlabId;

app.use(express.urlencoded({ extended: true }));

const createError = (code, str) => {
	const message = {};
	if (str) {
		message.message = str;
		message.statusCode = code;
		return message;
	}
	const baseStr = 'Request failed with status code ';
	switch (code) {
		case 400:
			message.message = baseStr + '400 Bad Request';
			break;
		case 401:
			message.message = baseStr + '401 Unauthorized';
			break;
	}
	message.statusCode = code;
	return message;
};

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/projects/:id/repository_tree', async (req, res) => {
	const userId = req.header('userId');
	if (userId && userId === currentUserGitlabId)
		try {
			const response = await axios.get(`https://gitlab.com/api/v4/projects/${req.params.id}/repository/tree`, {
				headers: {
					Authorization: `Bearer ${currentUserGitlabAccessToken}`
				}
			});
			res.status(200).send(response.data);
		} catch (err) {
			res
				.status(err.response.status)
				.send(createError(err.response.status, `${err.message} ${err.response.statusText}`));
		}
	else res.status(400).send(createError(400));
});

app.post('/token', (req, res) => {
	if (req.body.userId && req.body.gitlabAccessToken) {
		currentUserGitlabId = req.body.userId;
		currentUserGitlabAccessToken = req.body.gitlabAccessToken;
		res.status(200).send('Got the token');
	} else res.status(400).send(createError(400));
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server Listening...');
});
