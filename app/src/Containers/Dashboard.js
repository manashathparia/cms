import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderHeading } from "../Actions/navigationActions";

function Dashboard({ updateHeading }) {
	useEffect(() => {
		document.title = "Dashboard";
		updateHeading("Dashboard");
	});
	return <div></div>;
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(Dashboard);
