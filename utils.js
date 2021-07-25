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

module.exports = createError;
