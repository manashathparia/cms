import {
	ADD_NEW_COMMENT,
	REMOVE_COMMENT,
	UPDATE_COMMENTS_COUNT,
	SET_APPROVED_COMMENTS,
	SET_APPROVED_AND_WAITING_COMMENTS,
	SET_WAITING_COMMENTS,
	SET_TRASHED_COMMENTS,
} from "../Actions/comments.acctions";

const initial = {
	comments: {
		approved: { 0: [] },
		waiting: { 0: [] },
		trashed: { 0: [] },
		approvedAndWaiting: { 0: [] },
	},
	count: {
		approved: 0,
		waiting: 0,
		trashed: 0,
		approvedAndWaiting: 0,
	},
};

export default function commentsReducer(state = initial, { type, payload }) {
	switch (type) {
		case ADD_NEW_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[payload.status]: {
						0: [...state.comments[payload.status], payload.comment],
					},
				},
			};

		case REMOVE_COMMENT:
			const comments = state.comments.filter(
				(comment) => !(comment._id === payload)
			);
			return { ...state, comments };

		case SET_APPROVED_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					approved: {
						...state.comments.approved,
						[payload.page]: payload.comments,
					},
				},
			};

		case SET_APPROVED_AND_WAITING_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					approvedAndWaiting: {
						...state.comments.approvedAndWaiting,
						[payload.page]: payload.comments,
					},
				},
			};

		case SET_WAITING_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					waiting: {
						...state.comments.waiting,
						[payload.page]: payload.comments,
					},
				},
			};

		case SET_TRASHED_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					trashed: {
						...state.comments.trashed,
						[payload.page]: payload.comments,
					},
				},
			};

		case UPDATE_COMMENTS_COUNT:
			return { ...state, count: payload };
		default:
			return state;
	}
}
