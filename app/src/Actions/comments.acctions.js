import axios from "../utils/axios";
import { toggleLoader, newNotification } from "./notification.actions";

export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const SET_APPROVED_COMMENTS = "SET_APPROVED_COMMENTS";
export const SET_APPROVED_AND_WAITING_COMMENTS =
	"SET_APPROVEDANDWAITING_COMMENTS";
export const SET_WAITING_COMMENTS = "SET_WAITING_COMMENTS";
export const SET_TRASHED_COMMENTS = "SET_TRASHED_COMMENTS";
export const UPDATE_COUNT = "UPDATE_COUNT";

export const addNewComment = (comment) => ({
	type: ADD_NEW_COMMENT,
	payload: comment,
});

export const removeComment = (id) => ({
	type: REMOVE_COMMENT,
	payload: id,
});
export const updateComments = (status, comments, page) => ({
	type: `SET_${status.toUpperCase()}_COMMENTS`,
	payload: {
		comments,
		page,
	},
});
export const updateCounts = (counts) => ({
	type: UPDATE_COUNT,
	payload: {
		...counts,
		approvedAndWaiting: counts.approved + counts.waiting,
	},
});

export const getComments = (status, page, perPage) => async (dispatch) => {
	try {
		const _status = status
			.split("And")
			.join(",")
			.toLowerCase(); // for approvedAndWaiting
		dispatch(toggleLoader(true));
		const {
			data: [comments, counts],
		} = await axios.get(
			`/api/comments/?status=${_status}&per_page=${perPage}&page=${page}`
		);
		dispatch(toggleLoader(false));
		dispatch(updateComments(status, comments, page));
		dispatch(updateCounts(counts));
	} catch (error) {
		dispatch(toggleLoader(false));
		dispatch(
			newNotification({ varient: "error", message: error.message, show: true })
		);
	}
};

export const updateComment = (id, updated, status, page) => async (
	dispatch,
	state
) => {
	const { data } = await axios.put(`/api/comments/${id}`, updated);
	const {
		comments: { comments: _comments },
	} = await state();
	const comments = _comments[status][page].map((comment) =>
		comment._id === id ? { ...comment, ...updated } : comment
	);
	dispatch(updateComments(status, comments, page));
	dispatch(updateCounts(data[1]));
};

export const trashComments = (ids) => {
	return async (dispatch) => {
		const _ids = Array.isArray(ids) ? ids.join(",") : ids;
		const { data } = await axios.put(`/api/comments/?ids=${_ids}`, {
			status: "trashed",
		});
		console.log(data);
	};
};
