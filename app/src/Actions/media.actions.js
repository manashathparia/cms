import Axios from "axios";

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
	const { data } = await Axios.post("/api/media", image);
	const {
		media: { images },
	} = await getState();
	images.push(data);
	dispatch({
		type: LOAD_IMAGES,
		payload: images,
	});
	cb(data);
};
