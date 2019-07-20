import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Dashboard from "@material-ui/icons/Dashboard";
import Description from "@material-ui/icons/Description";
import Comment from "@material-ui/icons/Comment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
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
	},
	item: {
		padding: "0",
		margin: "0 14px",
		paddingLeft: "6px",
		width: "90%",
		borderRadius: "4px",
		height: "40px"
	},
	link: {
		color: "black",
		textDecoration: "none"
	}
}));

const menuItems = [
	{
		name: "Dashboard",
		icon: Dashboard,
		to: "/"
	},
	{
		name: "Posts",
		icon: Description,
		child: [
			{
				name: "New post",
				to: "/posts/new"
			},
			{
				name: "All Posts",
				to: "/posts/all"
			}
		]
	},
	{
		name: "Comments",
		icon: Comment,
		to: "/comments"
	}
];

function SideBar(props) {
	const { container } = props;

	const [openNo, changeOpenNo] = useState(0);

	const handleDropdown = num => {
		const no = openNo === num ? 0 : num;
		changeOpenNo(no);
	};

	const classes = useStyles();
	const theme = useTheme();

	const items = (
		<div>
			<div className={classes.toolbar}></div>
			<Divider />
			<List>
				{menuItems.map(({ icon: Icon, ...item }, index) =>
					item.child ? (
						<div key={item.name}>
							<br />
							<Typography variant="body1" component="div">
								<ListItem
									onClick={() => handleDropdown(index + 1)}
									className={classes.item}
									button
								>
									<ListItemIcon>
										<Icon size={22} />
									</ListItemIcon>
									<ListItemText disableTypography={true} primary={item.name} />
									{openNo === index + 1 ? (
										<ExpandLess
											size="22"
											style={{ color: "rgba(0, 0, 0, 0.87)" }}
										/>
									) : (
										<ExpandMore
											size="22"
											style={{ color: "rgba(0, 0, 0, 0.87)" }}
										/>
									)}
								</ListItem>
							</Typography>
							{item.child.map(nested => (
								<Collapse
									in={openNo === index + 1}
									timeout="auto"
									unmountOnExit
									key={nested.name}
								>
									<List component="div" disablePadding>
										<Typography variant="body1" component="div">
											<Link className={classes.link} to={nested.to}>
												<ListItem button className={classes.item}>
													<ListItemText
														disableTypography={false}
														inset
														primary={nested.name}
													/>
												</ListItem>
											</Link>
										</Typography>
									</List>
								</Collapse>
							))}
						</div>
					) : (
						<Typography key={item.name} variant="body1" component="div">
							<Link className={classes.link} to={item.to}>
								<br />
								<ListItem className={classes.item} button>
									<ListItemIcon>
										<Icon size={23} />
									</ListItemIcon>
									<ListItemText disableTypography={true} primary={item.name} />
								</ListItem>
							</Link>
						</Typography>
					)
				)}
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
						{items}
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
						{items}
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
