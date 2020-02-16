import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import applyStyle from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/TextField";
import Label from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { addTag, deleteTag } from "../../Actions/editorActions";

const styles = () => ({
	parent: {
		width: "95%",
		marginTop: "10px",
		border: "0.5px solid #ccc",
		borderRadius: "2px"
	},
	div: {
		padding: "10px"
	},
	inputDiv: { padding: "0 5px" },
	chip: {
		marginBottom: "5px",
		marginLeft: "auto",
		marginRight: "auto"
	}
});

const Tags = props => {
	const [tagValue, tagChange] = useState("");

	const handleTagChange = e => {
		tagChange(e.target.value);
	};

	const handleKeyPress = e => {
		if (e.charCode === 13) {
			e.preventDefault();
			if (props.tags.includes(tagValue)) return;
			props.handleAddTag(tagValue);
			tagChange("");
		}
	};

	const { classes, handleDeleteTag, tags } = props;
	return (
		<div className={classes.parent}>
			<div className={classes.div}>
				<Label>Tags</Label>
			</div>
			<div className={classes.chipsDiv}>
				{Array.isArray(tags)
					? tags.map(tag => (
							<Chip
								key={tag}
								label={tag}
								onDelete={() => handleDeleteTag(tag)}
							/>
					  ))
					: null}
			</div>
			<div className={classes.inputDiv}>
				<Input
					//autoComplete={['hello']}
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

const mapStateToProps = state => ({
	tags: state.editor.tags
});

const mapDispatchToProps = dispatch => ({
	handleAddTag(tag) {
		dispatch(addTag(tag));
	},
	handleDeleteTag(tag) {
		dispatch(deleteTag(tag));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(applyStyle(styles)(Tags));
