import { useMember } from "../../contexts/MemberContext";
import Checkin from "../Brewery Functions/Checkin";

function BreweryCard({ brewery }) {
	const member = useMember();

	// get Brewery's GoogleMaps image
	const getMapURL = (brewery) => {
		const { address_1, city, state, postal_code } = brewery;
		const apiKey = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;
		return `https://maps.googleapis.com/maps/api/staticmap?center=${address_1}, ${city} ${state}, ${postal_code}&zoom=18&size=400x400&key=${apiKey}&format=png`;
	};

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
					<div className="heading mt-2">
						{`${brewery.address_1}, ${brewery.city} ${brewery.state}, ${brewery.postal_code}`}
					</div>

					{member.id && <Checkin breweryID={brewery.id} memberID={member.id} />}
				</div>
			</div>
		</>
	);
}

export default BreweryCard;
