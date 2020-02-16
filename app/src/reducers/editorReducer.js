import {
	UPDATE_EDITOR_TITLE,
	UPDATE_EDITOR_BODY,
	UPDATE_EDITOR_SLUG,
	UPDATE_EDITOR_CATEGORY,
	ADD_EDITOR_TAG,
	REMOVE_EDITOR_TAG,
	UPDATE_EDITOR_FEATURED_IMAGE,
	SAVE_AS_DRAFT
} from "../constants";

const initialState = {
	title: "",
	slug: "",
	body: "<p></p>",
	category: [],
	tags: [],
	featuredImage: "",
	saveDraft: false
};

export default function editorReducer(state = initialState, { type, payload }) {
	switch (type) {
		case UPDATE_EDITOR_TITLE:
			return { ...state, title: payload };

		case UPDATE_EDITOR_BODY:
			return { ...state, body: payload };

		case UPDATE_EDITOR_SLUG:
			return { ...state, slug: payload };

		case UPDATE_EDITOR_CATEGORY:
			return { ...state, category: payload };

		case ADD_EDITOR_TAG:
			return { ...state, tags: [...state.tags, payload] };

		case REMOVE_EDITOR_TAG:
			const indexOfTag = state.tags.indexOf(payload);
			const newTags = [...state.tags];
			newTags.splice(indexOfTag, 1);
			return { ...state, tags: newTags };

		case UPDATE_EDITOR_FEATURED_IMAGE:
			return { ...state, featuredImage: payload };

		case SAVE_AS_DRAFT:
			return { ...state, saveDraft: !state.saveDraft };

		default:
			return state;
	}
}
