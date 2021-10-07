import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { changeHeaderHeading } from "../Actions/navigationActions";
import DashCard from "../Components/DashCard";

const widgets = [
	{ name: "Posts", add: "/posts/new", view: "/posts/all" },
	{ name: "Categories", add: "/posts/categories/#new", view: "/posts/all" },
	{ name: "Pages", add: "/pages/new", view: "/pages/all" },
];

function Dashboard({ updateHeading, counts }) {
	useEffect(() => {
		document.title = "Dashboard";
		updateHeading("Dashboard");
	}, [counts, updateHeading]);

	const _counts = useSelector((state) => ({
		Posts: state.posts.count.published,
		Pages: state.posts.pageCount.published,
		Categories: state.categories.data.length,
	}));

	return (
		<div>
			{widgets.map((wid) => (
				<DashCard
					number={_counts[wid.name] || 0}
					type={wid.name}
					addLink={wid.add}
					viewLink={wid.view}
				/>
			))}
		</div>
	);
}

export default connect(null, (dispatch) => ({
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
}))(Dashboard);
