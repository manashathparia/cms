import axios from "axios";

export default axios.create({
	headers: {
		authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});
