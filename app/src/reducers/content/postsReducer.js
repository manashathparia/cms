import { UPDATE_ALL_POSTS } from "../../constants";

const initalState = [];

export default function postReducer(state = initalState, { type, payload }) {
	switch (type) {
		case UPDATE_ALL_POSTS:
			return payload;

		default:
			return state;
	}
}
