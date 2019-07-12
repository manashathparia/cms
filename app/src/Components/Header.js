import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toogleDrawer } from "../Actions/navigationActions";

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "absolute",
		zIndex: 9999999
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

function Header(props) {
	const classes = useStyles();

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
					<Typography variant="h6" noWrap>
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default connect(
	null,
	dispatch => ({
		toogleDrawer() {
			dispatch(toogleDrawer());
		}
	})
)(Header);
