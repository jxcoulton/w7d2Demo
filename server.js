const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "8743a46fe63242a1aa6cf28e86fc5130",
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const app = express();

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
	rollbar.info("HTML file served successfully!");
});

const port = process.env.PORT || 4545;

app.listen(port, () => {
	console.log(`started on ${port}`);
});
