import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreVert from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import CheckBox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { updateAllPosts, deletePosts } from "../../Actions/allPosts.actions";
import { connect } from "react-redux";

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
});

const ActionBar = ({ className, selected, handleDelete, show, handleShow }) => {
	return (
		<div className={className}>
			<Select
				value={show}
				onChange={handleShow}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}
			>
				<MenuItem value={'["published", "draft"]'}>
					All (Published + Draft)
				</MenuItem>
				<MenuItem value={'["published"]'}>Published</MenuItem>
				<MenuItem value={'["draft"]'}>Draft</MenuItem>
				<MenuItem value={'["trash"]'}>Trash</MenuItem>
			</Select>

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

function AllPosts({ getPosts, classes, posts, deletePosts }) {
	useEffect(() => {
		document.title = "All posts";
		getPosts();
	}, []);

	const [selected, _handleSelect] = useState([]);
	const [allSelected, _handleAllSelect] = useState(false);
	const [show, updateShow] = React.useState('["published", "draft"]');

	const handleShow = (e) => {
		updateShow(e.target.value);
	};

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
					className={classes.actionBar}
					show={show}
					handleShow={handleShow}
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
													<a
														style={{ textDecoration: "none" }}
														key={category._id}
														href={`category/${category.category}`}
													>
														{category.category}
													</a>
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
	posts,
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
