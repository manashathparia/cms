import React from "react";
//import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import manrope from "./fonts/manrope";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Content from "./Components/Content";
import Routes from "./Routes";
import "./App.css";
import Notification from "./Components/Notification";

function App() {
	//const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: /*prefersDarkMode ? "dark" : */ "light",
				},
				//typography: {
				//	fontFamily: "Manrope, Arial",
				//},
				overrides: {
					MuiCssBaseline: {
						"@global": {
							"@font-face": [manrope],
						},
					},
				},
			}),
		[]
	);

	return (
		<div style={{ display: "flex" }}>
			<MuiThemeProvider theme={theme}>
				<Header />
				<SideBar />
				<Content>
					<Routes />
				</Content>
				<Notification />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
