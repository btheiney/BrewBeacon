// application requirements.
require("dotenv").config();
const express = require("express"),
	session = require("express-session"),
	database = require("./database").pool,
	pgSession = require("express-pg-session")(session);

const cors = require("cors");
const app = express();

// application configuration.
app.use(
	session({
		secret: require("crypto").randomBytes(48).toString("hex"),
		resave: false,
		cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
		saveUninitialized: false,
		httpOnly: true,
		store: new pgSession({
			pool: database,
			tableName: process.env.SESSION_TABLE_NAME,
		}),
	}),
	express.json(),
	express.urlencoded({ extended: true }),
	cors({
		origin: "http://127.0.0.1:3000",
		methods: ["GET", "POST"],
	})
);

app.disable("x-powered-by");

// Authentication Routes
const auth = require("./routes/AuthRoutes");
app.post("/api/auth/register", auth.registerMember);
app.post("/api/auth/login", auth.loginMember);

// Member Data Routes
const member = require("./routes/MemberRoutes");
app.get(
	"/api/members/current",
	auth.checkSession,
	member.getAuthenticatedMember
);

app.listen(3000, () => console.log("listening at http://localhost:" + 3000));
