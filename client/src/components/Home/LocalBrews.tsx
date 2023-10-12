import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";

function LocalBrews() {
	const [localData, setLocalData] = useState([]);
	const [postalCode, setPostalCode] = useState("Bethlehem");

	const checkLocation = async () => {
		if ("geolocation" in navigator) {
			console.log("Available");
		} else {
			console.log("Not Available");
		}
	};

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
		checkLocation();
		getLocalBrews();
	}, []);

	return (
		<>
			<div className="col-md-12 mt-4">
				<span className="heading-title">
					Breweries Nearby ({localData.length})
				</span>
				<div className="row">
					{localData.map((brewery, index) => (
						<div key={index} className="col-3 mb-4">
							<div className="card">
								<img
									className="card-image"
									src={`https://maps.googleapis.com/maps/api/staticmap?center=${
										brewery.address_1 +
										", " +
										brewery.city +
										" " +
										brewery.state +
										", " +
										brewery.postal_code
									}&zoom=18&size=400x400&key=${
										import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY
									}&format=png`}
								/>
								<div className="location-name">{brewery.name}</div>
								<Rating readonly="true" size="25" initialValue="3.5" />
								<div className="heading mt-2">
									{brewery.address_1 +
										", " +
										brewery.city +
										" " +
										brewery.state +
										", " +
										brewery.postal_code}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default LocalBrews;
