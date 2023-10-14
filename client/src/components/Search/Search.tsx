import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import BasicAlert from "../Alerts/BasicAlert";

function Search() {
	const [input, setInput] = useState("");

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const isValidZipCode = (zipCode) => /^\d{5}$/.test(zipCode);
	const isAlphaNumeric = (string) => /^[A-Za-z0-9]+$/.test(string);

	function inStateArray(string) {
		const lowerStr = string.toLowerCase();
		return stateNames.some((item) => item.toLowerCase() === lowerStr);
	}

	const stateNames = [
		"Alabama",
		"Alaska",
		"Arizona",
		"Arkansas",
		"California",
		"Colorado",
		"Connecticut",
		"Delaware",
		"Florida",
		"Georgia",
		"Hawaii",
		"Idaho",
		"Illinois",
		"Indiana",
		"Iowa",
		"Kansas",
		"Kentucky",
		"Louisiana",
		"Maine",
		"Maryland",
		"Massachusetts",
		"Michigan",
		"Minnesota",
		"Mississippi",
		"Missouri",
		"Montana",
		"Nebraska",
		"Nevada",
		"New Hampshire",
		"New Jersey",
		"New Mexico",
		"New York",
		"North Carolina",
		"North Dakota",
		"Ohio",
		"Oklahoma",
		"Oregon",
		"Pennsylvania",
		"Rhode Island",
		"South Carolina",
		"South Dakota",
		"Tennessee",
		"Texas",
		"Utah",
		"Vermont",
		"Virginia",
		"Washington",
		"West Virginia",
		"Wisconsin",
		"Wyoming",
	];

	const selectEndpoint = async (e: FormEvent) => {
		e.preventDefault();

		if (!isAlphaNumeric(input)) {
			setErrorMessage(
				"You entered an invalid state, city, or 5 digit zip-code. Please try again."
			);
			setError(true);
		} else if (inStateArray(input)) {
			navigate(`/search/state/${input}`);
		} else if (isValidZipCode(input)) {
			navigate(`/search/postal/${input}`);
		} else {
			navigate(`/search/city/${input}`);
		}
	};

	return (
		<>
			<div className="col-md-8 mb-4">
				{error && <BasicAlert message={errorMessage} type="warning" />}
				<span className="heading-title">Search Breweries</span>
				<div className="card">
					<form action="" onSubmit={selectEndpoint}>
						<div className="row">
							<div className="col-12">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={input}
										onChange={(e) => setInput(e.target.value)}
										placeholder="Enter state, city, or 5 digit zip-code"
										required
									/>
									<button type="submit" className="btn btn-primary">
										Search <i className="bi bi-search"></i>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Search;
