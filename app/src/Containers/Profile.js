import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	TextField: {
		width: "93%",
		display: "block",
		marginBottom: "20px",
		margin: "auto",
	},
}));

export default function Profile() {
	const styles = useStyles();

	return (
		<div>
			<Grid container={true} style={{ padding: "20px" }}>
				<Grid xs={12} lg={2} style={{ textAlign: "center" }}>
					<Avatar
						style={{
							width: "100px",
							height: "100px",
							fontSize: "43px",
							margin: "auto",
						}}
					>
						M
					</Avatar>
					<Typography variant="subtitle1">Administator</Typography>
					<Button style={{ marginBottom: "20px" }} variant="outlined">
						Edit Password
					</Button>
				</Grid>
				<Grid xs={12} lg={6}>
					{/* <div style={{ height: "20px" }} /> */}
					{console.log(styles.TextField)}
					<div>
						<TextField
							// placeholder="Name"
							label="Name"
							fullWidth
							variant="outlined"
							defaultValue="Manash Athparia"
							className={styles.TextField}
						/>
						<TextField
							disabled
							label="Username"
							fullWidth
							variant="outlined"
							defaultValue="manash"
							className={styles.TextField}
						/>
						<TextField
							// placeholder="Name"
							label="Email"
							fullWidth
							variant="outlined"
							defaultValue="athmanash@gmail.com"
							className={styles.TextField}
						/>
						{/* <TextField
							// placeholder="Name"
							label="Password"
							fullWidth
							variant="outlined"
							defaultValue="test"
							type="password"
							className={styles.TextField}
						/> */}
						<TextField
							// placeholder="Name"
							label="Bio"
							fullWidth
							variant="outlined"
							defaultValue="This is a test bio"
							type="text"
							multiline
							className={styles.TextField}
						/>

						{/* <Typography variant="h6">Name: Manash Athparia</Typography> */}
					</div>
				</Grid>
				<Grid xs={12} lg={4}>
					<Paper style={{ padding: "10px" }}>
						<Typography variant="h6">Statistics</Typography>
						<Typography>Posts: 5</Typography>
						<Typography>Comments: 21</Typography>
						<Typography>Reaction Recieved: 7</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
