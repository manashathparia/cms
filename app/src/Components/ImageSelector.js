import React, { useEffect } from "react";
import axios from "axios";

export default function ImageSelector() {
	useEffect(() => {
		axios("/");
	});
	return <div></div>;
}
