require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");
const taskRoutes = require("./routes/taskRoutes"); // import task routes

const app = express();

// Middleware
app.use(express.json()); // parse JSON bodies
app.use(cors()); // allow cross-origin requests

// Database connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB connected!"))
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err);
		process.exit(1); // optional: exit on fatal DB connection failure
	});

// Routes
app.use("/tasks", taskRoutes); // all /tasks routes

// Optional: Home route to avoid "Cannot GET /"
app.get("/", (req, res) => {
	res.send("Welcome to the Task Management API!");
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Server is running at http://localhost:${PORT}`);
});