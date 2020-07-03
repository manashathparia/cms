import axios from "axios";
import {
	UPDATE_ALL_CATEGORIES,
	ADD_CATEGORY,
	REMOVE_CATEGORY,
} from "../constants";

export const updateaAllCategories = () => (dispatch) => {
	axios.get("/api/categories").then((res) =>
		dispatch({
			type: UPDATE_ALL_CATEGORIES,
			payload: res.data.data,
		})
	);
};
export const addCategory = (categoryToAdd) => ({
	type: ADD_CATEGORY,
	payload: categoryToAdd,
});
export const deleteCategory = (categoryToDelete) => ({
	type: REMOVE_CATEGORY,
	payload: categoryToDelete,
});
