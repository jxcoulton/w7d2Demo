const express = require("express");
const path = require("path");

const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "5876393f8f7643e39736bd28af7b03a7",
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
