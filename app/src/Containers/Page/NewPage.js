import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../../Actions/navigationActions";

//import Editor from "../../Components/Editor";

const LazyEditor = React.lazy(() => import("../../Components/Editor"));

function NewPage({ updateHeading }) {
	useEffect(() => {
		document.title = "New Page";
		updateHeading("New Page");
	}, [updateHeading]);

	return (
		<div>
			<React.Suspense fallback={<div>LOADING...</div>}>
				<LazyEditor page={true} />
			</React.Suspense>
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(NewPage);
