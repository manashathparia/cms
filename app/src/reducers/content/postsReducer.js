import {
	UPDATE_POSTS_COUNT,
	UPDATE_PUBLISHED_POSTS,
	UPDATE_DRAFT_POSTS,
	UPDATE_TRASHED_POSTS,
	UPDATE_PUBLISHED_AND_DRAFT_POSTS,
} from "../../Actions/allPosts.actions";

const initalState = {
	posts: {
		published: [],
		draft: [],
		trashed: [],
		"published,draft": [],
	},
	count: {},
};

export default function postReducer(state = initalState, { type, payload }) {
	switch (type) {
		case UPDATE_PUBLISHED_POSTS:
			return { ...state, posts: { ...state.posts, published: payload } };

		case UPDATE_DRAFT_POSTS:
			return { ...state, posts: { ...state.posts, draft: payload } };

		case UPDATE_TRASHED_POSTS:
			return { ...state, posts: { ...state.posts, trashed: payload } };

		case UPDATE_PUBLISHED_AND_DRAFT_POSTS:
			return {
				...state,
				posts: { ...state.posts, "published,draft": payload },
			};

		case UPDATE_POSTS_COUNT:
			return { ...state, count: { ...state.count, ...payload } };

		default:
			return state;
	}
}
