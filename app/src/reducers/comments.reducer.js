import {
	ADD_NEW_COMMENT,
	REMOVE_COMMENT,
	SET_COMMENTS,
	UPDATE_COUNT,
} from "../Actions/comments.acctions";

const initial = {
	comments: [],
	count: {
		approved: 0,
		waiting: 0,
		trash: 0,
	},
};

export default function commentsReducer(state = initial, { type, payload }) {
	switch (type) {
		case ADD_NEW_COMMENT:
			return { ...state, comments: [payload, ...state.comments] };

		case REMOVE_COMMENT:
			const comments = state.comments.filter(
				(comment) => !(comment._id === payload)
			);
			return { ...state, comments };

		case SET_COMMENTS:
			return { ...state, comments: payload };

		case UPDATE_COUNT:
			return { ...state, count: payload };
		default:
			return state;
	}
}
