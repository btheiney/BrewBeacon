import axios from "axios";
import { useState, useEffect } from "react";
import BreweryCard from "../Cards/BreweryCard";

function LocalBrews() {
	const [localData, setLocalData] = useState([]);
	const [perPage, setPerPage] = useState(4);

	const getLocalBrews = async (perPage) => {
		try {
			const locationResponse = await axios.get(
				"https://ipinfo.io/json?token=d44713e17fedac"
			);
			const locationData = locationResponse.data;
			const location = locationData.loc;

			if (location) {
				const response = await axios.get(
					`https://api.openbrewerydb.org/v1/breweries?by_dist=${location}&per_page=${perPage}`
				);

				setLocalData(response.data);
			} else {
				console.error("Location is empty or invalid.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadMoreBreweries = () => {
		setPerPage(perPage + 4);
		getLocalBrews(perPage);
	};

	useEffect(() => {
		getLocalBrews(perPage);
	}, [perPage]);

	return (
		<>
			<div className="col-md-12 mt-4">
				<span className="heading-title">
					Breweries Nearby ({localData.length})
				</span>
				<div className="row">
					{localData.map((brewery) => (
						<BreweryCard brewery={brewery} key={brewery.id} />
					))}
				</div>
				<button
					className="btn btn-secondary float-end"
					onClick={loadMoreBreweries}
				>
					Find More
				</button>
			</div>
		</>
	);
}

export default LocalBrews;
