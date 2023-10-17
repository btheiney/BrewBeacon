import { useState, FormEvent } from "react";
import axios from "axios";
import validator from "validator";

import BasicAlert from "../Alerts/BasicAlert";

function LoginModal() {
	const [inputFields, setInputFields] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputFields({ ...inputFields, [name]: value.trim() });
		setErrors({ ...errors, [name]: "" });
		validateField(name, value.trim());
	};

	const validateField = (name, value) => {
		const validationErrors = { ...errors };

		switch (name) {
			case "email":
				validationErrors.email = validator.isEmail(value)
					? ""
					: "Invalid email. Please try again.";
				break;
			default:
				break;
		}

		setErrors(validationErrors);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setErrors({});
		const isValid = Object.keys(errors).every((key) => !errors[key]);

		if (isValid) {
			try {
				const response = await axios.post("api/auth/login", inputFields);

				if (response.data.success === true) {
					window.location.reload(false);
				} else {
					setErrors({ ...errors, loginFail: response.data["errors"] });
				}
			} catch (error) {
				setErrors({
					...errors,
					registerFail: "Something went wrong. Please try again",
				});
			}
		}
	};

	return (
		<>
			<div id="loginModal" className="modal" tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content card">
						<div className="modal-body">
							<h5 className="card-title text-center">SIGN IN</h5>
							<p className="text-center mb-4">
								<small>
									All form fields are required unless specified optional
								</small>
							</p>

							{errors.loginFail !== undefined && (
								<div>
									{errors.loginFail.map((message) => (
										<BasicAlert message={message} type="warning" />
									))}
								</div>
							)}

							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<input
										name="email"
										type="email"
										className="form-control"
										value={inputFields.email}
										onChange={handleChange}
										placeholder="Email Address"
										required
									/>
									<span className="text-danger">{errors.email}</span>
								</div>
								<div className="mb-4">
									<input
										name="password"
										type="password"
										className="form-control"
										placeholder="Password"
										required
										value={inputFields.password}
										onChange={handleChange}
									/>
								</div>
								<div className="d-grid gap-2">
									<button className="btn btn-primary" type="submit">
										Login
									</button>
								</div>
							</form>
							<p className="text-center text-muted mt-4">
								Don't have an account? <a href="/">Register</a>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginModal;
