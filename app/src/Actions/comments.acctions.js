import axios from "../utils/axios";

export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const SET_COMMENTS = "SET_COMMENTS";

export const addNewComment = (comment) => ({
	type: ADD_NEW_COMMENT,
	payload: comment,
});

export const removeComment = (id) => ({
	type: REMOVE_COMMENT,
	payload: id,
});
export const updateComments = (comments) => ({
	type: SET_COMMENTS,
	payload: comments,
});

export const getComments = () => async (dispatch) => {
	const { data } = await axios.get("/api/comments");
	dispatch(updateComments(data));
};

export const updateComment = (id, updated) => async (dispatch, state) => {
	const { data } = await axios.put(`/api/comments/${id}`, updated);
	const { comments: _comments } = await state();
	const comments = _comments.map((comment) =>
		comment._id === id ? { ...comment, ...updated } : comment
	);
	dispatch(updateComments(comments));
	console.log(data);
};
