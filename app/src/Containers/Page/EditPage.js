import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";

const LazyEditor = React.lazy(() => import("../../Components/Editor"));

function EditPage({ updateHeading }) {
	useEffect(() => {
		document.title = "Edit Page";
		updateHeading("Edit Page");
	}, [updateHeading]);

	return (
		<div>
			<React.Suspense fallback={<div>LOADING...</div>}>
				<LazyEditor edit={true} page={true} />
			</React.Suspense>
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(EditPage);
