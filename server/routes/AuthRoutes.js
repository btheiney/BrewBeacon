const database = require("../database").pool;
const validator = require("validator");

const registerMember = async (request, response) => {
	const { email_address, full_name, password, confirm_password } = request.body;
	const timestamp = Math.floor(Date.now() / 1000);

	try {
		if (!validator.isEmail(email_address)) {
			response.status(400).json({
				success: false,
				error: "Invalid email-address. Please try again.",
			});
		}

		if (!(pasword === confirm_password)) {
			response.status(400).json({
				success: false,
				error: "Passwords do not match. Please try again.",
			});
		}

		const result = await database.query(
			"INSERT INTO members (email_address, full_name, password, timestamp) VALUES ($1, $2, $3, $4)",
			[email_address, full_name, password, timestamp]
		);
		response.status(200).json({ success: true, data: result.rows });
	} catch (error) {
		response
			.status(500)
			.json({ success: false, error: "An error has occured" });
	}
};

module.exports = {
	registerMember,
};
