import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { updateAllPosts } from "../../Actions/contentActionCreators/allPostsActions";
import { connect } from "react-redux";

const styles = theme => ({
	root: {
		display: "flex",
		marginTop: theme.spacing.unit * 3,
		overflowX: "hide"
	},
	table: {
		minWidth: 340
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5
	},
	link: {
		paddingRight: "10px",
		color: "black",
		textDecoration: "none",
		fontSize: "15px"
	}
});

function AllPosts({ getPosts, classes, posts }) {
	useEffect(() => {
		document.title = "All posts";
		getPosts();
	}, [getPosts]);

	return (
		<div>
			{posts.length > 0 ? (
				<Paper className={classes.root}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableCell}>Title</TableCell>
								<TableCell className={classes.tableCell}>State</TableCell>
								<TableCell className={classes.tableCell}>Category</TableCell>
								<TableCell className={classes.tableCell}>Author</TableCell>
								<TableCell className={classes.tableCell}>Created</TableCell>
								<TableCell className={classes.tableCell}>Updated</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{posts.map((post, i) => (
								<TableRow key={post.slug + i}>
									<TableCell className={classes.tableCell}>
										<Link
											className={classes.link}
											to={"/posts/edit/" + post._id}
										>
											{post.title}
										</Link>
									</TableCell>
									<TableCell className={classes.tableCell}>
										{post.status}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{Array.isArray(post.category)
											? post.category.map(category => (
													<a key={category._id} href={category.category}>
														{category.category}
													</a>
											  ))
											: null}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{post.author}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{post.createdAt.split(",")[0]}
									</TableCell>
									<TableCell className={classes.tableCell}>
										{post.updatedAt.split(",")[0]}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			) : null}
		</div>
	);
}

const mapStateToProps = ({ content: { posts } }) => ({
	posts
});

const mapDispatchToProps = dispatch => ({
	getPosts() {
		dispatch(updateAllPosts());
	}
});

const AllPostsPageWithStyles = withStyles(styles)(AllPosts);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPostsPageWithStyles);
