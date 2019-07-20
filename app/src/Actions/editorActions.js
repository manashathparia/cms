import { UPDATE_EDITOR_BODY } from "../constants";

export const updateEditorBody = body => ({
	type: UPDATE_EDITOR_BODY,
	payload: body
});
