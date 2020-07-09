export const TOOGLE_NAVIGATION_DRAWER = "TOOGLE_NAVIGATION_DRAWER";
export const CHANGE_NAVBAR_HEADING = "CHANGE_NAVBAR_HEADING";

export const toogleDrawer = () => ({
	type: TOOGLE_NAVIGATION_DRAWER,
});

export const changeHeaderHeading = (heading) => ({
	type: CHANGE_NAVBAR_HEADING,
	payload: heading,
});
