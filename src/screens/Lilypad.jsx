import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BlueButton } from "../components/BlueButton";
import Web3 from "web3";
import LilypadInterface from "../contracts/Lilypad.json";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { createLilypadJob, getLilypadJobs } from "../api/lilypad";
import { createTemplate, getTemplate } from "../api/template";
import { CONTRACT_ADDRESS, PrimaryColor } from "../constants";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const {
	Spec,
	JobSpecDocker,
	PublisherSpec,
	Payload,
	StorageSpec,
} = require("@daggle/bacalhau-js/models");

export const Lilypad = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [jobLoading, setJobLoading] = useState(false);
	const [moduleLoading, setModuleLoading] = useState(false);
	const [template, setTemplate] = useState(new Spec().toJson);
	const [lilyPadJobs, setLilyPadJobs] = useState([]);

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
		setLilyPadJobs(resp);
		setJobLoading(false);
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
			CONTRACT_ADDRESS
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

	const [saveModuleDialogOpen, setSaveModuleDialogOpen] = useState(false);

	async function sM(name, description) {
		if (!name || name === "") return;
		if (!description || description === "") return;
		setSaveModuleDialogOpen(false);
		setModuleLoading(true);
		let payload = new Payload({ spec: data });
		payload = payload.toJson;
		await createTemplate({
			payload,
			name,
			description,
		});
		toast("Successfully Saved module 🥳", { type: "success" });
		setModuleLoading(false);
	}

	async function gMwID(id) {
		const response = await getTemplate(id);
		console.log(response);
		if (response.data) {
			setTemplate((_) => {
				return { ...response.data.payload.Spec };
			});
		}
	}

	useEffect(() => {
		gJ();
		if (id) {
			console.log(id);
			gMwID(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					p: 2,
					flex: 2,
					maxWidth: "550px",
				}}
			>
				<h2 style={{ textAlign: "center" }}>Lilypad Playground</h2>
				<br />
				<Box display={"flex"}>
					{/* Image */}
					<Box mr={2} width={"100%"}>
						<Box mb={1}>
							<h5>Image*</h5>
						</Box>
						<Box display={"flex"}>
							<Box className="param search-container" flex={1}>
								<input
									type="url"
									id="search"
									placeholder="fastchat:v0.0.1"
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
					<Box mb={2} width={"100%"}>
						<Box mb={1}>
							<h5>Working Directory</h5>
						</Box>
						<Box display={"flex"}>
							<Box className="param search-container" flex={1}>
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
				{/* Entrypoints */}
				<Box mb={3}>
					<Box mb={1} display={"flex"}>
						<Box mr={1}>
							<h5>Entrypoint</h5>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
						mb={1}
					>
						<Box
							className="param search-container"
							sx={{
								width: "100%",
							}}
						>
							<input
								type="text"
								id={`entrypoint-i`}
								placeholder="Command"
								value={template.docker.entrypoint.join(" ")}
								onInput={(e) => {
									let en = e.target.value.split(" ");
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
					</Box>
				</Box>
				{/* Inputs */}
				<Box mb={3}>
					<Box mb={1} display={"flex"}>
						<Box mr={1}>
							<h5>Inputs</h5>
						</Box>
					</Box>
					{template?.inputs &&
						template?.inputs?.map((inp, iI) => (
							<Box
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
								<Box
									sx={{
										"&:hover": {
											color: "red",
										},
									}}
								>
									<AiOutlineDelete
										style={{
											cursor: "pointer",
										}}
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
					<Box
						sx={{
							mt: 2,
							backgroundColor: PrimaryColor,
							color: "black",
							fontWeight: 500,
							p: 1,
							textAlign: "center",
							borderRadius: "4px",
							cursor: "pointer",
							width: "fit-content",
						}}
						onClick={() => {
							setTemplate((prevState) => ({
								...prevState,
								inputs: prevState.inputs.concat([
									{ StorageSource: "IPFS", key: Date.now() },
								]),
							}));
						}}
					>
						<p>Add Input</p>
					</Box>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-around" }}>
					<Box width={"100%"} mr={1}>
						<BlueButton
							title={"Save Module"}
							onClick={() => {
								setSaveModuleDialogOpen(true);
							}}
							loading={moduleLoading}
						/>
					</Box>
					<Box width={"100%"} ml={1}>
						<BlueButton
							title={"Test Job"}
							onClick={createJob}
							loading={loading}
						/>
					</Box>
				</Box>
			</Box>
			<SaveModuleDialog
				open={saveModuleDialogOpen}
				setOpen={setSaveModuleDialogOpen}
				template={template}
				sM={sM}
			/>
		</Box>
	);
};

const SaveModuleDialog = ({ open, setOpen, template, sM }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (template?.name) setName(template?.name);
		if (template?.description) setDescription(template?.description);
	}, [template]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={() => {}}>
				<DialogTitle
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					{"Module Details"}
				</DialogTitle>
				<DialogContent>
					<TextField
						size="small"
						placeholder="Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth
					/>
					<br />
					<br />
					<TextField
						size="small"
						multiline
						minRows={2}
						placeholder="Description"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} variant="contained">
						Close
					</Button>
					{/* {loading ? (
						<Button color="primary" variant="contained">
							Loading...
						</Button>
					) : ( */}
					<Button
						onClick={() => {
							sM(name, description);
						}}
						autoFocus
						variant="contained"
						disabled={!name || !description}
					>
						Confirm
					</Button>
					{/* )} */}
				</DialogActions>
			</Dialog>
		</div>
	);
};
