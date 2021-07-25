const express = require('express');

const app = express();

app.post('/token', (req, res) => {
	console.log(req.body);
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server Listening...');
});
