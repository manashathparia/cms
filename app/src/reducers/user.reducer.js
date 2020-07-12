import { UPDATE_USER_DETAILS } from "../Actions/user.actions";

const initial = {
	username: "",
	email: "",
	avatar: "",
	id: 0,
};

export default function userReducer(state = initial, { type, payload }) {
	switch (type) {
		case UPDATE_USER_DETAILS:
			return { ...state, ...payload };
		default:
			return state;
	}
}
