const mongooes = require("mongoose");
// Define a schema
const taskSchema = new mongooes.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
	},
	compleated: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Create a model from the schema
const Task = mongooes.model("Task", taskSchema);

// Export the model
module.exports = Task;