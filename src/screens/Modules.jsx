import {
	Avatar,
	Box,
	Chip,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Popper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { cloneTemplate, deleteTemplate, getTemplates } from "../api/template";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { EditModelDialog } from "../components/EditModelDialog";
import { toast } from "react-toastify";

export default function Modules() {
	const [modules, setModules] = useState();
	const [open, setOpen] = useState(false);
	const [editModel, seteditModel] = useState({});
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const openPoper = Boolean(anchorEl);
	const idPoper = openPoper ? "simple-popper" : undefined;

	async function gM() {
		const resp = await getTemplates();
		setModules(resp);
	}

	useEffect(() => {
		gM();
	}, []);

	const handleCloneClick = async (id) => {
		const name = prompt("Enter module name");
		if (!name || name === "") return;
		const res = await cloneTemplate({
			name,
			id,
		});
		if (res) {
			toast("Clone created", { type: "success" });
			gM();
			setAnchorEl(null);
		} else {
			toast("Clone failed", { type: "error" });
		}
	};

	return (
		<Box sx={{ p: 2, flex: 1 }} width={"100%"}>
			<Box sx={{ textAlign: "center" }}>
				<h2>My Modules </h2>
				{/* <p>Click to load modules.</p> */}
			</Box>
			<br />
			<Box>
				{modules?.length === 0 && (
					<Box>
						Your modules is emplty.{" "}
						<Link to="/playground" relative="path">
							create new modules.
						</Link>
					</Box>
				)}
			</Box>
			<Box>
				{modules &&
					modules?.map((m, i) => {
						return (
							<ListItem
								onClick={() => {
									navigate(`/playground/${m._id}`);
								}}
								sx={{
									cursor: "pointer",
								}}
								secondaryAction={
									m._id !== 0 && (
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<Box
												sx={{
													pr: 3,
												}}
											>
												<Chip
													label={m.visibility}
													sx={{
														borderRadius: "3px",
														color: "#f1f1f1",
														fontSize: "14px",
													}}
												/>
											</Box>
											<IconButton
												edge="end"
												aria-label="edit"
												onClick={async () => {
													setOpen(true);
													seteditModel(m);
												}}
												sx={{
													mr: 2,
												}}
												color="warning"
											>
												<AiOutlineEdit />
											</IconButton>

											<IconButton
												edge="end"
												aria-label="delete"
												onClick={async () => {
													await deleteTemplate(m._id);
													gM();
												}}
												color="error"
												sx={{
													mr: 2,
												}}
											>
												<MdOutlineDeleteOutline />
											</IconButton>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={(event) => {
													setAnchorEl(anchorEl ? null : event.currentTarget);
												}}
												sx={{
													color: "#ffffff",
												}}
											>
												<BsThreeDotsVertical
													height="100%"
													style={{
														height: "20px",
													}}
												/>
											</IconButton>
											<Popper id={idPoper} open={openPoper} anchorEl={anchorEl}>
												<Box
													sx={{
														mt: 0.5,
														border: 1,
														p: 1,

														width: "200px",
														cursor: "pointer",
													}}
													onClick={() => {
														handleCloneClick(m._id);
													}}
												>
													Clone
												</Box>
												<Box
													sx={{
														border: 1,
														p: 1,

														width: "200px",
														cursor: "pointer",
													}}
												>
													Open in Playground
												</Box>
											</Popper>
										</Box>
									)
								}
								key={i}
							>
								<ListItemAvatar>
									<Avatar
										alt={"h"}
										src={m.img ? m.img : "/images/defaultModule.png"}
										sx={{
											bgcolor: "#fff",
										}}
									/>
								</ListItemAvatar>
								<ListItemText
									primary={m.name}
									secondary={
										<Box
											sx={{
												color: "#fff",
											}}
											component={"p"}
										>
											{`${new Date(
												m.createdAt
											).toLocaleDateString()} ${new Date(
												m.createdAt
											).toLocaleTimeString()}`}
										</Box>
									}
								/>
							</ListItem>
						);
					})}
			</Box>
			<EditModelDialog
				open={open}
				setOpen={setOpen}
				model={editModel}
				reGet={gM}
			/>
		</Box>
	);
}
