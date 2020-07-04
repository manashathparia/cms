import Axios from "axios";
import { UPDATE_ALL_POSTS } from "../constants";
import { newNotification } from "./notification.actions";

export const updateAllPosts = () => async (dispatch) => {
	const res = await Axios.get("/api/posts");
	dispatch({ type: UPDATE_ALL_POSTS, payload: res.data.data });
};

export const deletePosts = (ids) => async (dispatch, getState) => {
	try {
		await Axios.put(`/api/posts/trash/?ids=${ids.toString()}`);
		const {
			content: { posts },
		} = await getState();
		dispatch(
			newNotification({
				varient: "success",
				message: "Moved to trash",
				show: true,
			})
		);
		const _posts = posts.map((post) => {
			if (ids.includes(post._id)) {
				post.status = "trash";
				return post;
			}
			return post;
		});
		dispatch({
			type: UPDATE_ALL_POSTS,
			payload: _posts,
		});
	} catch (e) {
		dispatch(
			newNotification({
				varient: "error",
				message: "Error moving to trash",
				show: true,
				autoHide: false,
			})
		);
	}
};
