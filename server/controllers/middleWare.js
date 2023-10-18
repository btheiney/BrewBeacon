const database = require("../database").pool;

const checkSession = async (request, response, next) => {
	if (request.session.authenticated === true && request.session.memberID) {
		next();
	} else {
		response.json("not logged in.");
	}
};

module.exports = {
	checkSession,
};
