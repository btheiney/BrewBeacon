const database = require("../database").pool;

const getAuthenticatedMember = async (request, response) => {
	if (request.session.authenticated !== true || !request.session.memberID) {
		return response.json({
			success: false,
			error: "Member is not authenticated.",
		});
	}

	try {
		const result = await database.query(
			"SELECT id, email, username, first_name, last_name, date_registered FROM members WHERE id = $1",
			[request.session.memberID]
		);

		if (result.rows.length === 0) {
			return response.json({
				success: false,
				error: ["Member not found."],
			});
		}

		const member = result.rows[0];
		return response.json({ success: true, member });
	} catch (error) {
		return response.json({
			success: false,
			error: "An error occurred while collecting member information.",
		});
	}
};

module.exports = {
	getAuthenticatedMember,
};
