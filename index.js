const express = require('express');
const axios = require('axios');

const app = express();

let currentUserGitlabAccessToken;
let currentUserGitlabId;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/projects/:id/repository_tree', async (req, res) => {
	const userId = req.header('userId');
	if (userId && userId === currentUserGitlabId) {
		try {
			const response = await axios.get(`https://gitlab.com/api/v4/projects/${req.params.id}/repository/tree`, {
				headers: {
					Authorization: `Bearer ${currentUserGitlabAccessToken}`
				}
			});
			res.status(200).send(response.data);
		} catch (err) {
			console.log(err);
			const message = { message: `${err.message} ${err.response.statusText}` };
			res.status(err.response.status).send(message);
		}
	} else {
		const message = { message: '400 Bad Request' };
		res.status(400).send(message);
	}
});

app.post('/token', (req, res) => {
	currentUserGitlabId = req.body.userId;
	currentUserGitlabAccessToken = req.body.gitlabAccessToken;
	res.status(200).send('Got the token');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server Listening...');
});
