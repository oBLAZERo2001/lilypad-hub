// import "../styles/Docker.css";
import {
	Avatar,
	Box,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BlueButton } from "../components/BlueButton";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import LilypadInterface from "../contracts/Lilypad.json";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { createLilypadJob, getLilypadJobs } from "../api/lilypad";
import { AiFillDelete, AiFillFolder } from "react-icons/ai";
import { LilyJobComponent } from "../components/LilyJobComponent";
import { createTemplate, deleteTemplate, getTemplates } from "../api/template";
import { CHAIN } from "../constants";
const {
	Spec,
	JobSpecDocker,
	PublisherSpec,
	Payload,
	StorageSpec,
} = require("@daggle/bacalhau-js/models");

export const Lilypad = () => {
	const [loading, setLoading] = useState(false);
	const [jobLoading, setJobLoading] = useState(false);
	const [moduleLoading, setModuleLoading] = useState(false);
	const [modules, setModules] = useState([]);
	const [template, setTemplate] = useState(new Spec().toJson);
	const [lilyPadJobs, setLilyPadJobs] = useState([]);
	const navigate = useNavigate();

	async function gJ() {
		if (!template.docker.image) {
			setTemplate((prevState) => ({
				...prevState,
				inputs: prevState.inputs.concat([
					{ StorageSource: "IPFS", key: Date.now() },
				]),
				docker: {
					...prevState.docker,
					entrypoint: prevState.docker.entrypoint.concat([""]),
				},
			}));
		}
		setJobLoading(true);
		const resp = await getLilypadJobs();
		console.log("resp", resp);
		setLilyPadJobs(resp);
		setJobLoading(false);
	}

	async function gM() {
		const resp = await getTemplates();
		if (resp?.length === 0) {
			resp.push({
				_id: 0,
				name: "Cowsay Sample Module🐮",
				payload: new Payload({
					spec: new Spec({
						docker: new JobSpecDocker({
							image: "grycap/cowsay:latest",
							entrypoint: ["/usr/games/cowsay", "Welcome to Daggle🥳"],
						}),
					}),
				}).toJson,
				createdAt: new Date(),
			});
		}
		setModules(resp);
	}

	const data = new Spec({
		docker: new JobSpecDocker({
			entrypoint: template.docker.entrypoint.filter((e) => e),
			image: template.docker.image,
			WorkingDirectory: template.docker.WorkingDirectory,
		}),
		publisher_spec: new PublisherSpec({ type: "Estuary" }),
		timeout: 1800,
		verifier: "Noop",
		inputs: template.inputs
			.filter((t) => t.cid || t.url)
			.map((s) => new StorageSpec(s)),
	});

	async function createJob() {
		await switchChain();
		setLoading(true);
		const FEE = Web3.utils.toWei("0.04");
		let cD = { ...template };
		cD.outputs = [new StorageSpec({ name: "outputs", path: "/outputs" })];
		let spec = JSON.stringify(cD);
		const web3 = new Web3(window.ethereum);
		const contract = new web3.eth.Contract(
			LilypadInterface.abi,
			CHAIN.contract_address
		);
		const currentAddress = await getWalletAddress();
		// Gas Calculation
		const gasPrice = await web3.eth.getGasPrice();
		const gas = await contract.methods.runJob(spec).estimateGas({
			from: currentAddress,
			value: FEE,
		});
		await contract.methods
			.runJob(spec)
			.send({ from: currentAddress, gasPrice, gas, value: FEE })
			.on("receipt", async function (receipt) {
				await createLilypadJob({
					job_id: receipt.events.JobCreated.returnValues.jobId,
					tx_hash: receipt.transactionHash,
					block_number: receipt.blockNumber,
				});
				setLoading(false);
				gJ();
				alert("Succesfully created a job🥳🍾");
			});
		setLoading(false);
	}

	async function sM() {
		const name = prompt("Enter module name");
		if (!name || name === "") return;
		setModuleLoading(true);
		let payload = new Payload({ spec: data });
		payload = payload.toJson;
		await createTemplate({
			payload,
			name,
		});
		await gM();
		setModuleLoading(false);
	}

	useEffect(() => {
		gM();
		gJ();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box>
			<Box display={"flex"}>
				<Box sx={{ p: 2, flex: 1 }} mr={2}>
					<h2 style={{ textAlign: "center" }}>Lilypad Jobs 🍃</h2>
					<br />
					<Box display={"flex"}>
						{/* Image */}
						<Box maxWidth="50vw" mr={2}>
							<Box mb={1}>
								<h5>Image*</h5>
							</Box>
							<Box maxWidth="20vw" display={"flex"}>
								<Box className="param search-container">
									<input
										type="url"
										id="search"
										placeholder="blazer/dedocker"
										value={template?.docker?.image ? template.docker.image : ""}
										onChange={(e) =>
											setTemplate((prevState) => ({
												...prevState,
												docker: {
													...prevState.docker,
													image: e.target.value,
												},
											}))
										}
									/>
								</Box>
							</Box>
						</Box>
						{/* Working Directory */}
						<Box maxWidth="50vw" mb={2}>
							<Box mb={1}>
								<h5>Working Directory</h5>
							</Box>
							<Box maxWidth="20vw" display={"flex"}>
								<Box className="param search-container">
									<input
										type="url"
										id="workingdir"
										placeholder="/inputs"
										value={
											template?.docker?.WorkingDirectory
												? template.docker.WorkingDirectory
												: ""
										}
										onChange={(e) => {
											setTemplate((prevState) => ({
												...prevState,
												docker: {
													...prevState.docker,
													WorkingDirectory: e.target.value,
												},
											}));
										}}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
					{/* Inputs */}
					<Box maxWidth="50vw" mr={2} mb={3}>
						<Box mb={1} display={"flex"}>
							<Box mr={1}>
								<h5>Inputs</h5>
							</Box>

							<MdAddCircleOutline
								style={{ cursor: "pointer" }}
								onClick={() => {
									setTemplate((prevState) => ({
										...prevState,
										inputs: prevState.inputs.concat([
											{ StorageSource: "IPFS", key: Date.now() },
										]),
									}));
								}}
							/>
						</Box>
						{template?.inputs &&
							template?.inputs?.map((inp, iI) => (
								<Box
									maxWidth="30vw"
									sx={{
										display: "flex",
										alignItems: "center",
									}}
									key={inp.key}
									mb={1}
								>
									<Box mr={2}>
										<select
											name="storage-spec"
											className="storage-select search-container"
											value={inp.StorageSource}
											onChange={(e) => {
												setTemplate((prevState) => {
													prevState.inputs[iI].StorageSource = e.target.value;
													return {
														...prevState,
													};
												});
											}}
										>
											<option value="IPFS">IPFS</option>
											<option value="URLDownload">URL</option>
										</select>
									</Box>
									<Box className="param search-container" mr={2}>
										<input
											type="url"
											placeholder="URL/CID"
											value={inp.StorageSource === "IPFS" ? inp.cid : inp.url}
											onInput={(e) => {
												setTemplate((prevState) => {
													prevState.inputs[iI].cid = e.target.value;
													prevState.inputs[iI].url = e.target.value;
													return {
														...prevState,
													};
												});
											}}
										/>
									</Box>
									<Box className="param search-container" mr={2}>
										<input
											type="text"
											placeholder="Save to directory"
											value={inp.path}
											onInput={(e) => {
												setTemplate((prevState) => {
													prevState.inputs[iI].path = e.target.value;
													return {
														...prevState,
													};
												});
											}}
										/>
									</Box>
									<Box>
										<AiOutlineCloseCircle
											style={{ cursor: "pointer" }}
											onClick={() => {
												let oldInputs = [...template.inputs];
												oldInputs.splice(iI, 1);
												setTemplate((prevState) => {
													return {
														...prevState,
														inputs: [...oldInputs],
													};
												});
											}}
										/>
									</Box>
								</Box>
							))}
					</Box>
					{/* Entrypoints */}
					<Box maxWidth="50vw" mb={3}>
						<Box mb={1} display={"flex"}>
							<Box mr={1}>
								<h5>Entrypoint</h5>
							</Box>

							<MdAddCircleOutline
								style={{ cursor: "pointer" }}
								onClick={() => {
									setTemplate((prevState) => ({
										...prevState,
										docker: {
											...prevState.docker,
											entrypoint: prevState.docker.entrypoint.concat([""]),
										},
									}));
								}}
							/>
						</Box>
						{template?.docker?.entrypoint &&
							template.docker.entrypoint.map((d, i) => (
								<Box
									maxWidth="30vw"
									sx={{
										display: "flex",
										alignItems: "center",
									}}
									key={i}
									mb={1}
								>
									<Box className="param search-container" mr={2}>
										<input
											type="text"
											id={`entrypoint-${i}`}
											placeholder="Command"
											value={d}
											onInput={(e) => {
												let en = [...template.docker.entrypoint];
												en[i] = e.target.value;
												setTemplate((prevState) => ({
													...prevState,
													docker: {
														...prevState.docker,
														entrypoint: en,
													},
												}));
											}}
										/>
									</Box>
									<Box>
										<AiOutlineCloseCircle
											style={{ cursor: "pointer" }}
											onClick={() => {
												let oE = [...template.docker.entrypoint];
												oE.splice(i, 1);
												setTemplate((prevState) => {
													return {
														...prevState,
														docker: {
															...prevState.docker,
															entrypoint: oE,
														},
													};
												});
											}}
										/>
									</Box>
								</Box>
							))}
					</Box>
					{/* Replicas */}
					<Box maxWidth="50vw" mb={2}>
						<Box mb={1}>
							<h5>Replicas</h5>
						</Box>
						<Box maxWidth="20vw" display={"flex"}>
							<Box className="param search-container">
								<input
									style={{ cursor: "no-drop" }}
									type="text"
									placeholder="1"
									value={"1"}
									disabled={true}
								/>
							</Box>
						</Box>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "space-around" }}>
						<Box width={"100%"} mr={1}>
							<BlueButton
								title={"Save Module"}
								onClick={sM}
								loading={moduleLoading}
							/>
						</Box>
						<Box width={"100%"} ml={1}>
							<BlueButton
								title={"Submit Job"}
								onClick={createJob}
								loading={loading}
							/>
						</Box>
					</Box>
				</Box>
				<Box sx={{ p: 2, flex: 1 }} width={"100%"}>
					<Box sx={{ textAlign: "center" }}>
						<h2>Saved Modules 💾</h2>
						<p>Click to load modules.</p>
					</Box>
					<br />
					<Box>
						{modules &&
							modules?.map((m, i) => {
								return (
									<ListItem
										secondaryAction={
											m._id !== 0 && (
												<IconButton
													edge="end"
													aria-label="delete"
													onClick={async () => {
														await deleteTemplate(m._id);
														gM();
													}}
												>
													<AiFillDelete />
												</IconButton>
											)
										}
										key={i}
									>
										<ListItemAvatar
											onClick={() => {
												setTemplate((_) => {
													return { ...m.payload.Spec };
												});
											}}
										>
											<Avatar>
												<AiFillFolder />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											onClick={() => {
												setTemplate((_) => {
													return { ...m.payload.Spec };
												});
											}}
											primary={m.name}
											secondary={`${new Date(
												m.createdAt
											).toLocaleDateString()} ${new Date(
												m.createdAt
											).toLocaleTimeString()}`}
										/>
									</ListItem>
								);
							})}
					</Box>
				</Box>
			</Box>
			<Box sx={{ p: 2 }}>
				<h2>Jobs 📃</h2>
				<br />
				{jobLoading ? (
					<Box>
						{Array.from({ length: 10 }).map((_, i) => (
							<Skeleton
								variant="rectangular"
								sx={{ my: 1 }}
								height={"75px"}
								key={i}
							/>
						))}
					</Box>
				) : (
					<Box>
						<table>
							<thead>
								<tr>
									<th>Id</th>
									<th>Result</th>
									<th>Transaction</th>
									<th>Created</th>
								</tr>
							</thead>
							<tbody>
								{lilyPadJobs &&
									lilyPadJobs.map((job, i) => (
										<LilyJobComponent key={i} job={job} />
									))}
							</tbody>
						</table>
					</Box>
				)}
			</Box>
		</Box>
	);
};
