import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Loading from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper, Button } from "@material-ui/core";
import axios from "../utils/axios";
import { connect } from "react-redux";
import { newNotification } from "../Actions/notification.actions";

const useStyles = makeStyles(() => ({
	TextField: {
		width: "93%",
		display: "block",
		marginBottom: "20px",
		margin: "auto",
	},
}));

function Profile({ id, notify }) {
	const [userDetails, updateUserDetails] = useState({
		username: "",
		fullName: "",
		email: "",
		avatar: "",
		bio: "",
		password: "",
	});
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		axios
			.get(`/api/auth/user/${"5f09b842e57d4d0d9dd5036b"}`)
			.then(({ data }) => updateUserDetails({ ...userDetails, ...data }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateUser = () => {
		toggleLoading(true);
		axios
			.put(`/api/auth/user/${"5f09b842e57d4d0d9dd5036b"}`, userDetails)
			.then(() => {
				toggleLoading(false);
				notify({
					varient: "success",
					message: "Profile updated successfully",
					show: true,
				});
			})
			.catch((e) => {
				toggleLoading(false);
				notify({
					varient: "error",
					message: "Someting went wrong",
					show: true,
				});
			});
	};

	const styles = useStyles();

	return (
		<div>
			<Grid container={true} style={{ padding: "20px" }}>
				<Grid xs={12} lg={2} style={{ textAlign: "center" }} item={true}>
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
				<Grid xs={12} lg={6} item={true}>
					<div>
						<TextField
							label="Name"
							fullWidth
							variant="outlined"
							value={userDetails.fullName}
							className={styles.TextField}
							onChange={(e) =>
								updateUserDetails({ ...userDetails, fullName: e.target.value })
							}
						/>
						<TextField
							disabled
							label="Username"
							fullWidth
							variant="outlined"
							value={userDetails.username}
							className={styles.TextField}
							onChange={(e) =>
								updateUserDetails({ ...userDetails, username: e.target.value })
							}
						/>
						<TextField
							label="Email"
							fullWidth
							variant="outlined"
							value={userDetails.email}
							className={styles.TextField}
							onChange={(e) =>
								updateUserDetails({ ...userDetails, email: e.target.value })
							}
						/>
						<TextField
							label="Bio"
							fullWidth
							variant="outlined"
							value={userDetails.bio}
							type="text"
							multiline
							className={styles.TextField}
							onChange={(e) =>
								updateUserDetails({ ...userDetails, bio: e.target.value })
							}
						/>
						<Button
							onClick={updateUser}
							variant="outlined"
							style={{ float: "right" }}
						>
							{loading ? <Loading size={25} /> : "Update"}
						</Button>
					</div>
				</Grid>
				<Grid xs={12} lg={4} item={true}>
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

export default connect(
	({ profile: { id } }) => ({ id }),
	(dispatch) => ({
		notify: (notification) => dispatch(newNotification(notification)),
	})
)(Profile);
