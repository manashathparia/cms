import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import Wysiwyg from "./wysiwyg";
import {
	submitPost,
	updateEditorBody,
	updateEditorTitle,
	updateEditorSlug,
	saveDraft,
	clearEditor,
	loadPostToEditor
} from "../../Actions/editorActions";
import FeaturedImage from "./FeaturedImage";
import Categories from "./categories";
import Tags from "./tags";
import { bindActionCreators } from "redux";

const capitalize = s => {
	if (typeof s !== "string") return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
};

function Editor({ edit, initilizeEditor, clearEditorOnExit, ...props }) {
	const postID = props.path.split("/")[3];
	//It is to determine if the slug is edited or not, if not then it is binded with title
	const [slugChanged, changed] = useState(props.slug.length > 0 ? true : false);

	// different submit url for different forms i.e Edit Post and New Post
	const [submitUrl] = useState(
		edit ? [`/api/posts/${postID}`, "put"] : ["/api/posts", "post"]
	);

	useEffect(() => {
		if (edit) {
			initilizeEditor(postID);
		}
		return clearEditorOnExit;
	}, [edit, initilizeEditor, clearEditorOnExit, postID]);

	function handleSlugChange(e) {
		if (!slugChanged) changed(true);
		props.handleSlugChange(e);
	}

	return (
		<Grid container>
			<Grid item xs={12} sm={10}>
				<TextField
					value={props.title}
					onChange={e => props.handleTitleUpdate(e, slugChanged)}
					fullWidth
					variant="outlined"
					label="Title"
				/>
				<div style={{ height: "10px" }}></div>
				<Wysiwyg body={props.body} onChange={props.handleEditorChange} />
				<div style={{ height: "10px" }}></div>
				<TextField
					value={props.slug}
					onChange={handleSlugChange}
					fullWidth
					variant="outlined"
					label="slug"
				/>
			</Grid>
			<Grid style={{ padding: "10px", paddingTop: 0 }} item xs={12} sm={2}>
				<FeaturedImage />
				<Categories />
				<Tags />
				<br />
				<FormControlLabel
					control={
						<Checkbox
							checked={props.saveDraft}
							onChange={props.handleStatusChange}
						></Checkbox>
					}
					label="Draft"
				/>
				<br />
				<Button
					variant="outlined"
					onClick={() => props.handleSubmit(...submitUrl)}
				>
					{props.saveDraft ? "Save Draft" : "Publish"}
				</Button>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = ({ editor, router }) => ({
	body: editor.body,
	title: editor.title,
	slug: editor.slug,
	saveDraft: editor.saveDraft,
	path: router.location.pathname
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			handleEditorChange: updateEditorBody,
			handleStatusChange: saveDraft,
			handleSubmit: submitPost,
			clearEditorOnExit: clearEditor,
			initilizeEditor: loadPostToEditor
		},
		dispatch
	),

	handleTitleUpdate(e, slugChanged) {
		const title = capitalize(e.target.value);
		if (!slugChanged) {
			dispatch(updateEditorTitle(title));
			this.handleSlugChange(e);
		} else {
			dispatch(updateEditorTitle(title));
		}
	},
	handleSlugChange(e) {
		dispatch(
			updateEditorSlug(e.target.value.replace(/\s/g, "-").toLowerCase())
		);
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Editor);
