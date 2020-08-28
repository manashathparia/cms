import Axios from "../utils/axios";
import { newNotification, toggleLoader } from "./notification.actions";

export const UPDATE_POSTS_COUNT = "UPDATE_POSTS_COUNT";
export const UPDATE_PUBLISHED_POSTS = "UPDATE_PUBLISHED_POSTS";
export const UPDATE_DRAFT_POSTS = "UPDATE_DRAFT_POSTS";
export const UPDATE_TRASHED_POSTS = "UPDATE_TRASHED_POSTS";
export const UPDATE_PUBLISHED_AND_DRAFT_POSTS = "UPDATE_PUBLISHED,DRAFT_POSTS";

export const updateAllPosts = (
	status = "published,draft",
	page,
	perPage
) => async (dispatch) => {
	dispatch(toggleLoader(true));
	const res = await Axios.get(
		`/api/posts/?embed=true&status=${status}&page=${page}&per_page=${perPage}`
	);
	dispatch({
		type: `UPDATE_${status.toUpperCase()}_POSTS`,
		payload: {
			page,
			posts: res.data.posts,
		},
	});
	dispatch({
		type: UPDATE_POSTS_COUNT,
		payload: {
			...res.data.count,
			"published,draft": res.data.count.published + res.data.count.draft,
		},
	});
	dispatch(toggleLoader(false));
};

export const trashPosts = (ids, page, status) => async (dispatch, getState) => {
	try {
		await Axios.put(`/api/posts/trash/?ids=${ids.toString()}`);
		const {
			posts: { data: posts },
		} = await getState();
		dispatch(
			newNotification({
				varient: "success",
				message: "Moved to trash",
				show: true,
			})
		);
		console.log(posts[status]);
		const _posts = posts[status][page].filter(
			(post) => !ids.includes(post._id)
		);

		dispatch({
			type: `UPDATE_${status.toUpperCase()}_POSTS`,
			payload: _posts,
		});
	} catch (e) {
		console.error(e);
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
			posts: { data: posts, count },
		} = await getState();
		dispatch(
			newNotification({
				varient: "success",
				message: "Posts successfully deleted",
				show: true,
			})
		);
		const _posts = posts.trash.filter((post) => !ids.includes(post._id));
		dispatch({
			type: UPDATE_TRASHED_POSTS,
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
				message: e.response?.data,
				show: true,
				autoHide: false,
			})
		);
	}
};
