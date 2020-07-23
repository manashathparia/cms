import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";

//import Editor from "../../Components/Editor";

const LazyEditor = React.lazy(() => import("../../Components/Editor"));

function EditPost({ updateHeading }) {
	useEffect(() => {
		document.title = "New Post";
		updateHeading("New Post");
	}, [updateHeading]);

	return (
		<div>
			<React.Suspense fallback={<div>LOADING...</div>}>
				<LazyEditor />
			</React.Suspense>
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(EditPost);
