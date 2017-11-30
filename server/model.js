//Require mongoose
var mongoose = require("mongoose");

//Create a schema class
var Schema = mongoose.Schema;

//Create article schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	pub_date: {
		type: String,
		required: true
	}
});

//Create the Article model with Mongoose
var Article = mongoose.model("Article", ArticleSchema);
//Export the model
module.exports = Article;