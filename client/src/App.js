import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Saved from "./components/Saved";
import Search from "./components/Search";


const App = () =>
<Router>
	<body>
		<div>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/saved" component={Saved} />
				<Route exact path="/search" component={Search} />
			</Switch>
		</div>
	</body>
</Router>

export default App;


// ReactDOM.render(routes, document.getElementById("app"));
