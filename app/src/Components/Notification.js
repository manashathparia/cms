import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { clearNotification } from "../Actions/notification.actions";

function Notification({ varient, message, show, onClose, autoHideDuration }) {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={show}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
		>
			<Alert onClose={onClose} severity={varient}>
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
	}),
	(dispatch) => ({
		onClose() {
			dispatch(clearNotification());
		},
	})
)(Notification);
