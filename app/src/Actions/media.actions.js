import Axios from "../utils/axios";
import { newNotification } from "./notification.actions";

export const LOAD_IMAGES = "LOAD_IMAGES";
export const SUBMIT_IMAGE = "SUBMIT_IMAGE";

const loadImagesAction = (images) => ({
	type: LOAD_IMAGES,
	payload: images,
});

export const loadImages = () => async (dispatch) => {
	const { data } = await Axios.get("/api/media");
	dispatch(loadImagesAction(data));
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

export const updateImage = (update) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.put(`/api/media/${update._id}`, update);
		const {
			media: { images },
		} = await getState();
		const updatedImages = images.map((image) =>
			image._id === update._id ? data : image
		);
		dispatch(loadImagesAction(updatedImages));
		dispatch(
			newNotification({
				varient: "Success",
				autoCloseDuration: 5000,
				show: true,
				message: "Image updated sucessfully",
			})
		);
	} catch (e) {
		console.log(e);
	}
};
