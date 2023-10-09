import Search from "../Search/Search";
import NavBar from "../Navigation/NavBar";


function HomePage() {

	return (
		<>
		<NavBar />
			<div className="container mt-5">
				
				<div className="row d-flex justify-content-center mb-4">

					<Search />
					
				</div>
			</div>
		</>
	);
}

export default HomePage;
