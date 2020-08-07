import {
	UPDATE_ALL_CATEGORIES,
	ADD_CATEGORY,
	REMOVE_CATEGORY,
} from "../Actions/category.actions";

const initalState = {
	data: [],
	loading: false,
};

export default function categoriesReducer(
	state = initalState,
	{ type, payload }
) {
	switch (type) {
		case UPDATE_ALL_CATEGORIES:
			return { ...state, data: payload };
		case ADD_CATEGORY:
			return { ...state, data: [...state.data, payload] };
		case REMOVE_CATEGORY:
			return { ...state, data: state.data.filter((val) => val === payload) };
		default:
			return state;
	}
}
