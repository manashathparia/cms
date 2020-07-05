import { UPDATE_ALL_POSTS } from "../../constants";
import { UPDATE_POSTS_COUNT } from "../../Actions/allPosts.actions";

const initalState = {
	posts: [],
	count: {},
};

export default function postReducer(state = initalState, { type, payload }) {
	switch (type) {
		case UPDATE_ALL_POSTS:
			return { ...state, posts: payload };
		case UPDATE_POSTS_COUNT:
			return { ...state, count: payload };

		default:
			return state;
	}
}
