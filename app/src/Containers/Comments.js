import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MDLink from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CheckBox from "@material-ui/core/CheckBox";
import MLink from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import {
	getComments,
	updateComment,
	trashComments,
} from "../Actions/comments.acctions";
import { Link } from "react-router-dom";
import { changeHeaderHeading } from "../Actions/navigationActions";
// import categories from "../Components/Editor/categories";

const styles = makeStyles((theme) => ({
	menuRoot: {
		boxShadow:
			"0px 5px 5px -3px rgba(252, 241, 241, 0.2), 0px 8px 10px 1px rgba(231, 222, 222, 0.14), 0px 3px 14px 2px rgba(182, 177, 177, 0.12)",
	},
	link: {
		margin: theme.spacing(0.5),
	},
	actionBar: {
		width: "100%",
		padding: 10,
	},
	mdLink: {
		fontSize: "15px",
		padding: "5px",
	},
}));

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
					onClick={() => handleShow("approvedAndWaiting")}
					component="button"
					className={classes.mdLink}
				>
					All ({count.approvedAndWaiting})
				</MLink>
				<MLink
					onClick={() => handleShow("approved")}
					component="button"
					className={classes.mdLink}
				>
					Approved ({count.approved})
				</MLink>
				<MLink
					onClick={() => handleShow("waiting")}
					component="button"
					className={classes.mdLink}
				>
					Waiting ({count.waiting})
				</MLink>
				<MLink
					onClick={() => handleShow("trashed")}
					component="button"
					className={classes.mdLink}
				>
					Trashed ({count.trashed})
				</MLink>
			</div>

			<Button
				color="secondary"
				variant="contained"
				disabled={!selected.length > 0}
				style={{ float: "right" }}
				onClick={console.log}
			>
				{remove ? "Remove" : "Trash"}
			</Button>
		</div>
	);
};

const Comments = ({
	comments,
	getComments,
	updateComment,
	trashComment,
	count,
	updateHeading,
	loading,
}) => {
	const [edit, _toggleEdit] = useState("");
	const [author, handleAuthor] = useState("");
	const [content, handleContent] = useState("");
	const [showPage, updateShowPage] = useState("approvedAndWaiting");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [allSelected, _handleAllSelect] = useState(false);
	const [selected, _handleSelect] = useState([]);

	useEffect(() => {
		getComments(showPage, page, rowsPerPage);
		document.title = "Comments";
		updateHeading("Comments");
	}, [getComments, page, rowsPerPage, showPage, updateHeading]);

	const toggleEdit = (id, _author, _content) => {
		if (edit === id) {
			updateComment(id, { authorName: author, content }, showPage, page);
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
		updateComment(
			id,
			{
				status: status === "approved" ? "waiting" : "approved",
			},
			showPage,
			page
		);
	};

	const handleSelect = (id) => {
		if (selected.includes(id)) {
			const a = selected.filter((a) => (a === id ? false : true));
			_handleAllSelect(false);
			return _handleSelect(a);
		}
		comments[showPage][page].length === selected.length + 1
			? _handleAllSelect(true)
			: _handleAllSelect(false);
		_handleSelect([...selected, id]);
	};

	const handleAllSelect = () => {
		if (!allSelected) {
			const arr = [];
			comments[showPage][page].forEach((post) => {
				if (
					showPage
						.toLowerCase()
						.split("and")
						.includes(post.status)
				)
					arr.push(post._id);
			});
			_handleAllSelect(true);
			_handleSelect(arr);
			return;
		}
		_handleAllSelect(false);
		_handleSelect([]);
	};

	const tableHead = ["Author", "Comment", "In Respose To", "Status", "Date"];
	const _comments = comments[showPage][page];
	const classes = styles();
	return (
		<Paper>
			<ActionBar
				handleShow={updateShowPage}
				show={showPage}
				count={count}
				classes={classes}
				selected={selected}
				handleDelete={() => trashComments(selected)}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox">
							<CheckBox checked={allSelected} onChange={handleAllSelect} />
						</TableCell>
						{tableHead.map((c) => (
							<TableCell key={c}>{c}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{_comments.map((comment) => (
						<React.Fragment key={comment._id}>
							<TableRow
								style={{
									background:
										comment.status === "waiting" ? "gainsboro" : "initial",
								}}
							>
								<TableCell padding="checkbox">
									<CheckBox
										onChange={() => handleSelect(comment._id)}
										checked={selected.includes(comment._id)}
									/>
								</TableCell>
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
											{comment.status === "approved" ? "Unapprove" : "Approve"}
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
											Reply
										</MDLink>
										<MDLink
											onClick={() => trashComment(comment._id)}
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
			{loading ? (
				<div style={{ padding: "20px", textAlign: "center" }}>
					<CircularProgress />
				</div>
			) : _comments?.length === 0 ? (
				<div style={{ padding: "20px", textAlign: "center" }}>
					<h1>NO COMMENTS</h1>
				</div>
			) : null}
		</Paper>
	);
};

const mapStateToProps = ({ comments: { comments, count }, notification }) => ({
	comments,
	count,
	loading: notification.loading,
});

const mapDispatchToProps = (dispatch) => ({
	getComments: (...args) => {
		dispatch(getComments(...args));
	},
	updateComment(...args) {
		dispatch(updateComment(...args));
	},
	trashComment(ids) {
		dispatch(trashComments(ids));
	},
	updateHeading(heading) {
		dispatch(changeHeaderHeading(heading));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
