import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";
import Editor from "../../Components/Editor";

function NewPost({ updateHeading }) {
	useEffect(() => {
		document.title = "New Post";
		updateHeading("New Post");
	}, [updateHeading]);

	return <Editor />;
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(NewPost);
