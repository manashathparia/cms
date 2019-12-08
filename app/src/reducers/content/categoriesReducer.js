import {
	UPDATE_ALL_CATEGORIES,
	ADD_CATEGORY,
	REMOVE_CATEGORY
} from "../../constants";

const initalState = [];

export default function categoriesReducer(
	state = initalState,
	{ type, payload }
) {
	switch (type) {
		case UPDATE_ALL_CATEGORIES:
			return payload;
		case ADD_CATEGORY:
			return [...state, payload];
		case REMOVE_CATEGORY:
			return state.filter(val => val === payload);
		default:
			return state;
	}
}
