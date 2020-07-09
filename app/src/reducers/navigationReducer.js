import {
	TOOGLE_NAVIGATION_DRAWER,
	CHANGE_NAVBAR_HEADING,
} from "../Actions/navigationActions";

const initialState = {
	mobileDrawerOpen: false,
	desktopDrawerOpen: true,
	heading: "",
};
export default function navigationReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case TOOGLE_NAVIGATION_DRAWER:
			return {
				...state,
				mobileDrawerOpen: !state.mobileDrawerOpen,
				desktopDrawerOpen: !state.desktopDrawerOpen,
			};
		case CHANGE_NAVBAR_HEADING:
			return { ...state, heading: payload };
		default:
			return state;
	}
}
