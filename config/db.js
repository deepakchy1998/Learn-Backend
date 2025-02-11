const mongoose = require("mongoose");

const connection = mongoose
	.connect("mongodb://0.0.0.0/learn-backend")
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => {
		console.log("Error connecting to database:", error);
	});

// module.exports.connection;
module.exports = connection;
