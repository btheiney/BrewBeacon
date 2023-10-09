import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={HomePage} />
			</Routes>
		</Router>
	);
}

export default App;
