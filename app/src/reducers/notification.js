import {
	NEW_NOTIFICATION,
	CLEAR_NOTIFICATION,
} from "../Actions/notification.actions";

const initial = {
	varient: "info",
	show: false,
	autoHideDuration: 6000,
	message: "",
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
		default:
			return state;
	}
}
