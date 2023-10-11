import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	const isValidZipCode = (zipCode) => /^\d{5}$/.test(zipCode);

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

		if (stateNames.includes(input)) {
			navigate(`/search/state/${input}`);
		} else if (isValidZipCode(input)) {
			navigate(`/search/postal/${input}`);
		} else {
			navigate(`/search/city/${input}`);
		}
	};

	return (
		<>
			<div className="col-md-12 mb-4">
				<span className="heading-title">Search</span>
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
