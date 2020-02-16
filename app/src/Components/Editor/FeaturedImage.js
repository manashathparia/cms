import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Add from "@material-ui/icons/Add";
import axios from "axios";
import { connect } from "react-redux";
import { updateEditorFeaturedImage } from "../../Actions/editorActions";

function readFile(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			try {
				const reader = new FileReader();
				reader.addEventListener("load", () => resolve(reader.result));
				reader.readAsDataURL(file);
			} catch (e) {
				reject(e);
			}
		}
	});
}

function FeaturedImage(props) {
	const AddIcon = (
		<Add
			style={{
				position: "absolute",
				top: "35%",
				bottom: "45%",
				color: "gray",
				left: "40%"
			}}
			fontSize="large"
		/>
	);
	const [image, updateImage] = useState(props.featuredImage || AddIcon);

	async function handleUploadImage(e) {
		const file = e.target.files[0];
		try {
			const image = await readFile(file);
			updateImage(
				<img
					alt="featured"
					style={{ width: "100%", height: "100%" }}
					src={image}
				/>
			);
			let formData = new FormData();
			formData.append("image", file);
			const res = await axios.post("/api/upload/image", formData);
			props.updateToEditor(`/uploads/${res.data.filename}`);
		} catch (e) {
			updateImage(AddIcon);
		}
	}

	return (
		<div>
			<InputLabel>Featured Image</InputLabel>
			<label htmlFor="featuredImage">
				<div
					style={{
						border: "1px solid #dad5d5",
						height: "130px",
						marginTop: "5px",
						borderRadius: "2px",
						position: "relative"
					}}
				>
					<input
						accept="image/*"
						style={{ display: "none" }}
						id="featuredImage"
						type="file"
						onChange={handleUploadImage}
					/>

					{image}
				</div>
			</label>
		</div>
	);
}

export default connect(
	state => ({
		featuredImage: state.editor.featuredImage
	}),
	dispatch => ({
		updateToEditor: url => dispatch(updateEditorFeaturedImage(url))
	})
)(FeaturedImage);
