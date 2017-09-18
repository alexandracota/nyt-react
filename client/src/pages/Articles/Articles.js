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

  deleteArticle = id => {
  	API.deleteArticle(id)
  	.then(res => this.loadArticles())
  	.catch(err => console.log(err));
  };

  handleInputChange = event => {
  	const { name, value } = event.target;
  	this.setState({
  		[name]: value
  	});
  };
	 render() {
	 	return (
	 		<Container fluid>
				<Row>
					<Col size = 'md-12'>
						<Jumbotron>
							<h1>NYT React</h1>
						</Jumbotron>
						{this.state.articles.length ? (
							<List>
								{this.state.articles.map(article => {
									return (
										<ListItem key={article._id}>
											<a href={'/articles/' + article._id}>
												<strong>
													{article.title} at (article.url)
												</strong>
											</a>
											<DeleteBtn onClick={() => this.deleteArticle(article._id)} />
										</ListItem>
									);
								})}
							</List>
							) : (
								<h3>No Results to Display</h3>
							)}
					</Col>
				</Row>
			</Container> 		
	 	);
	 }
}

export default Articles;

