import React, { useEffect } from "react";
import Editor from "../../Components/Editor";

export default function EditPost() {
	useEffect(() => {
		document.title = "Edit Post";
	}, []);

	return (
		<div>
			<Editor edit={true} />
		</div>
	);
}
