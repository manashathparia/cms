import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckBox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import MLink from "@material-ui/core/Link";
import { updateAllPosts, deletePosts } from "../../Actions/allPosts.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing.unit * 3,
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
		color: "black",
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
}) => {
	return (
		<div className={classes.actionBar}>
			<div>
				<MLink
					onClick={() => handleShow('["published", "draft"]')}
					component="button"
					className={classes.mdLink}
				>
					All ({count.published + count.draft})
				</MLink>
				<MLink
					onClick={() => handleShow('["published"]')}
					component="button"
					className={classes.mdLink}
				>
					Published ({count.published})
				</MLink>
				<MLink
					onClick={() => handleShow('["draft"]')}
					component="button"
					className={classes.mdLink}
				>
					Draft ({count.draft})
				</MLink>
				<MLink
					onClick={() => handleShow('["trash"]')}
					component="button"
					className={classes.mdLink}
				>
					Trash ({count.trash})
				</MLink>
			</div>
			<Button
				color="secondary"
				variant="contained"
				disabled={!selected.length > 0}
				style={{ float: "right" }}
				onClick={handleDelete}
			>
				Trash
			</Button>
		</div>
	);
};

function AllPosts({ getPosts, classes, posts, deletePosts, postsCount }) {
	useEffect(() => {
		document.title = "All posts";
		getPosts();
	}, [getPosts]);

	const [selected, _handleSelect] = useState([]);
	const [allSelected, _handleAllSelect] = useState(false);
	const [show, updateShow] = React.useState('["published", "draft"]');

	const handleSelect = (id) => {
		if (selected.includes(id)) {
			const a = selected.filter((a) => (a === id ? false : true));
			_handleAllSelect(false);
			return _handleSelect(a);
		}
		posts?.length === selected.length + 1
			? _handleAllSelect(true)
			: _handleAllSelect(false);
		_handleSelect([...selected, id]);
	};

	const handleAllSelect = () => {
		if (!allSelected) {
			const arr = [];
			posts.forEach((post) => {
				arr.push(post._id);
			});
			_handleAllSelect(true);
			_handleSelect(arr);
			return;
		}
		_handleAllSelect(false);
		_handleSelect([]);
	};

	const handleDelete = () => {
		deletePosts(selected);
		_handleSelect([]);
		_handleAllSelect(false);
	};

	const tableOptions = ["Title", "Category", "State", "Author", "Updated"];

	const filteredPosts = posts?.filter((post) => {
		const a = JSON.parse(show);
		return a.includes(post.status);
	});

	return (
		<div>
			<Paper className={classes.root}>
				<ActionBar
					selected={selected}
					handleDelete={handleDelete}
					classes={classes}
					show={show}
					handleShow={updateShow}
					count={postsCount}
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
						{filteredPosts.map((post, i) => (
							<TableRow key={post.slug + i}>
								<TableCell padding="checkbox">
									<CheckBox
										checked={selected.includes(post._id)}
										onChange={() => handleSelect(post._id)}
									/>
								</TableCell>
								<TableCell className={classes.tableCell}>
									<Link className={classes.link} to={"/posts/edit/" + post._id}>
										{post.title}
									</Link>
								</TableCell>

								<TableCell className={classes.tableCell}>
									{Array.isArray(post.category)
										? post.category.map((category, i) => (
												<React.Fragment>
													<MLink
														style={{ textDecoration: "none" }}
														key={category._id}
														href={`category/${category.category}`}
													>
														{category.category}
													</MLink>
													{post.category.length > 1 &&
													i !== post.category.length - 1
														? ", "
														: ""}
												</React.Fragment>
										  ))
										: null}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{post.status}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{post.author}
								</TableCell>

								<TableCell className={classes.tableCell}>
									{post.updatedAt.split(",")[0]}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{filteredPosts.length === 0 ? (
					<div style={{ padding: "20px", textAlign: "center" }}>
						<h1>No Posts</h1>
					</div>
				) : null}
			</Paper>
		</div>
	);
}

const mapStateToProps = ({ content: { posts } }) => ({
	posts: posts.posts,
	postsCount: posts.count,
});

const mapDispatchToProps = (dispatch) => ({
	getPosts() {
		dispatch(updateAllPosts());
	},
	deletePosts(ids) {
		dispatch(deletePosts(ids));
	},
});

const AllPostsPageWithStyles = withStyles(styles)(AllPosts);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPostsPageWithStyles);
