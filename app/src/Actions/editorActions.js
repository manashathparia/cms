import {
	UPDATE_EDITOR_BODY,
	UPDATE_EDITOR_TITLE,
	UPDATE_EDITOR_SLUG,
	UPDATE_EDITOR_CATEGORY,
	UPDATE_EDITOR_FEATURED_IMAGE,
	ADD_EDITOR_TAG,
	REMOVE_EDITOR_TAG,
	SAVE_AS_DRAFT
} from "../constants";

export const updateEditorBody = body => ({
	type: UPDATE_EDITOR_BODY,
	payload: body
});

export const updateEditorTitle = body => ({
	type: UPDATE_EDITOR_TITLE,
	payload: body
});

export const updateCategory = category => {
	return function(dispatch, getState) {
		const state = getState();
		const categories = state.editor.category;
		if (categories.includes(category)) {
			const i = categories.indexOf(category);
			categories.splice(i, 1);
			dispatch({
				type: UPDATE_EDITOR_CATEGORY,
				payload: [...categories]
			});
		} else {
			dispatch({
				type: UPDATE_EDITOR_CATEGORY,
				payload: [...categories, category]
			});
		}
	};
};

export const updateEditorSlug = body => ({
	type: UPDATE_EDITOR_SLUG,
	payload: body
});

export const updateEditorFeaturedImage = url => ({
	type: UPDATE_EDITOR_FEATURED_IMAGE,
	payload: url
});

export const addTag = tag => {
	return {
		type: ADD_EDITOR_TAG,
		payload: tag
	};
};

export const deleteTag = tag => {
	return {
		type: REMOVE_EDITOR_TAG,
		payload: tag
	};
};

export const saveDraft = () => ({
	type: SAVE_AS_DRAFT
});
