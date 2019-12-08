import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Wysiwyg from "./wysiwyg";
import {
	updateEditorBody,
	updateEditorTitle,
	updateEditorSlug
} from "../../Actions/editorActions";
import FeaturedImage from "./FeaturedImage";
import Categories from "./categories";

const capitalize = s => {
	if (typeof s !== "string") return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
};

function Editor(props) {
	const [slugChanged, changed] = useState(props.slug.length > 0 ? true : false);

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
			</Grid>
		</Grid>
	);
}

const mapStateToProps = ({ editor }) => ({
	body: editor.body,
	title: editor.title,
	slug: editor.slug
});

const mapDispatchToProps = dispatch => ({
	handleEditorChange(state) {
		dispatch(updateEditorBody(state));
	},
	handleTitleUpdate(e, slugChanged) {
		const val = capitalize(e.target.value);
		if (!slugChanged) {
			dispatch(updateEditorTitle(val));
			dispatch(updateEditorSlug(val.replace(/\s/g, "-").toLowerCase()));
		} else {
			dispatch(updateEditorTitle(val));
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
