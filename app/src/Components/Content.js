import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";

const styles = makeStyles(theme => ({
	toolbar: theme.mixins.toolbar,
	content: {
		[theme.breakpoints.up("sm")]: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginLeft: -240
		}
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
}));

function Content({ children, drawerOpen }) {
	const classes = styles();
	return (
		<main
			style={{ paddingTop: "0 !important", padding: "14px" }}
			className={clsx(classes.content, {
				[classes.contentShift]: drawerOpen
			})}
		>
			<div className={classes.toolbar} />
			{children}
		</main>
	);
}

export default connect(({ navigation }) => ({
	drawerOpen: navigation.desktopDrawerOpen
}))(Content);
