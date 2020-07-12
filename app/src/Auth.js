import React from "react";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen";

const LazyApp = React.lazy(() => import("./App"));
const LazySignIn = React.lazy(() => import("./Containers/Login"));

const Lazy = () => (
	<React.Suspense fallback={<LoadingScreen />}>
		<LazySignIn />
	</React.Suspense>
);

export default function Auth() {
	return localStorage.getItem("token") ? (
		<React.Suspense fallback={<LoadingScreen />}>
			<LazyApp />
		</React.Suspense>
	) : (
		<Switch>
			<Route component={Lazy} />
		</Switch>
	);
}
