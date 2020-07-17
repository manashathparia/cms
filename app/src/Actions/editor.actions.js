import axios from "../utils/axios";
import { push } from "connected-react-router";

import { newNotification } from "./notification.actions";

export const UPDATE_EDITOR_TITLE = "UPDATE_EDITOR_TITLE";
export const UPDATE_EDITOR_BODY = "UPDATE_EDITOR_BODY";
export const UPDATE_EDITOR_SLUG = "UPDATE_EDITOR_SLUG";
export const UPDATE_EDITOR_CATEGORY = "UPDATE_EDITOR_CATEGORY";
export const ADD_EDITOR_TAG = "ADD_EDITOR_TAG";
export const REMOVE_EDITOR_TAG = "REMOVE_EDITOR_TAG";
export const UPDATE_EDITOR_FEATURED_IMAGE = "UPDATE_EDITOR_FEATURED_IMAGE";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const CLEAR_EDITOR = "CLEAR_EDITOR";
export const LOAD_POST_TO_EDITOR = "LOAD_POST_TO_EDITOR";

export const updateEditorBody = (body) => ({
	type: UPDATE_EDITOR_BODY,
	payload: body,
});

export const updateEditorTitle = (body) => ({
	type: UPDATE_EDITOR_TITLE,
	payload: body,
});

export const updateEditorSlug = (body) => ({
	type: UPDATE_EDITOR_SLUG,
	payload: body,
});

export const updateEditorFeaturedImage = (url) => ({
	type: UPDATE_EDITOR_FEATURED_IMAGE,
	payload: url,
});

export const addTag = (tag) => {
	return {
		type: ADD_EDITOR_TAG,
		payload: tag,
	};
};

export const deleteTag = (tag) => {
	return {
		type: REMOVE_EDITOR_TAG,
		payload: tag,
	};
};

export const updateStatus = (status) => ({
	type: UPDATE_STATUS,
	payload: status,
});

export const clearEditor = () => ({
	type: CLEAR_EDITOR,
});

export function submitPost(url, method) {
	return async function submitPostThunk(dispatch, getState) {
		try {
			const state = getState();
			const {
				editor,
				profile: { id: authorID },
			} = state;
			const { data } = await axios({
				url,
				data: { ...editor, author: authorID },
				method,
			});
			dispatch(
				newNotification({
					varient: "success",
					message: "Successfully posted",
					show: true,
				})
			);
			dispatch(push(`/posts/edit/${data._id}`));
		} catch (e) {
			dispatch(
				newNotification({
					varient: "error",
					message: e.response?.data || e.message,
					show: true,
				})
			);
		}
	};
}

export const updateCategory = (category) => {
	return function(dispatch, getState) {
		const state = getState();
		const categories = state.editor.category;
		// Remove the category if it already exists i.e unchecked category
		if (categories.includes(category)) {
			const i = categories.indexOf(category);
			categories.splice(i, 1);
			dispatch({
				type: UPDATE_EDITOR_CATEGORY,
				payload: [...categories],
			});
		} else {
			dispatch({
				type: UPDATE_EDITOR_CATEGORY,
				payload: [...categories, category],
			});
		}
	};
};

//
// This function loads data from state-->contents-->posts[] into editor.
// Required when initilizing the edit post page.
// */
export const loadPostToEditor = (id) => async (dispatch, getState) => {
	if (typeof id === "undefined") return;
	try {
		const { data } = await axios.get(`/api/posts?id=${id}`);
		console.log(data);
		return dispatch({
			type: LOAD_POST_TO_EDITOR,
			payload: data,
		});
	} catch (e) {
		dispatch(push("/404"));
	}
};
