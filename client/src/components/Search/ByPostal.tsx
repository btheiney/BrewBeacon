import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BreweryCard from "../Cards/BreweryCard";

function ByPostal() {
	const { postal } = useParams();
	const [postalData, setPostalData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.openbrewerydb.org/v1/breweries?by_postal=${postal}`
			);
			console.log(response.data);
			setPostalData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="col-md-12 mt-4">
				<span className="heading-title">
					Breweries In {postal} ({postalData.length})
				</span>
				<div className="row">
					<div className="row">
						{postalData.map((brewery) => (
							<BreweryCard brewery={brewery} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default ByPostal;
