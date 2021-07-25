const express = require('express');
const axios = require('axios');
const createError = require('../utils');

const router = express.Router();

let currentUserGitlabAccessToken;
let currentUserGitlabId;

router.get('/projects/:id/repository_tree', async (req, res) => {
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

router.post('/token', (req, res) => {
	if (req.body.userId && req.body.gitlabAccessToken) {
		currentUserGitlabId = req.body.userId;
		currentUserGitlabAccessToken = req.body.gitlabAccessToken;
		res.status(200).send('Got the token');
	} else res.status(400).send(createError(400));
});

module.exports = router;
