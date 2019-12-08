import {
	UPDATE_EDITOR_BODY,
	UPDATE_EDITOR_TITLE,
	UPDATE_EDITOR_SLUG
} from "../constants";

export const updateEditorBody = body => ({
	type: UPDATE_EDITOR_BODY,
	payload: body
});

export const updateEditorTitle = body => ({
	type: UPDATE_EDITOR_TITLE,
	payload: body
});

export const updateEditorSlug = body => ({
	type: UPDATE_EDITOR_SLUG,
	payload: body
});
