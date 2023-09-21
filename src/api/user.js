import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createUser = async function (address, displayName) {
	console.log("reached create user api");
	try {
		const nonceResponse = await axios.post(
			`${SERVER_URL}/user/generateNonce`,
			{ address },
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);
		const formattedNonceResponse = nonceResponse.data;
		const nonce = formattedNonceResponse.nonce;

		const sign = await window.ethereum.request({
			method: "personal_sign",
			params: [address, "Please approve this message \n \nNonce:\n" + nonce],
		});

		const response = await axios.post(
			SERVER_URL + "/user/signin",
			{ sign, nonce, displayName },
			{
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 200 || response.status === 201) {
			console.log(response.data);
			localStorage.setItem("token", response.data.token);

			return {
				ok: true,
				data: response.data,
			};
		}
	} catch (error) {
		console.log(error.message);
		return {
			ok: false,
			error,
		};
	}
};

export const getUser = async function (address) {
	try {
		const response = await axios.get(SERVER_URL + "/user/" + address);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const addCredits = async function () {
	try {
		let token = localStorage.getItem("token");

		const response = await axios
			.post(
				SERVER_URL + "/user/addcredits",
				{ credits: 5 },
				{
					headers: {
						"Content-Type": `application/json`,
						Authorization: "Bearer " + token,
					},
				}
			)
			.catch((er) => {
				alert(er.response.data.message);
			});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
