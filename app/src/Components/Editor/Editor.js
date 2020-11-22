import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Wysiwyg from "./wysiwyg";
import {
	submitPost,
	updateEditorBody,
	updateEditorTitle,
	updateEditorSlug,
	updateStatus,
	clearEditor,
	loadPostToEditor,
} from "../../Actions/editor.actions";
import FeaturedImage from "./FeaturedImage";
import Categories from "./categories";
import Tags from "./tags";
import { bindActionCreators } from "redux";

const capitalize = (s) => {
	if (typeof s !== "string") return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
};

function Editor({ edit, initilizeEditor, clearEditorOnExit, page, ...props }) {
	const editorRef = useRef();

	const postID = props.path.split("/")[3];
	//It is to determine if the slug is edited or not, if not then it is binded with title
	const [slugChanged, changed] = useState(
		props.slug?.length > 0 ? true : false
	);

	// different submit url for different forms i.e Edit Post and New Post
	const [submitUrl] = useState(
		edit ? [`/api/posts/${postID}`, "put"] : ["/api/posts", "post"]
	);

	const [showImageSelector, toggleImageSelector] = useState(false);

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
	const submitDisabled = !props.title || !props.slug;
	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={12} sm={10}>
					<TextField
						value={props.title}
						onChange={(e) => props.handleTitleUpdate(e, slugChanged, edit)}
						fullWidth
						variant="outlined"
						label="Title"
					/>
					<div style={{ height: "10px" }}></div>
					<Wysiwyg
						refs={editorRef}
						toggleImageSelector={() => toggleImageSelector(!showImageSelector)}
						body={props.body}
						onChange={props.handleEditorChange}
					/>
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
					{!page ? (
						<>
							<Categories />
							<Tags />
						</>
					) : null}

					<br />
					<div>
						<Select
							value={props.status}
							onChange={(e) => props.handleStatusChange(e.target.value)}
							displayEmpty
							style={{ width: "100%" }}
						>
							<MenuItem value={"draft"}>Draft</MenuItem>
							<MenuItem value={"published"}>Publish</MenuItem>
							<MenuItem value={"trashed"}>Trash</MenuItem>
						</Select>
					</div>
					<br />
					<Button
						variant="outlined"
						disabled={submitDisabled}
						onClick={() =>
							props.handleSubmit(...submitUrl, page ? "page" : "post")
						}
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

const mapStateToProps = ({ editor, router, profile }) => ({
	body: editor.body,
	title: editor.title,
	slug: editor.slug,
	category: editor.category,
	saveDraft: editor.saveDraft,
	path: router.location.pathname,
	status: editor.status,
	author: profile.id,
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			handleEditorChange: updateEditorBody,
			handleStatusChange: updateStatus,
			handleSubmit: submitPost,
			clearEditorOnExit: clearEditor,
			initilizeEditor: loadPostToEditor,
		},
		dispatch
	),

	handleTitleUpdate(e, slugChanged, edit) {
		const title = capitalize(e.target.value);
		if (!slugChanged && !edit) {
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
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
