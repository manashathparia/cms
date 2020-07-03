import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add";
import {
	addCategory,
	updateaAllCategories,
} from "../../Actions/category,actions";
import { updateCategory } from "../../Actions/editorActions";

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

const Category = (props) => {
	const [addCategoryValue, handleAddCategoryValue] = useState("");
	const [promptState, tooglePrompt] = useState(false);
	const [expanded, toogleExpanded] = useState(false);

	useEffect(() => {
		props.getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleAddCategoryDialog = () => tooglePrompt(!promptState);
	const toggleCategories = () => toogleExpanded(!expanded);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") handleAddCategory();
		return;
	};

	const handleAddCategory = async () => {
		if (addCategoryValue === "") {
			return;
		}
		const res = await Axios.post("/api/categories", {
			category: addCategoryValue,
		});
		if (res.status === 200) {
			props.addCategory(res.data.data);
		}
		handleAddCategoryDialog();
	};

	const checkedCategories = (id) => {
		const categories = props.editorCategory;
		let checked = false;
		for (let i = 0; i < categories?.length; i++) {
			if (categories[i]._id === id) {
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
					{props.categories.map((category) => (
						<ListItem style={{ height: "40px" }} key={category._id}>
							<FormControlLabel
								control={<CheckBox />}
								value={category._id}
								label={category.category}
								style={{ padding: 0 }}
								onChange={() => props.handleChange(category)}
								checked={checkedCategories(category._id)}
							/>
						</ListItem>
					))}
				</List>
			</Collapse>

			<Dialog
				open={promptState}
				onClose={handleAddCategoryDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add Category</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						id="add_category"
						label="Category"
						type="text"
						fullWidth
						onKeyDown={handleKeyPress}
						value={addCategoryValue}
						onChange={(e) => handleAddCategoryValue(e.target.value)}
						//eslint-disable-next-line
						autoFocus={true}
						error={false}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddCategoryDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddCategory} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => ({
	categories: state.content.categories,
	editorCategory: state.editor.category,
});
const mapDispatchToProps = (dispatch) => ({
	addCategory: (category) => dispatch(addCategory(category)),
	getCategories: () => dispatch(updateaAllCategories()),
	handleChange: (category) => dispatch(updateCategory(category)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Category);
