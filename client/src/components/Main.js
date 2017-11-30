//This component is referenced in src/App.js
import Axios from "axios";
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Article from './Article';
import Saved from './Saved';

import React from "react";
import { BrowserRouter as Router, Link, Route }
import { Button } from 'reactstrap';

const Style = {
	paddingLeft: '10%',
	paddingRight: '10%',
	paddingTop: '10%'
}

export default class Main extends React.component {
	//Set the initial state with a constructor function
	constructor(props) {
		super(props);
		this.state = {
			topic: ' ',
			start_date:' ',
			end_date: ' ',
			articles: [],
			savedData: [],
		}
		this.handleTopic = this.handleTopic.bind(this);
		this.handleStartYear = this.handleStartYear.bind(this);
		this.handleEndYear = this.handleEndYear.bind(this);
		this.getData = this.getData.bind(this);
		this.saveArticle = this.saveArticle.bind(this);
		this.update = this.update.bind(this);
		this.deleteArticle = this.update.bind(this);
	}

	//Function to execute before rendering
	componentWillMount() {
		axios({
			method: 'get',
			baseURL: '/api',
		}).then(response => {
			this.setState({
				savedData: response.data
			})
		})
	}
	//Functions to target each user input and set the new states of the values
	handleTopic(e){
		this.setState({
			topic: e.target.value
		})
	}
	handleStartYear(e){
		this.setState({
			start_date: e.target.value
		})
	}
	handleEndYear(e){
		this.setState({
			end_date: e.target.value
		})
	})
	//when the form is submitted make a request to the API
	getData(e){
		e.preventDefault();
		let formValues = {
			topic: this.state.topic,
			start_date: this.state.start_date,
			end_date: this.state.end_date
		}
		let params = Object.assign(formValues, {'api-key: 7ad18052805a404cadd93f1b34f18391'})
		params.start_date = ${params.start_date}0101;
		params.end_date = ${params.end_date}1231;
		axios({
			method: 'get',
			baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
			params: params,
			responseType: 'json'
		}).then(data => {
			//This is the array that .map will use to render the data
			const dataToBeRendered = [];
			const dataArr = data.data.response.docs;
			dataArr.forEach(article => {
				dataToBeRendered.push({
					web_url: article.web_url,
					snippet:article.snippet,
					pub_date: article.pub_date
				});
			});
			//Then reset the form
			this.setState({
				articles: dataToBeRendered,
				topic: ' ',
				start_date: ' ',
				end_date: ' '
			});
		});
	}

	//Post the article to the DB when save button is clicked
	saveArticle(article){
		axios({
			method: 'post',
			baseURL: '/api',
			data: {
				data: article
			}
		}).then(response => {
			//Then update the state with each saved article
			let newState = [];
			newState.push(response.data);
			this.setState({
				savedData: (newState).concat(this.state.savedData)
			})
		})
	}

	//Delete articles from the DB by Id
	deleteArticle(id){
		axios({
			method: 'get',
			baseURL: '/api/delete/?{id}',
		}).then(response => {
			//then update the state to remove the deleted article
			this.setState({
				savedData: this.state.savedData.filter(article => {
					return article._id !== response.data._id
				})
			})
		})
	}

	update(data){
		return (
			<tbody>
			{
				data.map((article, i) => {
					return (
						<Article key={i}
							article={article}
							deleteArticle={this.deleteArticle}
							/>
						)
				})
			}
			</tbody>
		)
	}

	render() {
		return (
			<Router>
				<div style={Style}>
					<Header />
					<Route path="/"
						exact={true}
						render={() =>
							<div>
								<Search
									onSearch={this.getData}
									topicChanged={this.handleTopic}
									startYearChanged={this.handleStartYear}
									endYearChanged={this.handleEndYear}
									topic={this.state.topic}
									start={this.state.start_date}
									end={this.state.end_date}/>
								<Results
									articles={this.state.articles}
									saveArticle={this.saveArticle} />
							</div>
						}/>
					<Route path='/search'
						exact={true}
						render={() =>
							<div>
								<Search
									onSearch={this.getData}
									topicChanged={this.handleTopic}
									startYearChanged={this.handleStartYear}
									endYearChanged={this.handleEndYear}
									topic={this.state.topic}
									begin={this.state.start_date}
									end={this.state.end_date}
								<Results
									articles={this.state.articles}
									saveArticle={this.saveArticle} />
							</div>
						}/>

						<Route path='/saved'
							exact={true}
							render={() =>
								<SavedArticles
									savedData={this.state.savedData}
									update={this.update}
									deleteArticle={this.deleteArticle}/>
							}/>
				</div>
			</Router>

		)
	}
}
