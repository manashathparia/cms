import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import postReducer from "./postsReducer";

export default combineReducers({
	categories: categoriesReducer,
	posts: postReducer
});
