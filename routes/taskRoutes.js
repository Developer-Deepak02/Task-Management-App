// routes/task.js

const express = require("express");
const router = express.Router();
const Task = require("../models/task"); // adjust the path if needed

// @route   GET /tasks
router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// @route   POST /tasks
router.post("/", async (req, res) => {
	try {
		const newTask = new Task(req.body);
		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// @route   PUT /tasks/:id
router.put("/:id", async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// @route   DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
	try {
		await Task.findByIdAndDelete(req.params.id);
		res.json({ message: "Task deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});



module.exports = router;
