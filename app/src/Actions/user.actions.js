import Axios from "axios";
import { push } from "connected-react-router";

export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";

export const updateUserDetails = ({ username, email, avatar, id }) => ({
	type: UPDATE_USER_DETAILS,
	payload: {
		username,
		email,
		avatar,
		id,
	},
});

export const verifyLogin = () => async (dispatch) => {
	try {
		const token = localStorage.getItem("token");
		await Axios.get(`/api/auth/verify/${token}`);
	} catch (e) {
		localStorage.removeItem("token");
		dispatch(push("/login"));
	}
};
