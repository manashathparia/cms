import React, { useEffect } from "react";
//import Editor from "../../Components/Editor";

const LazyEditor = React.lazy(() => import("../../Components/Editor"));

export default function EditPost() {
	useEffect(() => {
		document.title = "New Post";
	}, []);

	return (
		<div>
			<React.Suspense fallback={<div>LOADING...</div>}>
				<LazyEditor />
			</React.Suspense>
		</div>
	);
}
