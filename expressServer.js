const express = require("express");
const app = express();

app.set("view engine", "ejs"); // set the view engine to ejs

app.get("/", (req, res) => {
	res.send("Hello World");
});
app.get("/about", (req, res) => {
	res.send("About Page");
});

app.listen(3000, () => {
	console.log(`Server is running on port no: http://localhost:3000`);
});
