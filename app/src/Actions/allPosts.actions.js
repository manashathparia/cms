import Axios from "../utils/axios";
import { newNotification, toggleLoader } from "./notification.actions";

export const UPDATE_POSTS_COUNT = "UPDATE_POSTS_COUNT";
export const UPDATE_ALL_POSTS = "UPDATE_ALL_POSTS";

export const updateAllPosts = () => async (dispatch) => {
	dispatch(toggleLoader());
	const res = await Axios.get("/api/posts/?embed=true");
	dispatch({ type: UPDATE_ALL_POSTS, payload: res.data.posts });
	dispatch({ type: UPDATE_POSTS_COUNT, payload: res.data.count });
	dispatch(toggleLoader());
};

export const trashPosts = (ids) => async (dispatch, getState) => {
	try {
		await Axios.put(`/api/posts/trash/?ids=${ids.toString()}`);
		const {
			content: {
				posts: { posts },
			},
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
export const deletePosts = (ids) => async (dispatch, getState) => {
	try {
		await Axios.delete(`/api/posts/?ids=${ids.toString()}`);
		const {
			content: {
				posts: { posts, count },
			},
		} = await getState();
		dispatch(
			newNotification({
				varient: "success",
				message: "Posts successfully deleted",
				show: true,
			})
		);
		const _posts = posts.filter((post) => !ids.includes(post._id));
		dispatch({
			type: UPDATE_ALL_POSTS,
			payload: _posts,
		});
		dispatch({
			type: UPDATE_POSTS_COUNT,
			payload: { trash: count.trash - ids.length },
		});
	} catch (e) {
		console.log(e);
		dispatch(
			newNotification({
				varient: "error",
				message: e.response.data,
				show: true,
				autoHide: false,
			})
		);
	}
};
