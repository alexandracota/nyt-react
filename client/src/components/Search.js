import React from "react";

var Query = require("./Search/Query");
var Results = require("./Search/Results");

var helpers = require("../utils/helpers");

const Search  = (props) => ({
	getInitialState: function() {
		return {
			results: {}
		};
	},

	setQuery (newQuery, newStart, newEnd) {
		helpers.runQuery(newQuery, newStart, newEnd).then(function(data) {
			this.setState({ results: { docs: data.docs } });
		}.bind(this));
	},

	render () {
		// console.log("Render Results", this.state.results);

		return (
			<div className="main-container">
				{/*Set Query*
				<Query updateSearch={this.setQuery} />
				*Pass results into component*
				<Results results={this.state.results} />
				*/}
			</div>
		);
	}
});

export default Search;