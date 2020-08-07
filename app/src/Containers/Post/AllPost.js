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
import Button from "@material-ui/core/Button";
import Comment from "@material-ui/icons/CommentTwoTone";
import { withStyles } from "@material-ui/core/styles";
import MLink from "@material-ui/core/Link";
import {
	updateAllPosts,
	deletePosts,
	trashPosts,
} from "../../Actions/allPosts.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeHeaderHeading } from "../../Actions/navigationActions";

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(3),
		overflowX: "hide",
	},
	table: {
		minWidth: 340,
	},
	tableCell: {
		paddingRight: 10,
		paddingLeft: 10,
	},
	link: {
		paddingRight: "10px",
		color: "#3f51b5",
		textDecoration: "none",
		fontSize: "15px",
	},
	tableCellHead: {
		fontSize: "2em",
	},
	actionBar: {
		width: "100%",
		padding: 10,
	},
	mdLink: {
		fontSize: "15px",
		padding: "5px",
	},
});

const ActionBar = ({
	classes,
	selected,
	handleDelete,
	show,
	handleShow,
	count,
	remove,
}) => {
	return (
		<div className={classes.actionBar}>
			<div>
				<MLink
					onClick={() => handleShow("published,draft")}
					component="button"
					className={classes.mdLink}
				>
					All ({count["published,draft"]})
				</MLink>
				<MLink
					onClick={() => handleShow("published")}
					component="button"
					className={classes.mdLink}
				>
					Published ({count.published})
				</MLink>
				<MLink
					onClick={() => handleShow("draft")}
					component="button"
					className={classes.mdLink}
				>
					Draft ({count.draft})
				</MLink>
				<MLink
					onClick={() => handleShow("trashed")}
					component="button"
					className={classes.mdLink}
				>
					Trash ({count.trashed})
				</MLink>
			</div>
			<Button
				color="secondary"
				variant="contained"
				disabled={!selected.length > 0}
				style={{ float: "right" }}
				onClick={handleDelete}
			>
				{remove ? "Remove" : "Trash"}
			</Button>
		</div>
	);
};

function AllPosts({
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
		document.title = "All posts";
		updateHeading("All Posts");
	}, [updateHeading]);

	useEffect(() => {
		getPosts(show, page, perPage);
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
		trashPosts(selected, show);
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

	const tableOptions = [
		"Title",
		"Category",
		"State",
		"Author",
		<Comment style={{ color: "rgba(0, 0, 0, 0.87)" }} />,
		"Date",
	];

	const _posts = posts[show][page];
	const count =
		show === "published,draft"
			? postsCount.published + postsCount.draft
			: postsCount[show];

	const isTrash = show === "trashed";
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
				<Table>
					<TableHead className={classes.tableCellHead}>
						<TableRow>
							<TableCell padding="checkbox">
								<CheckBox checked={allSelected} onChange={handleAllSelect} />
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
										title={`Edit ${post.title}`}
										className={classes.link}
										to={"/posts/edit/" + post._id}
									>
										{post.title}
									</Link>
								</TableCell>

								<TableCell className={classes.tableCell}>
									{console.log(post)}
									{Array.isArray(post.category)
										? post.category.map(
												(category, i) =>
													category && (
														<React.Fragment key={category?._id || i}>
															{/* <Link
																style={{
																	textDecoration: "none",
																	color: "#3f51b5",
																}}
																key={category._id}
																to={`category/${category.category}`}
															> */}
															{category.category}
															{/* </Link> */}
															{post.category.length > 1 &&
															i !== post.category.length - 1
																? ", "
																: ""}
														</React.Fragment>
													)
										  )
										: null}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{post.status}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{post.author?.username}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{post.comments?.length}
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
									onChangePage={(e, p) => changePage(p)}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									count={count}
								/>
							)}
						</TableRow>
					</TableBody>
				</Table>
				{loading ? (
					<div style={{ padding: "20px", textAlign: "center" }}>
						<CircularProgress />
					</div>
				) : _posts?.length === 0 ? (
					<div style={{ padding: "20px", textAlign: "center" }}>
						<h1>NO POSTS</h1>
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
	getPosts(status, page, perPage) {
		dispatch(updateAllPosts(status, page, perPage));
	},
	trashPosts(ids, status) {
		dispatch(trashPosts(ids, status));
	},
	deletePosts(ids) {
		dispatch(deletePosts(ids));
	},
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
});

const AllPostsPageWithStyles = withStyles(styles)(AllPosts);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPostsPageWithStyles);
