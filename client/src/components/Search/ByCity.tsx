import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BreweryCard from "../Cards/BreweryCard";

function ByCity() {
	const { city } = useParams();
	const [cityData, setCityData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.openbrewerydb.org/v1/breweries?by_city=${city}`
			);
			console.log(response.data);
			setCityData(response.data);
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
					Breweries In {city} ({cityData.length})
				</span>
				<div className="row">
					<div className="row">
						{cityData.map((brewery) => (
							<BreweryCard brewery={brewery} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default ByCity;
