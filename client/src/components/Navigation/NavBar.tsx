import LoginModal from "../Authentication/LoginModal";
import RegisterModal from "../Authentication/RegisterModal";
import { useMember } from "../../contexts/MemberContext";
import ProfileBox from "./ProfileBox";

function NavBar() {
	const member = useMember();

	const renderLoginButtons = () => {
		if (!member.id) {
			return (
				<div className="d-flex">
					<button
						className="btn btn-outline-primary me-2"
						data-bs-toggle="modal"
						data-bs-target="#loginModal"
					>
						Login
					</button>
					<button
						className="btn btn-outline-primary"
						data-bs-toggle="modal"
						data-bs-target="#registerModal"
					>
						Register
					</button>
				</div>
			);
		} else {
			return <ProfileBox />;
		}
	};

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container-fluid">
						<a className="navbar-brand" href="/">
							<b>Brewery Project</b>
						</a>

						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">
										Home
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">
										Link
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link disabled" aria-disabled="true">
										Disabled
									</a>
								</li>
							</ul>

							{renderLoginButtons()}
						</div>
					</div>
				</nav>
			</header>

			{!member.id && (
				<div>
					<LoginModal />
					<RegisterModal />
				</div>
			)}
		</>
	);
}

export default NavBar;
