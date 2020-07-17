import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MDLink from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import { getComments, updateComment } from "../Actions/comments.acctions";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
	menuRoot: {
		boxShadow:
			"0px 5px 5px -3px rgba(252, 241, 241, 0.2), 0px 8px 10px 1px rgba(231, 222, 222, 0.14), 0px 3px 14px 2px rgba(182, 177, 177, 0.12)",
	},
	link: {
		margin: theme.spacing(0.5),
	},
}));

const Comments = ({ comments, getComments, updateComment }) => {
	useEffect(() => {
		getComments();
		document.title = "Comments";
	}, [getComments]);

	const [edit, _toggleEdit] = useState("");
	const [author, handleAuthor] = useState("");
	const [content, handleContent] = useState("");

	const toggleEdit = (id, _author, _content) => {
		if (edit === id) {
			updateComment(id, { authorName: author, content });
			_toggleEdit("");
			handleAuthor("");
			handleContent("");
			return;
		}
		_toggleEdit(id);
		handleContent(_content);
		handleAuthor(_author);
	};

	const toggleStatus = (id, status) => {
		updateComment(id, {
			status: status === "approved" ? "waiting" : "approved",
		});
	};

	const tableHead = ["Author", "Comment", "In Respose To", "Status", "Date"];

	const classes = styles();
	return (
		<Paper>
			<Table>
				<TableHead>
					<TableRow>
						{tableHead.map((c) => (
							<TableCell key={c}>{c}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{comments.map((comment) => (
						<React.Fragment key={comment._id}>
							<TableRow
								style={{
									background:
										comment.status === "waiting" ? "gainsboro" : "initial",
								}}
							>
								<TableCell>
									{edit === comment._id ? (
										<TextField
											onChange={(e) => handleAuthor(e.target.value)}
											value={author}
										/>
									) : (
										comment.authorName
									)}
								</TableCell>
								<TableCell>
									{edit === comment._id ? (
										<TextField
											fullWidth
											multiline
											onChange={(e) => handleContent(e.target.value)}
											value={content}
										/>
									) : (
										comment.content
									)}
									<div>
										<MDLink
											onClick={() => toggleStatus(comment._id, comment.status)}
											href="#"
											className={classes.link}
										>
											{comment.status === "waiting" ? "Approve" : "Unapprove"}
										</MDLink>
										<MDLink
											onClick={() =>
												toggleEdit(
													comment._id,
													comment.authorName,
													comment.content
												)
											}
											href="#"
											className={classes.link}
										>
											{edit === comment._id ? "Save" : "Edit"}
										</MDLink>
										<MDLink
											//onClick={() => toggleStatus(comment._id, comment.status)}
											href="#"
											className={classes.link}
										>
											Trash
										</MDLink>
									</div>
								</TableCell>
								<TableCell>
									<Link to={`/posts/edit/${comment.responseTo._id}`}>
										{comment.responseTo?.title}
									</Link>
								</TableCell>
								<TableCell>{comment.status}</TableCell>
								<TableCell>{comment.date.split("T")[0]}</TableCell>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

const mapStateToProps = ({ comments: { comments } }) => ({ comments });

const mapDispatchToProps = (dispatch) => ({
	getComments: () => {
		dispatch(getComments());
	},
	updateComment(id, comment) {
		dispatch(updateComment(id, comment));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
