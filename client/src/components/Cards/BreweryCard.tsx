import { useState, useEffect } from "react";
import { useMember } from "../../contexts/MemberContext";
import Checkin from "../Brewery Functions/Checkin";
import axios from "axios";

function BreweryCard({ brewery }) {
	const member = useMember();
	const [checkinCount, setCheckinCount] = useState(0);

	// get Brewery's GoogleMaps image
	const getMapURL = (brewery) => {
		const { address_1, city, state, postal_code } = brewery;
		const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;
		return `https://maps.googleapis.com/maps/api/staticmap?center=${address_1}, ${city} ${state}, ${postal_code}&zoom=18&size=400x400&key=${apiKey}&format=png`;
	};

	const getCheckinCount = async () => {
		try {
			const response = await axios.get(
				`/api/brewery/${brewery.id}/checkin_count`
			);
			setCheckinCount(response.data);
		} catch (error) {
			console.error("Error occured while checking in.");
		}
	};

	useEffect(() => {
		getCheckinCount();
	}, []);

	return (
		<>
			<div key={brewery.id} className="col-3 mb-4">
				<div className="card">
					<img
						className="card-image"
						src={getMapURL(brewery)}
						alt={`Map for ${brewery.name}`}
					/>
					<div className="location-name">{brewery.name}</div>
					<div className="heading mt-2">{checkinCount} Check-Ins</div>
					<div className="heading mt-2">
						{`${brewery.address_1}, ${brewery.city} ${brewery.state}, ${brewery.postal_code}`}
					</div>

					{member.id && <Checkin breweryID={brewery.id} />}
				</div>
			</div>
		</>
	);
}

export default BreweryCard;
