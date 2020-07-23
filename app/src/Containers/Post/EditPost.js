import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";

const LazyEditor = React.lazy(() => import("../../Components/Editor"));

function EditPost({ updateHeading }) {
	useEffect(() => {
		document.title = "Edit Post";
		updateHeading("Edit Post");
	}, [updateHeading]);

	return (
		<div>
			<React.Suspense fallback={<div>LOADING...</div>}>
				<LazyEditor edit={true} />
			</React.Suspense>
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(EditPost);
