import React, { useEffect, useState, useRef } from "react";
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
import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loadImages, uploadImage } from "../Actions/media.actions";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

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
		paddingRight: "0 !important",
		[theme.breakpoints.up("sm")]: { paddingLeft: "20px" },
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
	fab: {
		position: "fixed",
		bottom: "20px",
		right: "70px",
		[theme.breakpoints.down("sm")]: {
			right: "10px",
		},
	},
	uploadIcon: {
		marginRight: theme.spacing(1),
	},
	headerTitle: {
		display: "inline-block",
		margin: 10,
	},
	inserterDialog: {
		zIndex: 9999,
		[theme.breakpoints.down("sm")]: {
			zIndex: "99999999999999 !important",
		},
	},
}));

const DetailsSidebar = ({ image, button, action }) => {
	const [title, updateTitle] = useState("");
	const [altTxt, updateAltTxt] = useState("");
	const [caption, updateCaption] = useState("");
	const [description, updateDescription] = useState("");

	useEffect(() => {
		updateTitle(image.title);
		updateAltTxt(image.alt_text);
		updateCaption(image.caption);
		updateDescription(image.description);
	}, [image]);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div style={{ marginBottom: "30px" }}>
				<Typography color="textSecondary" style={{ fontSize: "small" }}>
					File name: {image.filename}
				</Typography>
				<Typography color="textSecondary" style={{ fontSize: "small" }}>
					File type: {image.mimetype}
				</Typography>
				<Typography color="textSecondary" style={{ fontSize: "small" }}>
					Size: {Math.round(image.size / 1024)} KB
				</Typography>
				<Typography color="textSecondary" style={{ fontSize: "small" }}>
					Path: {image.path}
				</Typography>
			</div>
			<TextField
				label="Title"
				fullWidth
				className={classes.textField}
				variant="outlined"
				value={title}
				onChange={(e) => updateTitle(e.target.value)}
			/>
			<TextField
				label="Alternative Text"
				fullWidth
				value={altTxt}
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateAltTxt(e.target.value)}
			/>
			<br />
			<TextField
				label="Caption"
				fullWidth
				value={caption}
				multiline
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateCaption(e.target.value)}
			/>
			<TextField
				label="Description"
				fullWidth
				multiline
				value={description}
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateDescription(e.target.value)}
			/>
			<Button
				variant="outlined"
				onClick={() =>
					action({
						title,
						alt_text: altTxt,
						caption,
						description,
						...image,
					})
				}
			>
				{button}
			</Button>
		</React.Fragment>
	);
};

const AttachmentDetails = ({ handleDialogClose, open, image }) => {
	const classes = useStyles();

	return (
		<Dialog
			style={{ zIndex: 9999999 }}
			maxWidth="xl"
			onClose={handleDialogClose}
			open={open}
		>
			<div>
				<AppBar className={classes.header}>
					<div>
						<Typography
							className={classes.headerTitle}
							variant="h6"
							color="textSecondary"
						>
							Attachment Details
						</Typography>
						<IconButton onClick={handleDialogClose} style={{ float: "right" }}>
							<Close />
						</IconButton>
					</div>
				</AppBar>
			</div>
			<Grid className={classes.dialog} container={true}>
				<Grid item xs={12} sm={8}>
					<div
						style={{
							padding: "10px",
							textAlign: "center",
						}}
					>
						<img
							className={classes.img}
							src={`http://localhost:8080/${image.path}`}
							alt=""
						/>
					</div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<div style={{ padding: "20px" }}>
						<DetailsSidebar image={image} button="save" />
					</div>
				</Grid>
			</Grid>
		</Dialog>
	);
};

