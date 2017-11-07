import React from "react";
import axios from "axios";

var helpers = {
  // This route gets all of the articles
  getArticles: function() {
    return axios.get("/api/articles");
  }
  // },
  // // Gets the book with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // // Deletes the book with the given id
  // deleteArticle: function(id) {
  //   return axios.delete("/api/articles/" + id);
  // },
  // // Saves a book to the database
  // saveArticle: function(articleData) {
  //   return axios.post("/api/articles", articleData);
  // }
};

//Export helpers to be used in Saved.js and Search.js
export default helpers;