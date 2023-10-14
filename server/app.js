const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

const corsOptions = {
	origin: "http://127.0.0.1:3000",
	methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const auth = require("./routes/AuthRoutes");
app.post("/api/auth/register", auth.registerMember);
app.post("/api/auth/login", auth.loginMember);

app.listen(3000, () => console.log("listening at http://localhost:" + 3000));
