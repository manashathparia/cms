import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Delete from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loadImages, uploadImage, updateImage } from "../Actions/media.actions";
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
		maxWidth: "100%",
		[theme.breakpoints.down("xs")]: {
			maxHeight: "100px",
		},
		[theme.breakpoints.down("sm")]: {
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
			zIndex: "9999999 !important",
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
	const [data, updateData] = useState({
		title: "",
		alt_text: "",
		caption: "",
		description: "",
	});

	useEffect(() => {
		updateData({
			title: "",
			alt_text: "",
			caption: "",
			description: "",
			...image,
		});
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
				<Typography
					color="textSecondary"
					style={{ fontSize: "small", overflowY: "hidden" }}
				>
					Path: {image.path}
				</Typography>
			</div>
			<TextField
				label="Title"
				fullWidth
				className={classes.textField}
				variant="outlined"
				value={data.title}
				onChange={(e) => updateData({ ...data, title: e.target.value })}
			/>
			<TextField
				label="Alternative Text"
				fullWidth
				value={data.alt_text}
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateData({ ...data, alt_text: e.target.value })}
			/>
			<br />
			<TextField
				label="Caption"
				fullWidth
				value={data.caption}
				multiline
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateData({ ...data, caption: e.target.value })}
			/>
			<TextField
				label="Description"
				fullWidth
				multiline
				value={data.description}
				className={classes.textField}
				variant="outlined"
				onChange={(e) => updateData({ ...data, description: e.target.value })}
			/>
			<Button
				variant="outlined"
				disabled={!image.path}
				onClick={() => {
					console.log(data);
					action({
						...image,
						...data,
					});
				}}
			>
				{button}
			</Button>
			<IconButton disabled={!image.path} style={{ float: "right" }}>
				<Delete />
			</IconButton>
		</React.Fragment>
	);
};

const AttachmentDetails = ({
	handleDialogClose,
	open,
	image,
	handleDetailsUpdate,
}) => {
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
						<img className={classes.img} src={`/${image.path}`} alt="" />
					</div>
				</Grid>
				<Grid item xs={12} sm={4}>
					<div style={{ padding: "20px" }}>
						<DetailsSidebar
							action={handleDetailsUpdate}
							image={image}
							button="save"
						/>
					</div>
				</Grid>
			</Grid>
		</Dialog>
	);
};

function ImageSelector({ images, loadImages, uploadImage, updateImageData }) {
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
	const isMobile = useMediaQuery("(max-width:600px)");
	const col = isMobile ? 2.5 : 1;

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
			<GridList cellHeight={160} cols={images.length < 5 ? images.length : 5}>
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
						cols={col}
						onClick={() => loadImage(tile)}
					>
						<img
							src={`/${tile.thumbnails[0] || tile.path}`}
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
				handleDetailsUpdate={updateImageData}
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
			<Paper style={{ paddingLeft: 5, height: "100%" }}>
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
										src={`/${image.thumbnails[0] || image.path}`}
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
	({ media: { images } }) => ({ images }),
	(dispatch) => ({
		loadImages() {
			dispatch(loadImages());
		},
		uploadImage(img, cb) {
			dispatch(uploadImage(img, cb));
		},
		updateImageData(update) {
			dispatch(updateImage(update));
		},
	})
)(ImageSelector);
