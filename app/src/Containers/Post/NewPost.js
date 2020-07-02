import React, { useEffect } from "react";
import Editor from "../../Components/Editor";

export default function NewPost() {
	useEffect(() => {
		document.title = "New Post";
	}, []);

	return (
		<div>
			<Editor />
		</div>
	);
}
