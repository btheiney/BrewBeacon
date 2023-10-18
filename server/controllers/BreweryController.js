const database = require("../database").pool;

const checkIn = async (request, response) => {
	const { breweryID } = request.body;

	try {
		const timestamp = Math.floor(Date.now() / 1000);

		// Insert member data into the database
		const result = await database.query(
			"INSERT INTO brewery_checkins (brewery_id, member_id, date) VALUES ($1, $2, $3)",
			[breweryID, request.session.memberID, timestamp]
		);

		return response.status(200).json({ success: true });
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "An error occurred while attempting to check into brewery.",
		});
	}
};

const getCheckinCount = async (request, response) => {
	try {
		const breweryID = request.params.brewery_id;
		const timestamp = Math.floor(Date.now() / 1000);

		const result = await database.query(
			"SELECT COUNT(*) FROM brewery_checkins WHERE brewery_id = $1",
			[breweryID]
		);

		return response.status(200).json(result.rows[0].count);
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "An error occurred while contacting the database.",
		});
	}
};

module.exports = {
	checkIn,
	getCheckinCount,
};
