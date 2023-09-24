import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Skeleton, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";

import { getLilypadJob, getLilypadJobs } from "../api/lilypad";
import { IoRefreshOutline } from "react-icons/io5";
import { CHAIN } from "../constants";
import { toast } from "react-toastify";

const columns = [
	{
		id: "result",
		label: "Id",
		// minWidth: 170,
		align: "center",
	},
	{
		id: "check",
		label: "Result",
		// minWidth: 170,
		align: "center",
	},
	{
		id: "view",
		label: "View Transaction",
		// minWidth: 170,
		align: "center",
	},
	{
		id: "createdAt",
		label: "Created At",
		// minWidth: 170,
		align: "center",
	},
];

export default function History() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [jobLoading, setJobLoading] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const [lilyPadJobs, setLilyPadJobs] = useState([]);

	const getLilyPadJobsFun = async () => {
		setJobLoading(true);
		const resp = await getLilypadJobs();
		console.log("resp", resp);
		setLilyPadJobs(resp);
		setJobLoading(false);
	};

	useEffect(() => {
		getLilyPadJobsFun();
	}, []);
	console.log("lilyPadJobs", lilyPadJobs);

	const [copyEnabled, setCopyEnabled] = useState(false);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}

	return (
		<Box>
			<Box sx={{ textAlign: "center", mb: 2 }}>
				<h2>History </h2>
				{/* <p>Click to load modules.</p> */}
			</Box>
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{lilyPadJobs?.length > 0 &&
								lilyPadJobs
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow
												hover
												key={row._id}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												{columns.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.id === "result" ? (
																<Box>{row.job_id}</Box>
															) : column.id === "check" ? (
																<CheckerComponent row={row} />
															) : column.id === "view" ? (
																<Box
																	onClick={() => {
																		window.open(
																			`${CHAIN.blockExplorerUrls[0]}/tx/${row.tx_hash}`,
																			"_blank"
																		);
																	}}
																	style={{ cursor: "pointer" }}
																>
																	View Transaction
																</Box>
															) : column.id === "createdAt" ? (
																<Box>{`${new Date(
																	row.createdAt
																).toLocaleDateString()} ${new Date(
																	row.createdAt
																).toLocaleTimeString()}`}</Box>
															) : (
																value
															)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
						</TableBody>
					</Table>
				</TableContainer>
				{jobLoading && (
					<Box sx={{ pl: 1, flex: 1 }}>
						<Skeleton
							variant="rectangular"
							width={"100%"}
							height={"50px"}
							sx={{ borderRadius: "5px" }}
						/>
						<br />
						<Skeleton
							variant="rectangular"
							width={"100%"}
							height={"50px"}
							sx={{ borderRadius: "5px" }}
						/>
					</Box>
				)}
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={lilyPadJobs?.length && lilyPadJobs.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

const CheckerComponent = ({ row }) => {
	const [refreshing, setRefreshing] = useState(false);
	const [job, setJob] = useState(false);
	async function gJ() {
		try {
			if (refreshing) return;
			setRefreshing(true);
			const jobResolved = await getLilypadJob(row._id);
			console.log(jobResolved);
			if (jobResolved.status === 200) {
				setJob(jobResolved.data);
				toast("Successfully refreshed.", { type: "success" });
			} else {
				throw Error();
			}
			setRefreshing(false);
		} catch (e) {
			setRefreshing(false);
			toast("Some error occured, try again.", {
				type: "warning",
			});
		}
	}

	useEffect(() => {
		if (row) {
			setJob(row);
		}
	}, [row]);

	return (
		<Box
			onClick={() => {
				if (job?.result) {
					window.open(`https://ipfs.io/ipfs/${job.result}`, "_blank");
				} else {
					gJ();
				}
			}}
			style={{
				cursor: "pointer",
			}}
		>
			{job?.result ? (
				job.result.includes(" ") ? (
					job.result
				) : (
					"View Result"
				)
			) : refreshing ? (
				<Skeleton
					variant="rectangular"
					width={"100%"}
					height={"10px"}
					sx={{ borderRadius: "5px" }}
				/>
			) : (
				"Check Result"
			)}
		</Box>
	);
};
