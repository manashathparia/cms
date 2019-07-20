import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Wysiwyg from "./wysiwyg";

export default function Editor() {
	return (
		<Paper style={{ padding: "14px" }}>
			<Grid>
				<Grid item xs={12} sm={10}>
					<TextField fullWidth variant="outlined" label="Title" />
					<div style={{ height: "10px" }}></div>
					<Wysiwyg />
					<div style={{ height: "10px" }}></div>
					<TextField fullWidth variant="outlined" label="slug" />
				</Grid>
			</Grid>
		</Paper>
	);
}
