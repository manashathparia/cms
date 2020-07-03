import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	container: {
		cursor: "pointer",
		padding: "10px !important",
	},
	dialog: {
		[theme.breakpoints.up("lg")]: {
			width: "1200px",
			height: "700px",
		},
	},
	header: {
		position: "relative",
		height: "50px",
		background: "white",
		[theme.breakpoints.up("sm")]: { padding: "0 20px" },
	},
	img: {
		maxHeight: "580px",
		maxWidth: "700px",
		[theme.breakpoints.down("xs")]: {
			maxWidth: "300px",
			maxHeight: "100px",
		},
		[theme.breakpoints.down("sm")]: {
			maxWidth: "400px",
			maxHeight: "300px",
		},
	},
	textField: {
		marginBottom: "15px",
	},
}));

export default function ImageSelector() {
	const [images, updateImages] = useState([]);
	const [selectedImage, updateSelectedImage] = useState({});
	const [dialog, toggleDialog] = useState(false);

	useEffect(() => {
		axios("/api/media/").then(({ data }) => updateImages(data));
	}, []);

	const classes = useStyles();

	const loadImage = (image) => {
		updateSelectedImage(image);
		handleDialogClose();
	};
	const handleDialogClose = () => toggleDialog(!dialog);

	return (
		<div className={classes.root}>
			<GridList cellHeight={160} cols={5}>
				{images.map((tile) => (
					<GridListTile
						className={classes.container}
						key={tile._id}
						cols={tile.cols || 1}
						onClick={() => loadImage(tile)}
					>
						<img src={`http://localhost:8080/${tile.path}`} alt={tile.title} />
					</GridListTile>
				))}
			</GridList>
			<Dialog maxWidth="xl" onClose={handleDialogClose} open={dialog}>
				<div>
					<AppBar className={classes.header}>
						<div>
							<Typography
								style={{
									display: "inline-block",
									margin: 10,
								}}
								variant="h6"
								color="textSecondary"
							>
								Attachment Details
							</Typography>
							<IconButton
								onClick={handleDialogClose}
								style={{ float: "right" }}
							>
								<Close />
							</IconButton>
						</div>
					</AppBar>
				</div>
				<Grid className={classes.dialog} container={true}>
					<Grid item xs={12} sm={8}>
						<div style={{ padding: "10px", textAlign: "center" }}>
							<img
								className={classes.img}
								src={`http://localhost:8080/${selectedImage.path}`}
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={4}>
						<div style={{ padding: "20px" }}>
							<div style={{ marginBottom: "30px" }}>
								<Typography color="textSecondary" style={{ fontSize: "small" }}>
									File name: {selectedImage.filename}
								</Typography>
								<Typography color="textSecondary" style={{ fontSize: "small" }}>
									File type: {selectedImage.mimetype}
								</Typography>
								<Typography color="textSecondary" style={{ fontSize: "small" }}>
									Size: {Math.round(selectedImage.size / 1024)} KB
								</Typography>
							</div>
							<div>
								<TextField
									label="Alternative Text"
									fullWidth
									className={classes.textField}
									variant="outlined"
								/>
								<br />
								<TextField
									label="Caption"
									fullWidth
									multiline
									className={classes.textField}
									variant="outlined"
								/>
								<TextField
									label="Description"
									fullWidth
									multiline
									value={selectedImage.description}
									className={classes.textField}
									variant="outlined"
								/>
								<TextField
									label="path"
									fullWidth
									value={selectedImage.path}
									disabled
									multiline
									className={classes.textField}
									variant="outlined"
								/>
								<Button variant="outlined">Save</Button>
							</div>
						</div>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	);
}
