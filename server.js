const express = require("express");
const path = require("path");

const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "5876393f8f7643e39736bd28af7b03a7",
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const students = [];
const app = express();

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
	rollbar.info("HTML file served successfully!");
});

app.post("/api/student", (req, res) => {
	let { name } = req.body;
	name = name.trim();
	students.push(name);

	rollbar.log("Student added successfully", {
		author: "Jayme",
		type: "Manual entry",
	});
	res.status(200).send(students);
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => {
	console.log(`started on ${port}`);
});
