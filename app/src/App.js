import React, { useEffect, useState } from "react";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MuiThemeProvider } from "@material-ui/core/styles";
// import manrope from "./fonts/manrope";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Content from "./Components/Content";
import Routes from "./Routes";
import Notification from "./Components/Notification";
import AuthCheck from "./Components/AuthCheck";
import "./App.css";
import axios from "./utils/axios";
import { useDispatch } from "react-redux";
import {
	UPDATE_PAGE_COUNT,
	UPDATE_POSTS_COUNT,
} from "./Actions/allPosts.actions";
import { UPDATE_COMMENTS_COUNT } from "./Actions/comments.acctions";
import { getCategories } from "./Actions/category.actions";

function App() {
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	// const theme = React.useMemo(
	// 	() =>
	// 		createMuiTheme({
	// 			palette: {
	// 				type: prefersDarkMode ? "light" : "light",
	// 			},
	// 			typography: {
	// 				fontFamily: "Manrope, Arial",
	// 			},
	// 			overrides: {
	// 				MuiCssBaseline: {
	// 					"@global": {
	// 						"@font-face": [manrope],
	// 					},
	// 				},
	// 			},
	// 		}),
	// 	[prefersDarkMode]
	// );
	const [counts, updateCounts] = useState({});

	const dispatch = useDispatch();
	useEffect(() => {
		axios.get("/api/stats").then(({ data }) => {
			dispatch({ type: UPDATE_POSTS_COUNT, payload: data.totalPosts });
			dispatch({ type: UPDATE_COMMENTS_COUNT, payload: data.totalComments });
			dispatch({ type: UPDATE_PAGE_COUNT, payload: data.totalPages });
			updateCounts(data);
		});
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<div style={{ display: "flex", height: "100%" }}>
			<MuiThemeProvider
			// theme={theme}
			>
				<AuthCheck />
				<Header />
				<SideBar />
				<Content>
					<Routes counts={counts} />
				</Content>
				<Notification />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
