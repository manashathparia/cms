import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../Actions/navigationActions";
import ImageSelector from "../Components/ImageSelector";

function MediaPage({ updateHeading }) {
	useEffect(() => {
		document.title = "Media";
		updateHeading("Media");
	}, [updateHeading]);
	return (
		<div>
			<ImageSelector />
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(MediaPage);
