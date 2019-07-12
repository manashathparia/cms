import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toogleDrawer } from "../Actions/navigationActions";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	toolbar: theme.mixins.toolbar,
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	}
}));

function SideBar(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div style={{ zIndex: 9 }}>
			<CssBaseline />
			<nav aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="js">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={props.navigation.mobileDrawerOpen}
						onClose={props.toogleDrawer}
						classes={{
							paper: classes.drawerPaper
							//toolbar: classes.toolbar
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						className={classes.drawer}
						variant="persistent"
						open={props.navigation.desktopDrawerOpen}
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

export default connect(
	({ navigation }) => ({
		navigation
	}),
	dispatch => ({
		toogleDrawer() {
			dispatch(toogleDrawer());
		}
	})
)(SideBar);
