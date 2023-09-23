import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createTemplate = async function (data) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(SERVER_URL + "/template", data, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const getTemplates = async function () {
	try {
		let token = localStorage.getItem("token");
		console.log("getTemplates", token);
		const response = await axios.get(SERVER_URL + "/template", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log("temp", error.message);
	}
};

export const deleteTemplate = async function (id) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.delete(SERVER_URL + "/template/" + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log("temp", error.message);
	}
};

export const cloneTemplate = async function (data) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.post(
			SERVER_URL + `/template/clone/${data.id}`,
			data,
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};
export const updateTemplate = async function (data) {
	console.log("updating", data);
	try {
		let token = localStorage.getItem("token");
		const response = await axios.patch(
			SERVER_URL + `/template/updateTemplate/${data.id}`,
			data,
			{
				headers: {
					"Content-Type": `application/json`,
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return {
				data: response.data,
				ok: true,
			};
		}
	} catch (error) {
		console.log(error.message);
	}
};
export const getPublicTemplates = async function (searchName) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(
			SERVER_URL + `/template/public?name=${searchName ? searchName : ""}`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			return {
				data: response.data,
			};
		}
	} catch (error) {
		console.log("temp", error.message);
	}
};

export const getTemplate = async function (id) {
	try {
		let token = localStorage.getItem("token");
		const response = await axios.get(SERVER_URL + `/template/${id}`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			return {
				data: response.data,
			};
		}
	} catch (error) {
		console.log("temp", error.message);
	}
};
