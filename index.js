const express = require('express');

const app = express();

let currentUserGitlabAccessToken;
let currentUserGitlabId;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/token', (req, res) => {
	currentUserGitlabId = req.body.userId;
	currentUserGitlabAccessToken = req.body.gitlabAccessToken;
	res.status(200).send('Got the token');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server Listening...');
});
