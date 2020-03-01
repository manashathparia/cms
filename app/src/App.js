import React from "react";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Content from "./Components/Content";
import Routes from "./Routes";
import "./App.css";

function App() {
	return (
		<div style={{ display: "flex" }}>
			<Header />
			<SideBar />
			<Content>
				<Routes />
			</Content>
		</div>
	);
}

export default App;
