import {
	UPDATE_POSTS_COUNT,
	UPDATE_ALL_POSTS,
} from "../../Actions/allPosts.actions";

const initalState = {
	posts: [],
	count: {},
};

export default function postReducer(state = initalState, { type, payload }) {
	switch (type) {
		case UPDATE_ALL_POSTS:
			return { ...state, posts: payload };
		case UPDATE_POSTS_COUNT:
			return { ...state, count: { ...state.count, ...payload } };

		default:
			return state;
	}
}
