import { LOAD_IMAGES } from "../Actions/media.actions";

const inital = {
	images: [],
};

export default function mediaReducer(state = inital, { type, payload }) {
	switch (type) {
		case LOAD_IMAGES:
			return { ...state, images: payload };
		default:
			return state;
	}
}
