import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";
import Editor from "../../Components/Editor";

function NewPage({ updateHeading }) {
	useEffect(() => {
		document.title = "New Page";
		updateHeading("New Page");
	}, [updateHeading]);

	return <Editor page={true} />;
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(NewPage);
