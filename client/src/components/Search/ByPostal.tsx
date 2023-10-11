import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

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
					{postalData.map((brewery, index) => (
						<div key={index} className="col-3 mb-4">
							<div className="card">
								<img
									className="card-image"
									src={`https://maps.googleapis.com/maps/api/staticmap?center=${
										brewery.address_1 +
										", " +
										brewery.postal +
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
										brewery.postal +
										" " +
										brewery.state +
										", " +
										brewery.postal_code}
								</div>
							</div>
						</div>
					))}
				</div>
				<span className="heading-sub text-muted float-end">
					Data collected from the{" "}
					<a href="https://www.openbrewerydb.org/">Open Brew DB</a>
				</span>
			</div>
		</>
	);
}

export default ByPostal;
