var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String
	},
	date: {
		type: Date
	},
	url: {
		type: String
	}
});

//Create the Article model with Mongoose
var Article = mongoose.model("Article", ArticleSchema);
//Export the model
module.exports = Article;