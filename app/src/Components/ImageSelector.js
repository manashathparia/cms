import React, { useEffect, useState } from "react";
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
	fileUploadOverlay: {
		height: "100%",
		position: "absolute",
		width: "100%",
		background: "#c4c4c4",
		zIndex: 9,
		opacity: 0.4,
		textAlign: "center",
	},
	progressIcon: {
		position: "absolute",
		margin: "auto",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
}));

const DetailsSidebar = ({ image, button, action }) => {
	const [title, updateTitle] = useState("");
	const [altTxt, updateAltTxt] = useState("");
	const [caption, updateCaption] = useState("");
	const [description, updateDescription] = useState("");

	useEffect(() => {
		updateTitle(image.title || "");
		updateAltTxt(image.alt_text || "");
		updateCaption(image.caption || "");
		updateDescription(image.description || "");
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
					Size: {image.size && `${Math.round(image.size / 1024)} KB`}
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
				disabled={!image.path}
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
						<DetailsSidebar action={(f) => f} image={image} button="save" />
					</div>
				</Grid>
			</Grid>
		</Dialog>
	);
};

function ImageSelector({ images, loadImages, uploadImage }) {
	const [selectedImage, updateSelectedImage] = useState({});
	const [dialog, toggleDialog] = useState(false);
	const [uploading, toggleUpoading] = useState(false);

	useEffect(() => {
		loadImages();
	}, [loadImages]);

	const classes = useStyles();

	const handleFileUpload = (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		const f = (f, error) => {
			if (error) return toggleUpoading(false);
			updateSelectedImage(f);
			toggleDialog(true);
			toggleUpoading(false);
		};
		toggleUpoading(true);
		uploadImage(formData, f);
	};

	const loadImage = (image) => {
		updateSelectedImage(image);
		handleDialogClose();
	};

	const handleDialogClose = () => toggleDialog(!dialog);

	return (
		<div className={classes.root}>
			<div
				style={{
					width: "100%",
					borderBottom: "1px solid lightgray",
					padding: 10,
				}}
			>
				<Typography display="inline" variant="h6">
					Image Gallery
				</Typography>
				<ImageUploadButton
					uploadHandler={handleFileUpload}
					style={{ marginLeft: 10 }}
				/>
			</div>
			<GridList cellHeight={160} cols={5}>
				{uploading ? (
					<GridListTile>
						<div style={{ padding: 10 }}>
							<div className={classes.fileUploadOverlay}>
								<CircularProgress className={classes.progressIcon} />
							</div>
						</div>
					</GridListTile>
				) : null}
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
		</div>
	);
}

const ImageUploadButton = ({ uploadHandler, style }) => {
	return (
		<Button
			//onClick={() => inputRef.current.click()}
			style={style}
			variant="outlined"
		>
			<label>
				<input
					onChange={uploadHandler}
					type="file"
					style={{ display: "none" }}
					accept="image/*"
				/>
				Upload
			</label>
		</Button>
	);
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Imageinserter = ({
	show,
	onClose,
	images,
	handleInsert,
	loadImages,
	uploadImage,
}) => {
	const [selectedImage, updateSelectedImage] = useState({});
	const [uploading, toggleUploading] = useState(false);

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

	const uploadHandler = (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		toggleUploading(true);
		uploadImage(formData, (img) => {
			toggleUploading(false);
			updateSelectedImage(img);
		});
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
					<ImageUploadButton
						uploadHandler={uploadHandler}
						style={{ bottom: 2 }}
					/>
					<IconButton
						style={{ float: "right", right: "10px" }}
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				</div>
			</AppBar>
			<div style={{ padding: "30px" }}></div>
			<Paper style={{ paddingLeft: 5 }}>
				<Grid container>
					<Grid item sm={8} xs={12}>
						<GridList cellHeight={160} cols={5}>
							{uploading ? (
								<GridListTile>
									<div style={{ padding: 10 }}>
										<div className={classes.fileUploadOverlay}>
											<CircularProgress className={classes.progressIcon} />
										</div>
									</div>
								</GridListTile>
							) : null}
							{images.map((image) => (
								<GridListTile
									className={classes.container}
									key={image._id}
									cols={image.cols || 1}
									onClick={() => updateSelectedImage(image)}
									style={{
										border:
											image._id === selectedImage._id ? "1.5px solid" : "0",
										borderRadius: "3px",
									}}
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
