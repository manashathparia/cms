import React, { useEffect } from "react";
import ImageSelector from "../Components/ImageSelector";

export default function MediaPage() {
	useEffect(() => {
		document.title = "Media";
	}, []);
	return (
		<div>
			<ImageSelector />
		</div>
	);
}
