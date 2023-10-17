import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MemberContext = createContext();

export function useMember() {
	return useContext(MemberContext);
}

export function MemberProvider({ children }) {
	const [member, setMember] = useState({});

	const getMemberData = async () => {
		try {
			const response = await axios.get(`/api/members/current`, {
				withCredentials: true,
			});

			if (response.data.success) {
				setMember(response.data.member);
			}
		} catch (error) {
			console.error("Error collecting member information.");
		}
	};

	useEffect(() => {
		getMemberData();
	}, []);

	return (
		<MemberContext.Provider value={member}>{children}</MemberContext.Provider>
	);
}
