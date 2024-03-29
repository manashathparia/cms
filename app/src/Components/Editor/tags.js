import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import applyStyle from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/TextField";
import Label from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTag, deleteTag } from "../../Actions/editor.actions";

const styles = () => ({
	parent: {
		width: "100%",
		marginTop: "10px",
		border: "0.5px solid #ccc",
		borderRadius: "2px",
	},
	div: {
		padding: "10px",
	},
	chip: {
		marginBottom: "5px",
		marginLeft: "auto",
		marginRight: "auto",
	},
});

const Tags = (props) => {
	const [tagValue, tagChange] = useState("");

	const handleTagChange = (e) => {
		tagChange(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.charCode === 13) {
			e.preventDefault();
			if (props.tags.includes(tagValue)) return;
			props.addTag(tagValue);
			tagChange("");
		}
	};

	const { classes, deleteTag, tags } = props;
	return (
		<div className={`${classes.parent} tags`}>
			{" "}
			{/* adding aditional class to use global CSS. refer to ./app.css */}
			<div className={classes.div}>
				<Label>Tags</Label>
			</div>
			<div className={classes.chipsDiv}>
				{Array.isArray(tags)
					? tags.map((tag) => (
							<Chip key={tag} label={tag} onDelete={() => deleteTag(tag)} />
					  ))
					: null}
			</div>
			<div className={classes.inputDiv}>
				<Input
					onKeyPress={handleKeyPress}
					value={tagValue}
					onChange={handleTagChange}
					label="Add tags"
					style={{ width: "100%" }}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	tags: state.editor.tags,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ addTag, deleteTag }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(applyStyle(styles)(Tags));
