import React from "react";
import { Switch, Route } from "react-router-dom";
import Error404 from "../Containers/404";
import NewPost from "../Containers/Post/NewPost";
import AllPost from "../Containers/Post/AllPost";
import EditPost from "../Containers/Post/EditPost";

export default function(props) {
	return (
		<Switch>
			<Route exact path="/posts/new" component={NewPost} />
			<Route exact path="/posts/all" component={AllPost} />
			<Route exact path="/posts/edit/:id" component={EditPost} />
			<Route component={Error404} />
		</Switch>
	);
}
