import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/TextField";
import MdLockOutline from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MdInfoOutline from "@material-ui/icons/InboxOutlined";
import Axios from "axios";

const ErrorMessage = function() {
	return (
		<Typography style={{ padding: "10px", color: "#d50000" }} component="p">
			<span>
				<MdInfoOutline
					size="18"
					style={{
						marginRight: "5px",
						marginBottom: "-3px",
						verticalAlign: "sub",
					}}
				/>
			</span>
			Email or Password is incorrect
		</Typography>
	);
};

const styles = makeStyles((theme) => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(5))]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
	},
	avatar: {
		margin: theme.spacing(),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
}));

const SignIn = () => {
	const [email, updateEmail] = useState("");
	const [password, updatePassword] = useState("");
	const [loading, toggleLoading] = useState(false);
	const [remember, toggleRemember] = useState(false);
	const [error, toggleError] = useState(false);

	const login = async (e) => {
		e.preventDefault();
		try {
			toggleLoading(true);
			const { data } = await Axios.post("/api/auth/signin", {
				email,
				password,
				remember,
			});
			toggleLoading(false);
			localStorage.setItem("token", data.token);
			window.location.reload();
		} catch (e) {
			console.log(e.response?.data || e.message);
			toggleError(true);
			toggleLoading(false);
		}
	};

	const classes = styles();

	return (
		<main className={classes.main}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<MdLockOutline />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>

				{error ? <ErrorMessage /> : null}

				<form className={classes.form}>
					<FormControl margin="normal" required fullWidth>
						<Input
							id="email"
							name="email"
							autoComplete="email"
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus
							value={email}
							onChange={(e) => updateEmail(e.target.value)}
							label="Email Address"
							variant="outlined"
							type="email"
							error={error}
						/>
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<Input
							name="password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => updatePassword(e.target.value)}
							label="Password"
							variant="outlined"
							error={error}
						/>
					</FormControl>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
						value={remember}
						onChange={() => toggleRemember(!remember)}
					/>
					<div>
						<Button
							style={{
								float: "right",
							}}
							type="submit"
							variant="contained"
							className={classes.submit}
							onClick={login}
							color="primary"
						>
							{loading ? (
								<CircularProgress color="inherit" size={22} />
							) : (
								"Sign In"
							)}
						</Button>
					</div>
				</form>
			</Paper>
		</main>
	);
};

export default SignIn;
