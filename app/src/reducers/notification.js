import {
	NEW_NOTIFICATION,
	CLEAR_NOTIFICATION,
	TOGGLE_LOADER,
} from "../Actions/notification.actions";

const initial = {
	varient: "info",
	show: false,
	autoHide: true,
	message: "",
	loading: false,
};

export default function notificationReducer(
	state = initial,
	{ type, payload }
) {
	switch (type) {
		case NEW_NOTIFICATION:
			return { ...initial, ...payload };
		case CLEAR_NOTIFICATION:
			return initial;
		case TOGGLE_LOADER:
			return { ...state, loading: payload };
		default:
			return state;
	}
}
