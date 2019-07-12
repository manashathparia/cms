import { TOOGLE_NAVIGATION_DRAWER, CHANGE_NAVBAR_HEADING } from "../constants";

export const toogleDrawer = () => ({
	type: TOOGLE_NAVIGATION_DRAWER
});

export const changeHeaderHeading = heading => ({
	type: CHANGE_NAVBAR_HEADING,
	payload: heading
});
