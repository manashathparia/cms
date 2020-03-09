import Axios from "axios";
import { UPDATE_ALL_POSTS } from "../../constants";

export const updateAllPosts = () => async dispatch => {
	const res = await Axios.get("/api/posts");
	dispatch({ type: UPDATE_ALL_POSTS, payload: res.data.data });
};
