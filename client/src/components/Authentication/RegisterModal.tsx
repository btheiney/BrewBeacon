import { useState, FormEvent } from "react";
import axios from "axios";
import validator from "validator";

import BasicAlert from "../Alerts/BasicAlert";

function RegisterModal() {
	const [inputFields, setInputFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});
	const [registerSuccess, setRegisterSuccess] = useState(false);

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
			case "password":
			case "confirmPassword":
				validationErrors.password =
					value === inputFields.password ? "" : "Passwords do not match.";
				break;
			case "username":
				validationErrors.username =
					validator.isAlphanumeric(value) && value.length >= 3
						? ""
						: "Usernames must be at least 3 characters and may only contain numbers and letters.";
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
				const response = await axios.post("api/auth/register", inputFields);

				if (response.data.success === true) {
					setRegisterSuccess(true);
				} else {
					setErrors({ ...errors, registerFail: response.data["errors"] });
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
			<div id="registerModal" className="modal" tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content card">
						<div className="modal-body">
							<h5 className="card-title text-center">REGISTER ACCOUNT</h5>
							<p className="text-center mb-4">
								<small>
									All form fields are required unless specified optional
								</small>
							</p>

							{!registerSuccess && errors.registerFail !== undefined && (
								<div>
									{errors.registerFail.map((message) => (
										<BasicAlert message={message} type="warning" />
									))}
								</div>
							)}

							{registerSuccess && (
								<BasicAlert
									message="Account Created! You may now login."
									type="success"
								/>
							)}

							<form onSubmit={handleSubmit}>
								<div className="row mb-4">
									<div className="col-6">
										<input
											name="firstName"
											type="text"
											className="form-control"
											placeholder="First Name"
											required
											value={inputFields.firstName}
											onChange={handleChange}
										/>
									</div>
									<div className="col-6">
										<input
											name="lastName"
											type="text"
											className="form-control"
											placeholder="Last Name"
											required
											value={inputFields.lastName}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="mb-4">
									<input
										name="username"
										type="text"
										className="form-control"
										placeholder="Username"
										required
										value={inputFields.username}
										onChange={handleChange}
									/>
									<span className="text-danger">{errors.username}</span>
								</div>
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
								<div className="row mb-4">
									<div className="col-6">
										<input
											name="password"
											type="password"
											className="form-control"
											placeholder="Password"
											required
											value={inputFields.password}
											onChange={handleChange}
										/>
										<span className="text-danger">{errors.password}</span>
									</div>
									<div className="col-6">
										<input
											name="confirmPassword"
											type="password"
											className="form-control"
											placeholder="Confirm Password"
											required
											value={inputFields.confirmPassword}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="d-grid gap-2">
									<button className="btn btn-primary" type="submit">
										Register
									</button>
								</div>
							</form>
							<p className="text-center text-muted mt-4">
								Already have an account? <a href="/">Login</a>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterModal;
