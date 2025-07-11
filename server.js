require("dotenv").config();
const mongooes = require("mongoose");
mongooes.connect(process.env.MONGO_URI).then(() => {
	console.log("database connected !!");
});
