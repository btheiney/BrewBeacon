import axios from "axios";
import { useState, FormEvent } from "react";
import LocalBrews from "../LocalBrews/LocalBrews";

function Search() {

	return (
		<>
					<div className="col-md-12 mb-4">
					<span className="heading-title">Search</span>
						<div className="card">
							<form action="">
								<div className="row">
									<div className="col-12">
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												placeholder="Enter state, city, or zip-code"
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
                    
                    <LocalBrews />
		</>
	);
}

export default Search;
