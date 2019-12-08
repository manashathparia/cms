import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";

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

export default function Content({ children }) {
	const drawerOpen = useSelector(state => state.navigation.desktopDrawerOpen);
	const classes = styles();
	return (
		<main
			style={{ padding: 0 }}
			className={clsx(classes.content, {
				[classes.contentShift]: drawerOpen
			})}
		>
			<div className={classes.toolbar} />
			<Paper style={{ padding: "14px" }}>{children}</Paper>
		</main>
	);
}
