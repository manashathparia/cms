import React from "react";
import { Switch, Route } from "react-router-dom";
import Error404 from "../Containers/404";
import NewPost from "../Containers/Post/NewPost";
import AllPost from "../Containers/Post/AllPost";
import EditPost from "../Containers/Post/EditPost";
import MediaPage from "../Containers/MediaPage";
import Categories from "../Containers/Post/Categories";
import Comments from "../Containers/Comments";
import Dashboard from "../Containers/Dashboard";
import Profile from "../Containers/Profile";

export default function(props) {
	return (
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/posts/new" component={NewPost} />
			<Route exact path="/posts/all" component={AllPost} />
			<Route exact path="/posts/edit/:id" component={EditPost} />
			<Route exact path="/media/images" component={MediaPage} />
			<Route exact path="/posts/categories" component={Categories} />
			<Route exact path="/comments" component={Comments} />
			<Route exact path="/profile" component={Profile} />
			<Route component={Error404} />
		</Switch>
	);
}
