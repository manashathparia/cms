export const NEW_NOTIFICATION = "NEW_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

/***
 * @param notification = {
 *  varient: ["error", 'success', 'warning', 'info'],
 * autoCloseDuration,
 * message
 * }
 */
export const newNotification = (notification) => ({
	type: NEW_NOTIFICATION,
	payload: notification,
});

export const clearNotification = () => ({
	type: CLEAR_NOTIFICATION,
});