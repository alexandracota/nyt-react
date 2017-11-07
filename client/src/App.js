import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import Main, Saved and Search components
import Main from "./components/Main";
import Saved from "./components/Saved";
import Search from "./components/Search";

import './App.css';

//This App function displays the components
const App = () =>
<div>
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={Main} />
				{/*<Route exact path="/saved" component={Saved} />*/}
				<Route exact path="/search" component={Search} />
			</Switch>
		</div>
	</Router>
</div>

//Export App to be used in index.js
export default App;
