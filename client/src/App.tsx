import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";
import Search from "./components/Search/Search";

import { MemberProvider } from "./contexts/MemberContext";

import HomePage from "./components/Home/HomePage";
import ByState from "./components/Search/ByState";
import ByCity from "./components/Search/ByCity";
import ByPostal from "./components/Search/ByPostal";

function App() {
	return (
		<Router>
			<MemberProvider>
				<NavBar />
				<div className="container mt-5">
					<div className="row justify-content-center">
						<Search />

						<Routes>
							<Route path="/" Component={HomePage} />
							<Route path="/search">
								<Route path="state/:state" element={<ByState />} />
								<Route path="city/:city" element={<ByCity />} />
								<Route path="postal/:postal" element={<ByPostal />} />
								<Route path="*" element={<HomePage />} />
							</Route>
						</Routes>
					</div>
				</div>
			</MemberProvider>
		</Router>
	);
}

export default App;
