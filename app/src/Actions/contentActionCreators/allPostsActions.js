import Axios from "axios";
import { UPDATE_ALL_POSTS } from "../../constants";

export const updateAllPosts = () => async (dispatch) => {
	const res = await Axios.get("/api/posts");
	dispatch({ type: UPDATE_ALL_POSTS, payload: res.data.data });
};

export const deletePosts = (ids) => async (dispatch) => {
	try {
		const a = await Axios.put(`/api/posts/trash/?ids=${ids.toString()}`);
		console.log(a);
	} catch (e) {}
};
