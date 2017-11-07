import React from "react";


import Query from "./Search/Query";
import Results from "./Search/Results";

import helpers from "../utils/helpers";

import "./Search.css";

const Search  = (props) => ({
	getInitialState () {
		return {
			results: {}
		};
	},

	setQuery (newQuery, newStart, newEnd) {
		helpers.getArticles({}).then(function(data) {
			this.setState({ results: { docs: data.docs } });
		}.bind(this));
	},

	render () {
		// console.log("Render Results", this.state.results);

		return (
			<div className="main-container">
				{/*Set Query*/}
				<Query />
				{/*Pass results into component*/}
				<Results />
			</div>
		);
	}
});

export default Search;