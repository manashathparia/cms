import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";
import Editor from "../../Components/Editor";

function EditPost({ updateHeading }) {
	useEffect(() => {
		document.title = "Edit Post";
		updateHeading("Edit Post");
	}, [updateHeading]);

	return <Editor edit={true} />;
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(EditPost);
