import axios from "axios";
import { newNotification } from "./notification.actions";
export const UPDATE_ALL_CATEGORIES = "UPDATE_ALL_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";

export const addCategory = (categoryToAdd, notification) => async (
	dispatch
) => {
	try {
		const { data } = await axios.post("/api/categories", categoryToAdd);
		dispatch({
			type: ADD_CATEGORY,
			payload: data,
		});
		if (notification) {
			dispatch(
				newNotification({
					varient: "success",
					message: "Category added successfully",
					show: true,
				})
			);
		}
	} catch (e) {
		console.log(e);
	}
};

export const removeCategory = (categoryToDelete) => ({
	type: REMOVE_CATEGORY,
	payload: categoryToDelete,
});

export const getCategories = () => (dispatch) => {
	axios.get("/api/categories").then((res) =>
		dispatch({
			type: UPDATE_ALL_CATEGORIES,
			payload: res.data,
		})
	);
};

export const updateCategory = (id, category) => async (dispatch, state) => {
	try {
		await axios.put(`/api/categories/${id}`, category);

		let {
			content: { categories },
		} = await state();
		const modifiedCategories = categories.map((_category) => {
			if (_category._id === id) {
				_category.category = category.category;
				_category.description = category.description;
				return _category;
			}
			return _category;
		});
		dispatch({
			type: UPDATE_ALL_CATEGORIES,
			payload: modifiedCategories,
		});
		dispatch(
			newNotification({
				varient: "Success",
				message: "Category updated successfully",
				show: true,
			})
		);
	} catch (e) {
		dispatch(
			newNotification({
				varient: "Error",
				message: e.message,
				show: true,
			})
		);
	}
};

export const deleteCategory = (id) => async (dispatch, state) => {
	try {
		await axios.delete(`/api/categories/${id}`);

		let {
			content: { categories },
		} = await state();

		const modifiedCategories = categories.filter(
			(category) => !(category._id === id)
		);
		console.log(modifiedCategories);
		dispatch({
			type: UPDATE_ALL_CATEGORIES,
			payload: modifiedCategories,
		});
	} catch (e) {
		console.log(e);
	}
};
