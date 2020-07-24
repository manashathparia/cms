import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Add from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { updateEditorFeaturedImage } from "../../Actions/editor.actions";
import { ImageInserter } from "../ImageSelector";

function FeaturedImage({ featuredImage, updateToEditor }) {
	const AddIcon = (
		<Add
			style={{
				position: "absolute",
				top: "35%",
				bottom: "45%",
				color: "gray",
				left: "40%",
			}}
			fontSize="large"
		/>
	);
	const [image, updateImage] = useState(AddIcon);
	const [showImageInserter, toggleImageInserter] = useState(false);

	useEffect(() => {
		if (featuredImage.url) {
			const Img = (
				<img
					width="100%"
					height="100%"
					alt={featuredImage.altText}
					src={featuredImage.url}
				/>
			);
			updateImage(Img);
		} else {
			updateImage(AddIcon);
		}
	}, [AddIcon, featuredImage]);

	const handleImageInsert = (img) => {
		updateImage(
			<img width="100%" height="100%" alt={img.alt_text} src={`/${img.path}`} />
		);
		updateToEditor({
			url: `/${img.path}`,
			altText: img.alt_text,
		});
	};

	return (
		<div>
			<InputLabel>Featured Image</InputLabel>
			<label htmlFor="featuredImage">
				<div
					onClick={() => toggleImageInserter(!showImageInserter)}
					style={{
						border: "1px solid rgba(0, 0, 0, 0.23)",
						height: "130px",
						marginTop: "5px",
						borderRadius: "2px",
						position: "relative",
						cursor: "pointer",
					}}
				>
					{image}
				</div>
			</label>
			<ImageInserter
				show={showImageInserter}
				onClose={() => toggleImageInserter(!showImageInserter)}
				handleInsert={handleImageInsert}
			/>
		</div>
	);
}

export default connect(
	(state) => ({
		featuredImage: state.editor.featuredImage,
	}),
	(dispatch) => ({
		updateToEditor: (url) => dispatch(updateEditorFeaturedImage(url)),
	})
)(FeaturedImage);
