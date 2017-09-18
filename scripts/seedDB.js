const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nyt-react",
  {
    useMongoClient: true
  }
);

const articleSeed = [
	{
		title: "UCB Coding Bootcampers are the best",
		author: "Alex Cota",
		url: "https://www.google.com/",
		date: new Date(Date.now())
	}
]

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });