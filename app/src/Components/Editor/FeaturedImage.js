import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Add from "@material-ui/icons/Add";

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

export default function FeaturedImage(props) {
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

	async function readImage(e) {
		const img = await readFile(e.target.files[0]);
		updateImage(
			<img alt="" style={{ width: "100%", height: "100%" }} src={img} />
		);
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
						onChange={readImage}
					/>

					{image}
				</div>
			</label>
		</div>
	);
}
