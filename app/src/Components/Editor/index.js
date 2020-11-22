import React from "react";

const LazyEditor = React.lazy(() => import("../../Components/Editor/Editor"));

export default function Editor(props) {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<LazyEditor {...props} />
		</React.Suspense>
	);
}
