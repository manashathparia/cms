import axios from "axios";
import { push } from "connected-react-router";

import {
	UPDATE_EDITOR_BODY,
	UPDATE_EDITOR_TITLE,
	UPDATE_EDITOR_SLUG,
	UPDATE_EDITOR_CATEGORY,
	UPDATE_EDITOR_FEATURED_IMAGE,
	ADD_EDITOR_TAG,
	REMOVE_EDITOR_TAG,
	UPDATE_STATUS,
	CLEAR_EDITOR,
	LOAD_POST_TO_EDITOR,
} from "../constants";
import { newNotification } from "./notification.actions";

export function submitPost(url, method) {
	return function submitPostThunk(dispatch, getState) {
		const state = getState();
		const { editor } = state;
		axios({
			url,
			data: { ...editor },
			method,
		}).then(({ data }) => {
			dispatch(
				newNotification({
					varient: "success",
					message: "Successfully posted",
					show: true,
				})
			);
			dispatch(push(`/posts/edit/${data._id}`));
		});
	};
}

export const updateEditorBody = (body) => ({
	type: UPDATE_EDITOR_BODY,
	payload: body,
});

export const updateEditorTitle = (body) => ({
	type: UPDATE_EDITOR_TITLE,
	payload: body,
});

export const updateCategory = (category) => {
	return function(dispatch, getState) {
		const state = getState();
		const categories = state.editor.category;
		// Remove the category if it already exists i.e Delete request, else Add it i.e Post request
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

/*  
This function loads data from state-->contents-->posts[] into editor.
Required when initilizing the edit post page.
*/
export const loadPostToEditor = (id) => async (dispatch, getState) => {
	const state = getState();
	const allPosts = state.content.posts.posts;
	const post = allPosts.filter((_post) => _post._id === id);
	console.log(post);
	if (post.length === 0) {
		const { data } = await axios.get(`/api/posts?id=${id}`);
		console.log(data);
		return dispatch({
			type: LOAD_POST_TO_EDITOR,
			payload: data,
		});
	}
	dispatch({
		type: LOAD_POST_TO_EDITOR,
		payload: post[0],
	});
};