function ImageSelector({ images, loadImages, uploadImage }) {
	const [selectedImage, updateSelectedImage] = useState({});
	const [dialog, toggleDialog] = useState(false);
	const [loading, toggleLoading] = useState(false);
	const fileInput = useRef();

	useEffect(() => {
		loadImages();
		const handleFileUpload = () => {
			const formData = new FormData();
			formData.append("image", fileInput.current.files[0]);
			const f = (f) => {
				updateSelectedImage(f);
				toggleDialog(true);
				toggleLoading(false);
			};
			toggleLoading(true);
			uploadImage(formData, f);
		};
		document.querySelector("#fileInput").addEventListener("change", () => {
			handleFileUpload();
		});
	}, [loadImages, uploadImage]);

	const classes = useStyles();

	const loadImage = (image) => {
		updateSelectedImage(image);
		handleDialogClose();
	};

	const handleDialogClose = () => toggleDialog(!dialog);

	const handleActionButton = () => {
		fileInput.current.click();
	};

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
						<img
							src={`http://localhost:8080/${tile.path}`}
							style={{ boxShadow: "0px 0px 20px -5px rgba(0,0,0,0.75)" }}
							alt={tile.title}
						/>
					</GridListTile>
				))}
			</GridList>
			<AttachmentDetails
				handleDialogClose={handleDialogClose}
				open={dialog}
				image={selectedImage}
			/>
			{
				<Fab
					variant="extended"
					color="secondary"
					aria-label="add"
					className={classes.fab}
					size="medium"
					onClick={handleActionButton}
					disabled={loading}
				>
					<input
						type="file"
						accept="image"
						ref={fileInput}
						id="fileInput"
						style={{ display: "none" }}
					/>
					{!loading ? (
						<React.Fragment>
							<CloudUploadIcon className={classes.uploadIcon} /> Upload
						</React.Fragment>
					) : (
						<CircularProgress style={{ color: "white" }} size={20} />
					)}
				</Fab>
			}
		</div>
	);
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Imageinserter = ({ show, onClose, images, handleInsert, loadImages }) => {
	const [selectedImage, updateSelectedImage] = useState({});

	useEffect(() => {
		if (images.length <= 0) {
			loadImages();
		}
	}, [images, loadImages]);

	const handleClose = () => {
		onClose();
		updateSelectedImage({});
	};

	const handleInsertAndClose = (...args) => {
		handleClose();
		handleInsert(...args);
	};

	const classes = useStyles();

	return (
		<Dialog
			open={show}
			onClose={handleClose}
			fullScreen
			TransitionComponent={Transition}
			className={classes.inserterDialog}
		>
			<AppBar style={{ background: "white" }}>
				<div>
					<Typography
						className={classes.headerTitle}
						color="textSecondary"
						variant="h6"
					>
						Image Inserter
					</Typography>
					<IconButton
						style={{ float: "right", right: "10px" }}
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				</div>
			</AppBar>
			<div style={{ padding: "30px" }}></div>
			<Paper>
				<Grid container>
					<Grid item sm={8} xs={12}>
						<GridList cellHeight={160} cols={5}>
							{images.map((image) => (
								<GridListTile
									className={classes.container}
									key={image._id}
									cols={image.cols || 1}
									onClick={() => updateSelectedImage(image)}
								>
									<img
										src={`http://localhost:8080/${image.path}`}
										style={{ boxShadow: "0px 0px 20px -5px rgba(0,0,0,0.75)" }}
										alt={image.title}
									/>
								</GridListTile>
							))}
						</GridList>
					</Grid>
					<Grid item sm={4}>
						<div style={{ padding: "0 20px", position: "sticky", top: "60px" }}>
							<DetailsSidebar
								image={selectedImage}
								button="insert"
								action={handleInsertAndClose}
							/>
						</div>
					</Grid>
				</Grid>
			</Paper>
		</Dialog>
	);
};

export const ImageInserter = connect(
	({ media }) => ({ images: media.images }),
	(dispatch) => ({
		loadImages() {
			dispatch(loadImages());
		},
		uploadImage(img, cb) {
			dispatch(uploadImage(img, cb));
		},
	})
)(Imageinserter);

export default connect(
	({ media }) => ({ images: media.images }),
	(dispatch) => ({
		loadImages() {
			dispatch(loadImages());
		},
		uploadImage(img, cb) {
			dispatch(uploadImage(img, cb));
		},
	})
)(ImageSelector);
