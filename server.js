//Server Dependencies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

//Scraping packages
const cheerio = require("cheerio");
const request = require("request");

//Set mongoose to leverage built in ES6 Promises
mongoose.Promise = Promise;

//Require models
var Article = require("./server/model");

// Configure body parser for AJAX requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }))
// Serve up static assets
app.use(express.static(process.cwd() + "client/public"));

//==========================================

//Connect to localhost if not a production environment
// if(process.env.NODE_ENV == 'production') {
// 	// Connect to the Mongo DB
// 	mongoose.connect("mongodb://heroku_1jb615xr:kef0guk1ib9iqbugsm8ukc40mc@ds249415.mlab.com:49415/heroku_1jb615xr");
// } else {
//For production
mongoose.connect('mongodb://localhost/news-scraper');
// }
var db = mongoose.connection;

//Log any mongoose errors
db.on("error", function(err) {
	console.log("Mongoose error: ", err);
})

//Once mongoose connects to the db, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful");
});

// //==============================================
// //ROUTES

// //Scrape the current NYT front page for articles.
// app.get("/scrape", function(req, res) {
// 	request("http://www.nytimes.com/pages/todayspaper/index.html", function(error, response, html) {
// 		var $ = cheerio.load(html);
// 		$("h3").each(function(i, element) {
// 			var result = {};

// 			result.title = $(this).children("a").text();
// 			result.link = $(this).children("a").attr("href");

// 			var entry = new Article(result);

// 			entry.save(function(err, doc) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log(doc);
// 				}
// 			});
// 		});
// 	});

// 	res.send("Scrape complete");
// });

// //Route to get all saved articles.
// app.get("/api/saved", function(req, res) {
// 	//Grab every document in the Articles array
// 	Article.find({}, function(err, data) {
// 		if (err) {
// 			console.log("Error getting saved articles: ", err);
// 		}
// 		else {
// 			// var resultData = [];
// 			// data.forEach(function (articles) {
// 			// 	resultData.push({
// 			// 		title: articles.title,
// 			// 		url: articles.url
// 			// 	});
// 			// });
// 			// res.send(data);
// 			res.json(data);
// 		}
// 	});
// });

// // //Route to add an article to the list of saved articles
// // app.post("/api/saved", function(req) {
// // 	var body = req.body;
// // 	var newArticle = {
// // 		title: body.title,
// // 		url: body.url,
// // 		date: body.date,
// // 		articleID: body.articleID

// // 	}	

// // 	var query = {articleID: body.articleID};

// // 	Article.findOneAndUpdate(query, newArticle, function (err) {
// // 		if (err) {
// // 			console.log(err);
// // 		} else {
// // 			console.log("Article saved successfully");
// // 		}
// // 	});
// // });

// //Route to delete an article from the list of saved articles
// app.delete("/api/saved/:articleID", function (req) {
// 	var articleID = req.params.articleID;
// 	Article.remove({articleID: articleID}, function(err) {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
// });

//Any non API routes will be directed to index.html
app.get("*", (req, res) => {
	res.sendFile(".././client/public/index.html");
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
