function RegisterModal() {
	return (
		<>
			<div id="registerModal" className="modal" tabindex="-1">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content card">
						<div className="modal-body">
							<h4 className="text-center mb-4">Register</h4>
							<form>
								<div className="mb-3">
									<label for="exampleInputEmail1" className="form-label">
										Email Address
									</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter your email"
									/>
								</div>
								<div className="mb-4">
									<label for="exampleInputPassword1" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="Enter your password"
									/>
								</div>

								<div className="mb-4">
									<label for="exampleInputPassword1" className="form-label">
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="Re-enter your password"
									/>
								</div>

								<div className="d-grid gap-2">
									<button className="btn btn-primary" type="button">
										Register
									</button>
								</div>
							</form>

							<p className="text-center text-muted mt-4">
								Already have an account? <a href="">Login.</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterModal;
