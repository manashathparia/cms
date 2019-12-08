import {
	UPDATE_EDITOR_TITLE,
	UPDATE_EDITOR_BODY,
	UPDATE_EDITOR_SLUG,
	UPDATE_EDITOR_CATEGORY,
	UPDATE_EDITOR_TAGS,
	UPDATE_EDITOR_FEATURED_IMAGE
} from "../constants";

const initialState = {
	title: "",
	slug: "",
	body: "<p></p>",
	category: [],
	tags: [],
	featuredImage: "",
	status: "draft"
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

		case UPDATE_EDITOR_TAGS:
			return { ...state, tags: payload };

		case UPDATE_EDITOR_FEATURED_IMAGE:
			return { ...state, featuredImage: payload };

		default:
			return state;
	}
}
