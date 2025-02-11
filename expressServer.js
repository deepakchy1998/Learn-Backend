const express = require("express");
const morgan = require("morgan"); // Import the Morgan module. It is a logger middleware that logs request details in the console for debugging purposes. It is a third-party middleware, not a part of the Express module.

const app = express();
const userModel = require("./models/user");
const dbConnection = require("./config/db");

app.use(morgan("dev")); // Use Morgan middleware to log request details in the console.

app.use(express.json()); // Use express.json() middleware to parse incoming requests with JSON payloads. It is a built-in middleware that stores the parsed data in req.body, mainly used for handling POST requests with JSON data.

app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() middleware to parse incoming requests with URL-encoded payloads. It is a built-in middleware that stores the parsed data in req.body, mainly used for handling form submissions.

app.use(express.static("public")); // Use express.static() middleware to serve static files such as images, CSS files, and JavaScript files from the "public" folder.

app.set("view engine", "ejs"); // Set the view engine to EJS.

app.get(
	"/",
	(req, res, next) => {
		let a = 20;
		let b = 30;
		let c = a + b;
		console.log(`The sum of the given numbers is: ${c}`);
		next(); // Pass control to the next middleware function.
	},
	(req, res) => {
		res.render("index", { title: "Home" }); // Render the index.ejs file.
	}
);

app.get("/about", (req, res) => {
	res.send("This is the about page.");
});

app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		const newUser = await userModel.create({
			userName,
			email,
			password,
		});

		res.send(`User registered successfully: ${newUser}`);
	} catch (error) {
		res.status(500).send("Error registering user");
	}
});

// Performing Read operation...

app.get("/get-user", async (req, res) => {
	try {
		const users = await userModel.find();
		res.send(users);
	} catch (error) {
		res.status(500).send("Error fetching users");
	}
});

// Performing Update operation...

app.get("/update-user", async (req, res) => {
	try {
		await userModel.findOneAndUpdate(
			{ userName: "deepak" },
			{ email: "deep@123.com" }
		);
		res.send("User Updated!");
	} catch (err) {
		res.status(500).send(`User not updated: ${err}`);
	}
});

// Performing delete operation.

app.get("/delete-user", async (req, res) => {
	await userModel.findOneAndDelete({
		email: "deepakkumarchy1998@gmail.com",
	});
	res.send("User Deleted!");
});

app.post("/get-form-data", (req, res) => {
	console.log(req.body);
	res.send("Data received successfully.");
});

app.listen(3000, () => {
	console.log(`Server is running at: http://localhost:3000`);
});
