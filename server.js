//Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3002;

// Configure body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }))
// Serve up static assets
app.use(express.static(process.cwd() + "client/public"));

//==========================================

//Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production') {
	// Connect to the Mongo DB
	mongoose.connect("mongodb://heroku_1jb615xr:kef0guk1ib9iqbugsm8ukc40mc@ds249415.mlab.com:49415/heroku_1jb615xr");
} else {
	mongoose.connect('mongodb://localhost/news-scraper');
}
var db = mongoose.connection;

//Log any mongoose errors
db.on("error", function(err) {
	console.log("Mongoose error: ", err);
})

//Once mongoose connects to the db, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful");
});

//Require schemas
const Article = require("./server/model");

//==========================================
app.get("/", function(req, res) {
	res.redirect("/api/saved");
});

//Route to get all saved articles.
app.get("/api/saved", function(req, res) {
	Article.find({})
	.exec(function(err, doc) {
		if (err) {
			console.log("Error getting saved articles: ", err);
		}
		else {
			res.send(doc);
		}
	});
});

//Route to add an article to the list of saved articles
app.post("/api/saved", function(req,res) {
	var newArticle = new Article(req.body);
	console.log(req.body);
	newArticle.save(function(err, doc) {
		if (err) {
			console.log("Error adding article: ", err);
		}
		else {
			res.send(doc);
		}
	});
});

//Route to delete an article from the list of saved articles
app.delete("/api/delete", function (req, res) {
	var url = req.param("url");
	Article.find({ url: url }).remove().exec(function(err) {
		if (err) {
			console.log("Error deleting article: ", err);
		}
		else {
			res.send("Article deleted.");
		}
	});
});

//Any non API routes will be directed to our React App and handled by React router
app.get("*", function(req, res) {
	res.sendFile(__dirname + "/client/public");
});

//==============================================

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
