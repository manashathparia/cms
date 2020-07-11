import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingScreen() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				flexDirection: "column",
			}}
		>
			<Typography variant="h2">Node CMS</Typography>
			<div>
				{" "}
				<CircularProgress />
			</div>
		</div>
	);
}
