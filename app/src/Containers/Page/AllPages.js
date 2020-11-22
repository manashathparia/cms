import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import {
	updateAllPosts,
	deletePosts,
	trashPosts,
} from "../../Actions/allPosts.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeHeaderHeading } from "../../Actions/navigationActions";
import { ActionBar, styles } from "../Post/AllPost";

function AllPages({
	getPosts,
	classes,
	posts,
	trashPosts,
	postsCount,
	deletePosts,
	loading,
	updateHeading,
}) {
	const [selected, _handleSelect] = useState([]);
	const [allSelected, _handleAllSelect] = useState(false);
	const [show, _updateShow] = React.useState("published,draft");
	const [perPage, setPerPage] = useState(10);
	const [page, changePage] = useState(0);

	useEffect(() => {
		document.title = "All Pages";
		updateHeading("All Pages");
	}, [updateHeading]);

	useEffect(() => {
		getPosts(show, page, perPage, "page");
	}, [getPosts, page, perPage, show]);

	const handleSelect = (id) => {
		if (selected.includes(id)) {
			const a = selected.filter((a) => (a === id ? false : true));
			_handleAllSelect(false);
			return _handleSelect(a);
		}
		posts[show][page].length === selected.length + 1
			? _handleAllSelect(true)
			: _handleAllSelect(false);
		_handleSelect([...selected, id]);
	};

	const handleAllSelect = () => {
		if (!allSelected) {
			const arr = [];
			posts[show][page].forEach((post) => {
				if (show.split(",").includes(post.status)) arr.push(post._id);
			});
			_handleAllSelect(true);
			_handleSelect(arr);
			return;
		}
		_handleAllSelect(false);
		_handleSelect([]);
	};

	const updateShow = (t) => {
		setPerPage(10);
		changePage(0);
		_updateShow(t);
	};

	const handlePostsTrash = () => {
		trashPosts(selected, page, show);
		_handleSelect([]);
		_handleAllSelect(false);
	};

	const handlePostsDelete = () => {
		const overConfident = window.confirm("Are you sure you won't regret this?");
		if (overConfident) deletePosts(selected);
	};
	const handleChangeRowsPerPage = (event) => {
		setPerPage(parseInt(event.target.value, 10));
		changePage(0);
	};

	const tableOptions = ["Title", "State", "Author", "Date"];

	const _posts = posts[show][page].filter((post) => post.type === "page");
	const count =
		show === "published,draft"
			? postsCount.published + postsCount.draft
			: postsCount[show];

	const isTrash = show === "trashed";

	if (_posts?.length <= 0) {
		return (
			<div style={{ padding: "20px", textAlign: "center" }}>
				<h1>NO PAGES</h1>
			</div>
		);
	}
	return (
		<div>
			<Paper className={classes.root}>
				<ActionBar
					selected={selected}
					handleDelete={isTrash ? handlePostsDelete : handlePostsTrash}
					classes={classes}
					show={show}
					handleShow={updateShow}
					count={postsCount}
					remove={isTrash}
				/>
				<div className={classes.tableContainer}>
					<Table>
						<TableHead className={classes.tableCellHead}>
							<TableRow>
								<TableCell padding="checkbox">
									<CheckBox
										disabled={_posts.length < 1}
										checked={allSelected}
										onChange={handleAllSelect}
									/>
								</TableCell>
								{tableOptions.map((option) => (
									<TableCell
										key={option}
										style={{ fontSize: "0.875rem" }}
										className={classes.tableCell}
									>
										{option}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{_posts?.map((post, i) => (
								<TableRow key={post.slug + i}>
									<TableCell padding="checkbox">
										<CheckBox
											checked={selected.includes(post._id)}
											onChange={() => handleSelect(post._id)}
										/>
									</TableCell>
									<TableCell className={classes.tableCell}>
										<Link
											title={`Edit: ${post.title}`}
											className={classes.link}
											to={"/pages/edit/" + post._id}
										>
											{post.title}
										</Link>
									</TableCell>

									<TableCell className={classes.tableCell}>
										{post.status}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{post.author?.username}
									</TableCell>

									<TableCell className={classes.tableCell}>
										{post.date?.split(",")[0]}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								{_posts?.length > 0 && (
									<TablePagination
										rowsPerPageOptions={[10, 20, 30]}
										page={page}
										rowsPerPage={perPage}
										onChangePage={(e, p) => {
											_handleSelect([]);
											changePage(p);
										}}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										count={count}
									/>
								)}
							</TableRow>
						</TableBody>
					</Table>
				</div>
				{loading ? (
					<div style={{ padding: "20px", textAlign: "center" }}>
						<CircularProgress />
					</div>
				) : null}
			</Paper>
		</div>
	);
}

const mapStateToProps = ({ posts, notification }) => ({
	posts: posts.data,
	postsCount: posts.count,
	loading: notification.loading,
});

const mapDispatchToProps = (dispatch) => ({
	getPosts(...args) {
		dispatch(updateAllPosts(...args));
	},
	trashPosts(ids, page, status) {
		dispatch(trashPosts(ids, page, status));
	},
	deletePosts(ids) {
		dispatch(deletePosts(ids));
	},
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AllPages));
