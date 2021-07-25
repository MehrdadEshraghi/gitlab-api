const express = require('express');
const gitlabRoutes = require('./routes/gitlabRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(gitlabRoutes);

app.listen(process.env.PORT || 3000, () => {
	console.log('Server Listening...');
});
