import { useEffect } from "react";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { verifyLogin, updateUserDetails } from "../Actions/user.actions";

const AuthCheck = ({ verify, updateProfile }) => {
	useEffect(() => {
		verify();
		updateProfile();
	}, [updateProfile, verify]);
	return null;
};

export default connect(null, (dispatch) => ({
	verify() {
		dispatch(verifyLogin());
	},
	updateProfile() {
		const token = localStorage.getItem("token");
		const decoded = jwt.decode(token);
		dispatch(updateUserDetails(decoded));
	},
}))(AuthCheck);
