import React from "react";

import helpers from "../utils/helpers";

import "./Saved.css";

const Saved = (props) => ({

	//Set the initial state of the Saved component to an empty string
	getInitialState: function() {
		return { 
			savedArticles: "" 
		};
	},

	componentDidMount: function() {
		helpers.getArticles().then(function(articleData) {
			this.setState({ savedArticles: articleData.data });
			console.log("saved results", articleData.data);
		}.bind(this));	
	},

	handleClick: function(item) {
		console.log("Clicked");
		console.log(item);

		//Delete the list
		helpers.deleteArticle(item.title, item.date, item.url).then(function() {
			
			//Get revised list
			helpers.getArticles().then(function(articleData) {
				this.setState({ savedArticles: articleData.data });
				console.log("saved results", articleData.data);
			}.bind(this));
		}.bind(this));
	},

	//This is a helper method for rendering the HTML when we have no saved articles
	renderEmpty: function() {
		return (
			<li className="list-group-item">
				<h3>
					<span>
						<em>Save your first article</em>
					</span>
				</h3>
			</li>
		);
	},

//This is a helper method for mapping through our articles and outputting HTML
renderArticles: function() {
	return this.state.savedArticles.map(function(article, index) {

		return (
			<div key={index}>
				<li className="list-group-item">
					<h3>
						<span>
							<em>{article.title}</em>
						</span>
						<span className="btn-group pull-right">
							<a href={article.url} rel="noopener noreferrer" target="blank">
								<button className="btn btn-default">View Article</button>
							</a>
							<button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button>
						</span>
					</h3>
					<p>Date published: {article.date}</p>
				</li>
			</div>
			);
	}.bind(this));
},

//This is a helper method for rendering a container and all of our articles inside
renderContainer: function() {
	return (
		<div className="main-container">
			<div className="row">
				<div className="col-md-12">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h1 className="panel-title">
								Saved Articles
							</h1>
						</div>
						<div className="panel-body">
							<ul className="list-group">
								{this.renderArticles()}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	},

	render () {
		//if there are no articles, return this.renderEmpty()
		if (!this.state.savedArticles) {
			return this.renderEmpty();
		}
		return this.renderContainer();
	}

});

export default Saved;