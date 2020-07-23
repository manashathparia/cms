import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add";
import { addCategory, getCategories } from "../../Actions/category.actions";
import { updateCategory } from "../../Actions/editor.actions";

const styles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",

		borderRadius: "3px",
		width: "100%",
		marginTop: "10px",
		border: "1px solid rgba(0, 0, 0, 0.23)",
	},
	formControl: {
		margin: theme.spacing(),
		minWidth: 120,
		maxWidth: 300,
		width: "100%",
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: theme.spacing(4),
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
	width: {
		width: "100%",
		paddingTop: 0,
		paddingBottom: 0,
	},
}));

export const AddCategoryDialog = ({ open, onClose, onSubmit, full }) => {
	const [category, handleCategoryChange] = useState("");
	const [description, handleDescriptionChange] = useState("");

	const submitAndClear = () => {
		handleCategoryChange("");
		handleDescriptionChange("");
		onSubmit({ category, description });
	};
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Category</DialogTitle>
			<DialogContent>
				<TextField
					margin="dense"
					id="add_category"
					label="Category"
					type="text"
					fullWidth
					value={category}
					onChange={(e) => handleCategoryChange(e.target.value)}
					//eslint-disable-next-line
					autoFocus={true}
					error={false}
				/>
				{full && (
					<TextField
						margin="dense"
						id="add_category_description"
						label="Description"
						type="text"
						fullWidth
						multiline
						value={description}
						onChange={(e) => handleDescriptionChange(e.target.value)}
						error={false}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={submitAndClear} color="primary">
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const Category = ({
	getCategories,
	editorCategories,
	categories,
	handleChange,
	addCategory,
}) => {
	const [promptState, tooglePrompt] = useState(false);
	const [expanded, toogleExpanded] = useState(false);

	useEffect(() => {
		getCategories();
	}, [getCategories]);
	useEffect(() => {
		if (editorCategories.length <= 0) {
			categories.forEach((cat) => {
				if (cat.category === "Uncategorised") {
					console.log(cat);
					handleChange(cat._id);
				}
			});
		}
	}, [categories, editorCategories.length, handleChange]);
	const handleAddCategoryDialog = () => tooglePrompt(!promptState);
	const toggleCategories = () => toogleExpanded(!expanded);

	const handleAddCategory = async (category) => {
		if (category.category === "") {
			return;
		}

		addCategory(category);

		handleAddCategoryDialog();
	};

	const checkedCategories = (id) => {
		let checked = false;
		for (let i = 0; i < editorCategories?.length; i++) {
			if (editorCategories[i] === id) {
				checked = true;
			}
		}
		return checked;
	};

	const classes = styles();
	const Ico = expanded ? ExpandLess : ExpandMore;
	return (
		<div className={classes.root}>
			<List className={classes.width}>
				<ListItem button onClick={toggleCategories}>
					<ListItemText
						disableTypography
						color="inherit"
						style={{ color: "gray" }}
						primary="Categories"
					/>
					<Ico style={{ color: "gray" }} size={22} />
				</ListItem>
			</List>

			<Collapse className={classes.width} in={expanded}>
				<List>
					<ListItem button onClick={handleAddCategoryDialog}>
						<ListItemText disableTypography primary="Add category" />
						<Add />
					</ListItem>
					{categories.map((category) => (
						<ListItem style={{ height: "40px" }} key={category._id}>
							<FormControlLabel
								control={<CheckBox />}
								value={category._id}
								label={category.category}
								style={{ padding: 0 }}
								onChange={() => handleChange(category._id)}
								checked={checkedCategories(category._id)}
							/>
						</ListItem>
					))}
				</List>
			</Collapse>
			<AddCategoryDialog
				open={promptState}
				onClose={handleAddCategoryDialog}
				onSubmit={handleAddCategory}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	categories: state.content.categories,
	editorCategories: state.editor.category,
});
const mapDispatchToProps = (dispatch) => ({
	addCategory: (category) => dispatch(addCategory(category)),
	getCategories: () => dispatch(getCategories()),
	handleChange: (category) => dispatch(updateCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
