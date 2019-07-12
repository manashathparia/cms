"@flow strict";

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import navigationReducer from "./navigationReducer";

export default history =>
	combineReducers({
		router: connectRouter(history),
		navigation: navigationReducer
	});
