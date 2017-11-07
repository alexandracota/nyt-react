import React from "react";

var helpers = require("../../utils/helpers");

var Results = React.createClass({

	//Save states for the contents saved
	getInitialState: function() {
		return {
			title: "",
			url: "",
			pubdate: ""
		};
	},

	//Sends search terms to parent Search component
	handleClick: function(item) {
		console.log(item);

		helpers.postSaved(item.headline.main, item.pub_date, item.web_url).then(function() {
			console.log(item.web_url);
		});
	},

	//Maps through articles and outputs HTML
	renderArticles: function() {
		return this.props.results.docs.map(function(article, index) {

			return (
				<div key={index}>
					<li className="list-group-item">
						<h3>
							<span>
								<em>{article.headline.main}</em>
							</span>
							<span className="btn-group pull-right">
								<a href={article.web_url} rel="noopener noreferrer" target="_blank">
									<button className="btn btn-default">View Article</button>
								</a>
								<button className="btn btn-primary" onClick={() => this.handleClick(article)}>Save</button>
							</span>
						</h3>
						<p>Date Published: {article.pub_date}</p>
					</li>
				</div>
			);

		}.bind(this));
	},

	renderContainer: function() {
		return (
			<div className="main-container">
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<div className="panel-title">
									<h1>Results</h1>
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
			</div>
		);
	},

	render: function() {
		if (!this.props.results.docs) {
			return (
				<li className="list-group-item">
					<h3>
						<span>
							<em> Enter search terms to start</em>
						</span>
					</h3>
				</li>
			);
		}
		//If there 
		return this.renderContainer();
	}
});

export default Results;
