import React, { useState } from "react";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { createUser } from "../api/user";

export default function UseWallet() {
	const [connectedToSite, setConnectedToSite] = useState(false);
	const [connectedToWallet, setConnectedToWallet] = useState(false);

	async function connectSite() {
		await connectWalletToSite();
		const address = await getWalletAddress();
		console.log("address", address);
		if (address) {
			setConnectedToWallet(true);

			return true;
		}
		return false;
	}

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
				console.log("Signed user");
				return true;
			}
		}
		return false;
	}

	return {
		connectSite,
		connectedToSite,
		signUser,
		connectedToWallet,
	};
}
