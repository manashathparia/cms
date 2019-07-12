import React from "react";
import { Switch } from "react-router-dom";
import Error404 from "../Containers/404";

export default function(props) {
	return (
		<Switch>
			<Error404 />
		</Switch>
	);
}
