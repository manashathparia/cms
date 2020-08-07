import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { clearNotification } from "../Actions/notification.actions";

function Notification({ varient, message, show, onClose, autoHide }) {
	return (
		<Snackbar
			style={{ zIndex: 9999999999 }}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={show}
			autoHideDuration={autoHide ? 6000 : null}
			onClose={onClose}
		>
			<Alert variant="filled" onClose={onClose} severity={varient}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default connect(
	({ notification }) => ({
		varient: notification.varient,
		show: notification.show,
		message: notification.message,
		autoHide: notification.autoHide,
	}),
	(dispatch) => ({
		onClose() {
			dispatch(clearNotification());
		},
	})
)(Notification);
