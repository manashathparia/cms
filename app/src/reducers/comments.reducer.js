import {
	ADD_NEW_COMMENT,
	REMOVE_COMMENT,
	SET_COMMENTS,
} from "../Actions/comments.acctions";

const initial = [];

export default function commentsReducer(state = initial, { type, payload }) {
	switch (type) {
		case ADD_NEW_COMMENT:
			return [payload, ...state];

		case REMOVE_COMMENT:
			const comments = state.filter((comment) => !(comment._id === payload));
			return comments;

		case SET_COMMENTS:
			return payload;

		default:
			return state;
	}
}
