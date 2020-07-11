import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./Containers/Login";
import LoadingScreen from "./Components/LoadingScreen";

const LazyApp = React.lazy(() => import("./App"));

export default function Auth() {
	return localStorage.getItem("token") ? (
		<React.Suspense fallback={<LoadingScreen />}>
			<LazyApp />
		</React.Suspense>
	) : (
		<Switch>
			<Route component={SignIn} />
		</Switch>
	);
}
