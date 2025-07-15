// routes/task.js

const express = require("express");
const router = express.Router();
const Task = require("../models/task"); 

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
router.post("/", async (req, res, next) => {
	try {
		const { title } = req.body;

		if (!title) {
			return res.status(400).json({ error: "Title is required" });
		}

		const task = new Task(req.body);
		const savedTask = await task.save();
		res.status(201).json(savedTask);
	} catch (err) {
		next(err);
	}
});

// Update a task
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    next(err); // pass to error middleware
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
