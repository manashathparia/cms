import React, { useEffect } from "react";
import { connect } from "react-redux";
import Editor from "../../Components/Editor";
import { changeHeaderHeading } from "../../Actions/navigationActions";

function EditPage({ updateHeading }) {
	useEffect(() => {
		document.title = "Edit Page";
		updateHeading("Edit Page");
	}, [updateHeading]);

	return <Editor edit={true} page={true} />;
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(EditPage);
