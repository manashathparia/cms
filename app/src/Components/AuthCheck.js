import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { verifyLogin, updateUserDetails } from "../Actions/user.actions";

const AuthCheck = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(verifyLogin());
		const token = localStorage.getItem("token");
		const decoded = jwt.decode(token);
		dispatch(updateUserDetails(decoded));
	}, [dispatch]);

	return null;
};

export default AuthCheck;
