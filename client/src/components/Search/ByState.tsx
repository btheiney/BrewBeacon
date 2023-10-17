import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BreweryCard from "../Cards/BreweryCard";

function ByState() {
	const { state } = useParams();
	const [stateData, setStateData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.openbrewerydb.org/v1/breweries?by_state=${state}`
			);
			console.log(response.data);
			setStateData(response.data);
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
					Breweries In {state} ({stateData.length})
				</span>
				<div className="row">
					{stateData.map((brewery) => (
						<BreweryCard brewery={brewery} />
					))}
				</div>
			</div>
		</>
	);
}

export default ByState;
