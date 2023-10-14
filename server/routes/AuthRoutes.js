const database = require("../database").pool;
const validator = require("validator");
const bcrypt = require("bcrypt");

const loginMember = async (request, response) => {
	const { email, password } = request.body;

	const errors = [];

	// Input Validation
	if (!validator.isEmail(email)) {
		errors.push("Invalid email. Please try again.");
	}

	if (errors.length > 0) {
		return response.json({
			success: false,
			errors,
		});
	}

	try {
		// Hash the password
		const passwordHash = await bcrypt.hash(password, 10);

		// Insert member data into the database
		const result = await database.query(
			"SELECT password FROM members WHERE email = $1 LIMIT 1",
			[email]
		);

		// Verify that passwords match.
		if (result !== passwordHash) {
			errors.push("The username or password you entered is incorrect");
		}

		if (errors.length > 0) {
			return response.json({
				success: false,
				errors,
			});
		}

		return response.status(200).json({ success: true });
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "An error occurred while registering account.",
		});
	}
};

const isUsernameAvailable = async (username) => {
	try {
		const result = await database.query(
			"SELECT COUNT(*)::int FROM members WHERE lower(username) = lower($1)",
			[username]
		);

		return result.rows[0].count === 0;
	} catch (error) {
		throw new Error(
			"An error occurred while checking the username availability"
		);
	}
};

const isEmailAvailable = async (email) => {
	try {
		const result = await database.query(
			"SELECT COUNT(*)::int FROM members WHERE email = $1",
			[email]
		);

		return result.rows[0].count === 0;
	} catch (error) {
		throw new Error("An error occurred while checking the email availability");
	}
};

const registerMember = async (request, response) => {
	const { email, username, firstName, lastName, password, confirmPassword } =
		request.body;
	const errors = [];

	// Input Validation
	if (!validator.isEmail(email)) {
		errors.push("Invalid email. Please try again.");
	}

	if (!validator.isAlphanumeric(username) || username.length < 3) {
		errors.push(
			"Usernames must be at least 3 characters and may only contain numbers and letters."
		);
	}

	const emailAvailable = await isEmailAvailable(email);
	const usernameAvailable = await isUsernameAvailable(username);

	if (!emailAvailable) {
		errors.push("That email is already in use.");
	}

	if (!usernameAvailable) {
		errors.push("That username is already in use.");
	}

	if (password !== confirmPassword) {
		errors.push("Passwords do not match. Please try again.");
	}

	if (errors.length > 0) {
		return response.json({
			success: false,
			errors,
		});
	}

	try {
		// Hash the password
		const passwordHash = await bcrypt.hash(password, 10);
		const timestamp = Math.floor(Date.now() / 1000);

		// Insert member data into the database
		const result = await database.query(
			"INSERT INTO members (email, username, first_name, last_name, password, date_registered) VALUES ($1, $2, $3, $4, $5, $6)",
			[
				email.trim(),
				username.trim(),
				firstName.trim(),
				lastName.trim(),
				passwordHash,
				timestamp,
			]
		);

		return response.status(200).json({ success: true });
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "An error occurred while registering account. " + error.message,
		});
	}
};

module.exports = {
	loginMember,
	registerMember,
};
