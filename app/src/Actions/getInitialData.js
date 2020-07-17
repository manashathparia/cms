import axios from "../utils/axios";
import { updateCounts } from "./comments.acctions";

export default function getInitialData() {
	return async (dispatch) => {
		const { data: commentsCount } = await axios.get(
			"/api/comments/?count=true"
		);
		dispatch(updateCounts(commentsCount));
	};
}
