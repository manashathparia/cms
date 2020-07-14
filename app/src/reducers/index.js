"@flow strict";

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import navigationReducer from "./navigationReducer";
import editorReducer from "./editorReducer";
import contentReducers from "./content";
import notificationReducer from "./notification";
import mediaReducer from "./media.reducer";
import userReducer from "./user.reducer";
import commentReducer from "./comments.reducer";

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		navigation: navigationReducer,
		editor: editorReducer,
		content: contentReducers,
		comments: commentReducer,
		media: mediaReducer,
		notification: notificationReducer,
		profile: userReducer,
	});
