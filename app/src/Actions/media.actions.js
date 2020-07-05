import Axios from "axios";
import { newNotification } from "./notification.actions";

export const LOAD_IMAGES = "LOAD_IMAGES";
export const SUBMIT_IMAGE = "SUBMIT_IMAGE";

export const loadImages = () => async (dispatch) => {
	const { data } = await Axios.get("/api/media");
	dispatch({
		type: LOAD_IMAGES,
		payload: data,
	});
};

export const uploadImage = (image, cb) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post("/api/media", image);
		const {
			media: { images },
		} = await getState();
		images.unshift(data);
		dispatch({
			type: LOAD_IMAGES,
			payload: images,
		});
		cb(data);
	} catch (e) {
		cb(null, true);
		dispatch(
			newNotification({
				message: e.response.data,
				varient: "error",
				show: true,
			})
		);
	}
};
