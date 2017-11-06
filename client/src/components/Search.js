import React from "react";

var Query = require("./search/Query");
var Results = require("./search/Results");

var helpers = require("../utils/helpers");

var Search = React.createClass({
	getInitialState: function() {
		return {
			results: {}
		};
	},

	setQuery: function(newQuery, newStart, newEnd) {
		helpers.runQuery(newQuery, newStart, newEnd).then(function(data) {
			this.setState({ results: { docs: data.docs } });
		}.bind(this));
	},

	render: function() {
		console.log("Render Results", this.state.results);

		return (
			<div className="main-container">
				{/*Set Query*/}
				<Query updateSearch={this.setQuery} />
				{/*Pass results into component*/}
				<Results results={this.state.results} />
			</div>
		);
	}
});

module.exports = Search;