import React from "react";
import Axios from "axios";
import "./Main.css";

var Main = React.createClass({

	render() {

		return (
			<div className="main-container">
				<div className="container">
					<nav className="navbar navbar-default" role="navigation">
						<div className="container-fluid">
							<div className="navbar-header">
									<a className = "searchsave" href="/search">Search</a>
									<a className = "searchsave" href="/saved">Saved Articles</a>
							</div>
						</div>
					</nav>

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Scraper</h2>
						<h3 className="text-center">Search for and save your favorite articles.</h3>
					</div>

					{this.props.children}

					<footer>
						<hr />
						<p className="pull-right">
							Built using React.js
						</p>
					</footer>

				</div>
			</div>
			);

	}

});

export default Main;