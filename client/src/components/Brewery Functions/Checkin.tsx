import axios from "axios";

function Checkin(breweryID: string) {
	const handleCheckin = async () => {
		try {
			const response = await axios.post(`/api/brewery/checkin`, breweryID);

			if (response.data["success"]) {
				window.location.reload(false);
			}
		} catch (error) {
			console.error("Error occured while checking in.");
		}
	};

	return (
		<>
			{console.log(breweryID)}
			<div className="d-grid gap-2 mt-3">
				<button className="btn btn-primary" onClick={handleCheckin}>
					<i className="bi bi-geo-alt-fill"></i> Check In
				</button>
			</div>
		</>
	);
}

export default Checkin;
