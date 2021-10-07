import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Add from "@material-ui/icons/Add";
import { Paper, Typography, Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = makeStyles({
	root: {
		width: 220,
		height: 210,
		// border: "1px solid",
		padding: 20,
		display: "inline-block",
		margin: 10,
	},
	number: {
		textAlign: "center",
		padding: 20,
	},
	viewAll: {
		borderRadius: 20,
		float: "right",
	},
	add: {
		borderRadius: 20,
	},
});

export default function DashCard({ number, type, addLink, viewLink }) {
	const classes = styles();
	return (
		<Paper className={classes.root}>
			<Typography variant="h6">{type}</Typography>
			<Typography className={classes.number} variant="h3">
				{number}
			</Typography>
			<Link to={addLink}>
				<Button>
					<Add />
					new
				</Button>
			</Link>

			<Link to={viewLink}>
				<Button className={classes.viewAll} variant="outlined">
					View all
				</Button>
			</Link>
		</Paper>
	);
}
