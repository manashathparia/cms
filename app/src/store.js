import { createStore, compose, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import Reducers from "./reducers";

export const history = createBrowserHistory({ basename: "/admin" });

export default createStore(
	Reducers(history),
	compose(
		applyMiddleware(thunk, routerMiddleware(history)),
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
);
