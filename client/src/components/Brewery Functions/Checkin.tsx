import { useState } from "react";

function Checkin(breweryID: string, memberID: number) {
	const handleCheckin = async () => {
		try {
			const response = await axios.post(`/api/brewery/checkin`, {
				breweryID,
				memberID,
			});

			if (response.data["success"]) {
				console.log("success");
			}
		} catch (error) {
			console.error("Error occured while checking in.");
		}
	};

	return (
		<>
			<div className="d-grid gap-2 mt-3">
				<button className="btn btn-primary" onClick={handleCheckin}>
					Check In
				</button>
			</div>
		</>
	);
}

export default Checkin;
