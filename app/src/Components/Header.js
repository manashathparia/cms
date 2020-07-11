import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toogleDrawer } from "../Actions/navigationActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	appBar: {
		background: "#6200ee",
		zIndex: 99,
		[theme.breakpoints.down("sm")]: {
			zIndex: 9999,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
}));

function Header(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const menuOpen = Boolean(anchorEl);
	const classes = useStyles();

	const handleClose = () => setAnchorEl(null);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={props.toogleDrawer}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
						Node CMS
					</Typography>
					<div>
						<IconButton
							onClick={(e) => setAnchorEl(e.currentTarget)}
							title={props.profile?.username}
							color="inherit"
						>
							<Avatar>
								{props.profile.avatar ||
									props.profile?.username[0]?.toUpperCase()}
							</Avatar>
						</IconButton>

						<Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
							<MenuItem onClick={handleClose}>
								<Link to="/profile" style={{ textDecoration: "none" }}>
									Profile
								</Link>
							</MenuItem>
							<MenuItem onClick={handleLogout}>Log Out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default connect(
	({ profile }) => ({ profile }),
	(dispatch) => ({
		toogleDrawer() {
			dispatch(toogleDrawer());
		},
	})
)(Header);
