import { useMember } from "../../contexts/MemberContext";

function ProfileBox() {
	const member = useMember();

	return (
		<>
			<div className="profile-box d-flex flex-row align-items-md-center px-4">
				<img
					className="rounded-circle me-1"
					alt="User Profile"
					src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
					width="32"
				/>
				<h5 className="full_name">
					{member.first_name + " " + member.last_name}
				</h5>
			</div>
		</>
	);
}

export default ProfileBox;
