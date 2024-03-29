import {
	UPDATE_POSTS_COUNT,
	UPDATE_PUBLISHED_POSTS,
	UPDATE_DRAFT_POSTS,
	UPDATE_TRASHED_POSTS,
	UPDATE_PUBLISHED_AND_DRAFT_POSTS,
} from "../Actions/allPosts.actions";

const initalState = {
	data: {
		published: {
			0: [],
		},
		draft: {
			0: [],
		},
		trashed: { 0: [] },
		"published,draft": { 0: [] },
	},
	count: {},
};

export default function postReducer(state = initalState, { type, payload }) {
	switch (type) {
		case UPDATE_PUBLISHED_POSTS:
			return {
				...state,
				data: {
					...state.data,
					published: {
						...state.data.published,
						[payload.page]: payload.posts,
					},
				},
			};

		case UPDATE_DRAFT_POSTS:
			return {
				...state,
				data: {
					...state.data,
					draft: {
						...state.data.draft,
						[payload.page]: payload.posts,
					},
				},
			};

		case UPDATE_TRASHED_POSTS:
			return {
				...state,
				data: {
					...state.data,
					trashed: {
						...state.data.trashed,
						[payload.page]: payload.posts,
					},
				},
			};

		case UPDATE_PUBLISHED_AND_DRAFT_POSTS:
			return {
				...state,
				data: {
					...state.data,
					"published,draft": {
						...state.data["published,draft"],
						[payload.page]: payload.posts,
					},
				},
			};

		case UPDATE_POSTS_COUNT:
			return { ...state, count: { ...state.count, ...payload } };

		default:
			return state;
	}
}
