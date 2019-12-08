import React from "react";
import { Switch, Route } from "react-router-dom";
import Error404 from "../Containers/404";
import NewPost from "../Containers/Post/NewPost";

export default function(props) {
	return (
		<Switch>
			<Route exact path="/posts/new" component={NewPost} />
			<Route component={Error404} />
		</Switch>
	);
}
