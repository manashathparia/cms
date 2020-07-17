import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
	getCategories,
	deleteCategory,
	addCategory,
} from "../../Actions/category.actions";

import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import Remove from "@material-ui/icons/Delete";
import { updateCategory as updateCategoryAction } from "../../Actions/category.actions";
import { AddCategoryDialog } from "../../Components/Editor/categories";

function Categories({
	categories,
	getCategories,
	updateCategory,
	deleteCategory,
	addCategory,
}) {
	const [edit, _handleEdit] = useState("");
	const [show, handleShow] = useState(false);
	const [name, updateName] = useState("");
	const [description, updateDescription] = useState("");

	useEffect(() => {
		getCategories();
		document.title = "Categories";
	}, [getCategories]);

	const handleEdit = (id, _name, _description) => {
		if (edit === id) {
			if (_name !== name || _description !== description)
				updateCategory(id, { category: name, description });
			_handleEdit("");
			return;
		}
		_handleEdit(id);
		updateName(_name);
		updateDescription(_description || "");
	};

	const handleAddCategory = (category) => {
		if (category.category === "") {
			return;
		}
		addCategory(category, true);
		handleShow(!show);
	};

	const removeCategory = (id) => {
		const isFuckingSure = window.confirm("Are you fucking sure?");
		if (isFuckingSure) {
			deleteCategory(id);
		}
	};

	return (
		<Paper>
			<div style={{ padding: 10 }}>
				<Typography
					variant="h5"
					color="textSecondary"
					style={{ display: "inline-block" }}
				>
					Categories
				</Typography>
				<Button
					onClick={() => handleShow(!show)}
					style={{ float: "right" }}
					variant="outlined"
				>
					Add New
				</Button>
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell style={{ width: "40%" }}>Name</TableCell>
						<TableCell>Description</TableCell>
						<TableCell style={{ width: "20%" }}>Options</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{categories.map((category) => (
						<React.Fragment key={category._id}>
							<TableRow>
								{edit === category._id ? (
									<React.Fragment>
										<TableCell>
											<TextField
												onChange={(e) => updateName(e.target.value)}
												value={name}
											/>
										</TableCell>
										<TableCell>
											<TextField
												multiline
												onChange={(e) => updateDescription(e.target.value)}
												value={description}
											/>
										</TableCell>
									</React.Fragment>
								) : (
									<React.Fragment>
										<TableCell>{category.category}</TableCell>
										<TableCell>{category.description}</TableCell>
									</React.Fragment>
								)}
								<TableCell>
									<IconButton
										title="Edit"
										disabled={category.category === "Uncategorised"}
										onClick={() =>
											handleEdit(
												category._id,
												category.category,
												category.description
											)
										}
									>
										{edit === category._id ? <Save /> : <Edit />}
									</IconButton>
									<IconButton
										disabled={category.category === "Uncategorised"}
										onClick={() => removeCategory(category._id)}
										title="Remove"
									>
										<Remove />
									</IconButton>
								</TableCell>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
			<AddCategoryDialog
				open={show}
				onClose={() => handleShow(false)}
				onSubmit={handleAddCategory}
				full={true}
			/>
		</Paper>
	);
}

export default connect(
	({ content: { categories } }) => ({ categories }),
	(dispatch) => ({
		getCategories() {
			dispatch(getCategories());
		},
		updateCategory(id, category) {
			dispatch(updateCategoryAction(id, category));
		},
		deleteCategory(id) {
			dispatch(deleteCategory(id));
		},
		addCategory(category) {
			dispatch(addCategory(category));
		},
	})
)(Categories);
