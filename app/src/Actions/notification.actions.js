export const NEW_NOTIFICATION = "NEW_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
export const TOGGLE_LOADER = "TOGGLE_LOADER";

/***
 * @param {Object} notification
 * @param {String} notification.varient -  ["error", 'success', 'warning', 'info'].
 * @param {Number} notification.autoCloseDuration - Auto close in ms.
 * @param {String} notification.message - 'Message'.
 * @param {Boolean} notification.show
 * }
 */

export const newNotification = (notification) => ({
	type: NEW_NOTIFICATION,
	payload: notification,
});

export const clearNotification = () => ({
	type: CLEAR_NOTIFICATION,
});

export const toggleLoader = (state) => ({
	type: TOGGLE_LOADER,
	payload: state,
});
