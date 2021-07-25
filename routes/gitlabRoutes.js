const express = require('express');
const gitlabController = require('../controllers/gitlabController');

const router = express.Router();

router.get('/projects/:id/repository_tree', gitlabController.gitlab_repository);

router.post('/token', gitlabController.gitlab_token);

module.exports = router;
