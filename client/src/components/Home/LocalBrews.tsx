import axios from "axios";
import { useState, useEffect } from "react";
import BreweryCard from "../Cards/BreweryCard";

function LocalBrews() {
	const [localData, setLocalData] = useState([]);
	const [postalCode, setPostalCode] = useState("Bethlehem");

	const getLocalBrews = async () => {
		try {
			const response = await axios.get(
				`https://api.openbrewerydb.org/v1/breweries?by_city=${postalCode}&per_page=4`
			);
			setLocalData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLocalBrews();
	}, []);

	return (
		<>
			<div className="col-md-12 mt-4">
				<span className="heading-title">
					Breweries Nearby ({localData.length})
				</span>
				<div className="row">
					{localData.map((brewery) => (
						<BreweryCard brewery={brewery} />
					))}
				</div>
			</div>
		</>
	);
}

export default LocalBrews;
