import { useState } from "react";
import { getWalletAddress } from "../utils/wallet";
import { createUser } from "../api/user";

export default function UseWallet() {
	const [connectedToSite, setConnectedToSite] = useState(false);

	async function signUser(displayName) {
		const address = await getWalletAddress();

		if (address && address !== "") {
			let token = localStorage.getItem("token");

			localStorage.setItem("address", address);
			if (!token || token === "" || token === "undefined") {
				await createUser(address, displayName);
			}
			token = localStorage.getItem("token");
			if (token && token !== "" && token !== "undefined") {
				setConnectedToSite(true);
				return true;
			}
		}
		return false;
	}

	return {
		connectedToSite,
		signUser,
	};
}
