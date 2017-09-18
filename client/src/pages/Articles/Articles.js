import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    title: "",
    date: "",
    url: ""
  };

  componentDidMount() {
  	this.loadArticles();
  }

  loadArticles = () => {
  	API.getArticles()
  	.then(res =>
  		this.setState({ articles: res.data, title: "", date: "", url: "" })
  	)
  	.catch(err => console.log(err));
  };